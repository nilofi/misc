import { toExtname, xfs, type PackageJson } from "@xenon.js/misc";
import { basename, join } from "path";
import { chdir } from "process";
import { rollup, watch as rollupWatch, type OutputOptions } from "rollup";
import { generateApiReport } from "./addons/api-report/generator.js";
import { generateBarrel } from "./addons/barrel-generator/generator.js";
import { generateEntryPoints } from "./addons/entry-points-generator/generator.js";
import { fixDeclarationFileExt } from "./addons/fix-declaration-file-ext/fixer.js";
import { fixImportsPath } from "./addons/fix-imports-path/fixer.js";
import { generateModules } from "./addons/modules-generator/generator.js";
import {
    genChunks,
    type PackageJsonExports,
} from "./builders/chunk-builder.js";
import { OptionsBuilder } from "./builders/options-builder.js";
import { resolveImports } from "./components/nodejs-imports.js";
import type { Config } from "./config.js";
import {
    chunksToConstans,
    chunkToDistDir,
    chunkToRollupInput,
    conditionsToFormat,
    isW3CRuntimeKey,
    pickRedirectSuffix,
} from "./utils.js";

export async function handle(
    config: Config,
    handler: (builder: OptionsBuilder) => PromiseLike<void> | void,
) {
    const {
        project,
        emitDeclarationFile,
        treeshake,
        redirects,
        constants,
        external,
        forceExts,
        cleanDirs,
        forceCocos,
        onlyBuildConditions,
        binConditions,
    } = config;

    chdir(project);
    const json = (await xfs.json<PackageJson>(join(project, "package.json")))!;
    const chunks = genChunks(
        json.exports as PackageJsonExports,
        binConditions,
        json.bin,
    );
    const forceFalseConditions = new Set<string>();

    if (chunks.errMsg) {
        console.error("发生错误：", chunks.errMsg);
        return false;
    }

    let first = true;

    for (const [key, chunk] of chunks.chunks) {
        if (onlyBuildConditions?.some(v => !chunk.conditions?.has(v))) {
            continue;
        }

        const builder = new OptionsBuilder();

        if (forceCocos && chunk.conditions) {
            for (const condition of chunk.conditions) {
                if (isW3CRuntimeKey(condition)) {
                    forceFalseConditions.add(condition);
                }
            }
            forceFalseConditions.delete("cocos");
            chunk.conditions.add("cocos");
        }

        builder.setInput(chunkToRollupInput(key, chunk));
        builder.setOutputDir(`./${chunkToDistDir(key)}`);
        builder.setOutputFormat(
            conditionsToFormat(chunk.conditions, json.type === "module"),
            json.type,
            forceExts,
        );
        builder.setExternal(external);
        builder.setTreeshake(treeshake);
        builder.setConditions(chunk.conditions);
        builder.setConstants({
            ...chunksToConstans(chunks, forceFalseConditions, chunk),
            ...constants,
        });
        builder.setImports(
            resolveImports(project, json.imports, chunk.conditions),
        );
        const suffixResult = pickRedirectSuffix(redirects, chunk);
        if (suffixResult.errMsg) {
            console.error(
                "发生错误：",
                "chunk:",
                key,
                "error:",
                suffixResult.errMsg,
            );
            return false;
        }
        builder.setRedirectSuffix(suffixResult.suffix);
        builder.setGenerateDeclarationFile(emitDeclarationFile);
        if (first) {
            builder.setClearDirs(cleanDirs);
            first = false;
        }

        await handler(builder);
    }

    return true;
}

export async function build(config: Config) {
    await executePreBuildAddons(config);
    const result = await handle(config, async builder => {
        try {
            const options = builder.build();
            const bundle = await rollup(options);
            await bundle.write(options.output as OutputOptions);
            await bundle.close();
        } catch (error) {
            console.error("rollup error:", error);
        }
    });
    if (result) {
        await executePostBuildAddons(config);
    }
    return result;
}

export async function watch(config: Config) {
    await executePreBuildAddons(config);
    return handle(config, async builder => {
        try {
            const options = builder.build();
            const watcher = rollupWatch(options);

            watcher.on("event", ({ code, result, error }: any) => {
                if (result) {
                    result.close();
                }
                if (code === "START") {
                    console.log("changing...");
                }
                if (code === "END") {
                    console.log("watching...");
                }
                if (code === "ERROR") {
                    console.log("watch error:", error);
                }
            });

            console.log("watching...");
        } catch (error) {
            console.error("rollup error:", error);
        }
    });
}

async function executePreBuildAddons(config: Config) {
    const { project, barrel, entryPoint, modules, autoFixImportsPath } = config;

    if (barrel?.atBuild) {
        await generateBarrel(
            barrel.files.map(v => ({
                project,
                ...v,
            })),
        );
    }

    if (autoFixImportsPath) {
        await fixImportsPath(project);
    }

    if (entryPoint?.atBuild) {
        await generateEntryPoints({
            packageJsonPath: join(project, "package.json"),
            ...entryPoint,
        });
    }

    if (modules?.atBuild) {
        await generateModules({
            project,
            ...modules,
        });
    }
}

async function executePostBuildAddons(config: Config) {
    const {
        project,
        apiReport,
        onlyBuildConditions,
        autoFixDeclarationFileExt,
    } = config;

    if (apiReport?.atBuild) {
        const { output } = apiReport;
        const json = await xfs.json<PackageJson>(join(project, "package.json"));
        if (json?.exports) {
            const chunks = genChunks(json.exports as string, []);
            for (const [distDir, chunk] of chunks.chunks) {
                if (
                    !chunk.dts ||
                    onlyBuildConditions?.some(v => !chunk.conditions?.has(v))
                ) {
                    continue;
                }
                for (const entry of chunk.entrys) {
                    await xfs.create(join(output, distDir));
                    await generateApiReport({
                        project,
                        file: join(
                            output,
                            distDir,
                            `${basename(entry)}.api.md`,
                        ),
                        entryPoint: toExtname(entry, ".d.ts"),
                        conditions: chunk.conditions
                            ? [...chunk.conditions]
                            : undefined,
                    });
                }
            }
        }
    }

    if (autoFixDeclarationFileExt) {
        await fixDeclarationFileExt(project);
    }
}
