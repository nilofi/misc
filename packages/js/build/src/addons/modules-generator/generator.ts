import { isChild, xfs } from "@xenon.js/misc";
import {
    type IDependency,
    type IModule,
    type IReporterOutput,
    cruise,
} from "dependency-cruiser";
import extractTSConfig from "dependency-cruiser/config-utl/extract-ts-config";
import { readdirSync } from "fs";
import { join, relative, resolve } from "path";
import type { ModulesGeneratorConfig } from "./config.js";

export interface Modules {
    [key: string]: {
        name: string;
        description: string;
        files: string[];
        dependencies: string[];
        path?: string;
    };
}

export async function generateModules(config: ModulesGeneratorConfig) {
    const { project, file, exclude, entryPoints } = config;

    console.log("generating modules...");

    const srcPath = join(project, "src");
    const modulesPath = resolve(project, file);

    const modules = (await xfs.json<Modules>(modulesPath)) ?? {};
    const keys = new Set<string>();

    readdirSync(srcPath, { withFileTypes: true }).forEach(v => {
        if (v.isDirectory()) {
            readdirSync(join(v.path, v.name), { withFileTypes: true }).forEach(
                v => {
                    const path = join(v.path, v.name);
                    const inExclude = exclude.some(v =>
                        isChild(resolve(project, v), path),
                    );
                    if (v.isDirectory() && !inExclude) {
                        const key = relative(srcPath, path).replaceAll(
                            "\\",
                            "/",
                        );
                        keys.add(key);

                        if (!modules[key]) {
                            modules[key] = {
                                name: "",
                                description: "",
                                files: [],
                                dependencies: [],
                            };
                        } else {
                            modules[key].files.length = 0;
                            modules[key].dependencies.length = 0;
                        }

                        modules[key].path = path;
                    }
                },
            );
        }
    });

    for (const file of entryPoints) {
        const path = resolve(project, file);
        const key = relative(srcPath, path)
            .replaceAll("\\", "/")
            .replace(".ts", "");
        keys.add(key);

        if (!modules[key]) {
            modules[key] = {
                name: "",
                description: "",
                files: [],
                dependencies: [],
            };
        } else {
            modules[key].files.length = 0;
            modules[key].dependencies.length = 0;
        }

        modules[key].path = path;
    }

    // 删除不再存在的模块信息
    for (const key in modules) {
        if (!keys.has(key)) {
            delete modules[key];
        }
    }

    for (const key in modules) {
        console.log(key, "analyzing...");
        await generateModule(project, modules, key);
        delete modules[key].path;
    }

    checkDuplicateFiles(modules);

    await xfs.writeJson(modulesPath, modules, { space: 2 });

    console.log("generate modules finished.");
}

async function generateModule(
    project: string,
    modules: Modules,
    moduleKey: string,
) {
    try {
        const module = modules[moduleKey];
        const path = module.path!;

        const tsConfigPath = {
            fileName: join(project, "tsconfig.json"),
        };
        const tsConfig = extractTSConfig(tsConfigPath.fileName);

        // cruise 内部所用的 ts-paths 插件有 bug，会从 cwd 读取，所以需要人为修改 baseUrl 路径
        tsConfig.options.baseUrl = project;

        const _path = relative(project, path);
        const cruiseResult: IReporterOutput = await cruise(
            [_path, "src/exports"],
            {
                baseDir: project,
                tsPreCompilationDeps: true,
                // focus:
                //     "^" +
                //     relative(project, path).replaceAll("\\", "/"),
                tsConfig: tsConfigPath,
                ruleSet: {
                    // @ts-expect-error -- HACK cruise 内部实现就需要这些东西
                    options: {
                        tsConfig: tsConfigPath,
                    },
                },
            },
            undefined,
            { tsConfig },
        );

        if (typeof cruiseResult.output === "string") {
            console.error(cruiseResult.output);
            return;
        }

        const files = new Set<string>();
        const deps = new Set<string>();

        for (const info of cruiseResult.output.modules) {
            if (isChild(_path, info.source, true)) {
                files.add(info.source);

                // 所有被依赖的 exports 文件也加入 files
                for (const path of info.dependents) {
                    genFilesByPath(cruiseResult.output.modules, files, path);
                }

                for (const depInfo of info.dependencies) {
                    genDepsByFile(
                        modules,
                        cruiseResult.output.modules,
                        deps,
                        depInfo,
                    );
                }
            }
        }

        module.files.push(...files);

        for (const dep of deps) {
            if (dep !== moduleKey) {
                module.dependencies.push(dep);
            }
        }
    } catch (error) {
        console.error("error:", error);
    }
}

function genFilesByPath(
    tsModules: IModule[],
    paths: Set<string>,
    path: string,
) {
    if (isChild("src/exports", path)) {
        paths.add(path);
        for (const module of tsModules) {
            if (module.source === path) {
                for (const dep of module.dependents) {
                    genFilesByPath(tsModules, paths, dep);
                }
            }
        }
    }
}

function genDepsByFile(
    modules: Modules,
    tsModules: IModule[],
    deps: Set<string>,
    depInfo: IDependency,
) {
    const path = depInfo.resolved;

    // 排除某些依赖
    if (
        path.includes("node_modules") ||
        !path.startsWith("src/") ||
        path.startsWith("src/internal")
    ) {
        return;
    }

    // 对 exports/* 文件特殊处理，找到它依赖的文件作为依赖
    if (isChild("src/exports", path)) {
        for (const module of tsModules) {
            if (module.source === path) {
                for (const dep of module.dependencies) {
                    genDepsByFile(modules, tsModules, deps, dep);
                }
                return;
            }
        }
        console.error("not resolve:", path);
        return;
    }

    for (const key in modules) {
        if (isChild("src/" + key, path)) {
            deps.add(key);
            return;
        }
    }

    console.error("not resolve:", path);
}

function checkDuplicateFiles(modules: Modules) {
    const temp = new Map<string, string[]>();
    for (const key in modules) {
        const module = modules[key];
        for (const file of module.files) {
            const t = temp.get(file);
            if (t) {
                t.push(key);
            } else {
                temp.set(file, [key]);
            }
        }
    }
    for (const [file, keys] of temp) {
        if (keys.length > 1) {
            console.error("duplicate file:", file, "in", keys);
        }
    }
}
