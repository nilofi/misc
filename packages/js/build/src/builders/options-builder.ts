import commonjs from "@rollup/plugin-commonjs";
import nodeResolve, {
    type RollupNodeResolveOptions,
} from "@rollup/plugin-node-resolve";
import typescript, {
    type RollupTypescriptOptions,
} from "@rollup/plugin-typescript";
import type {
    InputOption,
    ModuleFormat,
    OutputOptions,
    RollupOptions,
} from "rollup";
import { clear, type ClearOptions } from "../components/clear.js";
import { constants, type ConstantsOptions } from "../components/constants.js";
import {
    nodejsImportsTransformer,
    type NodeJSImportsOptions,
} from "../components/nodejs-imports.js";
import {
    redirect,
    redirectTransformer,
    type RedirectOptions,
} from "../components/redirect.js";
import {
    tsConfigPaths,
    tsConfigPathsTransformer,
} from "../components/tsconfig-paths.js";
import { logger } from "../utils.js";

export enum PluginId {
    TypeScript,
    Redirect,
    NodeJSImports,
    Constants,
    NodeResolve,
    Clear,
}

/**
 * @see {@link https://github.com/rollup/plugins/issues/1541}
 */
const fix = <T>(f: { default: T }) => f as T;

export class OptionsBuilder {
    options: RollupOptions;
    plugins = new Map<PluginId, any>();
    ext: string = "js";

    constructor() {
        this.options = {
            output: {
                generatedCode: "es2015",
                sourcemap: true,
                preserveModules: true,
                preserveModulesRoot: "src",
                entryFileNames: chunkInfo => {
                    // 将 node_modules 映射为 external 解决某些环境的问题
                    if (chunkInfo.name.includes("node_modules")) {
                        return (
                            chunkInfo.name.replace(
                                /node_modules/g,
                                "external",
                            ) + `.${this.ext}`
                        );
                    }
                    return `[name].${this.ext}`;
                },
            },
            preserveSymlinks: true,
            onLog: logger(),
        };

        this.plugins.set(PluginId.TypeScript, {
            declaration: false,
            declarationMap: false,
            declarationDir: undefined,
            incremental: false,
            tsBuildInfoFile: undefined,
        } satisfies RollupTypescriptOptions);

        this.plugins.set(PluginId.Constants, {
            moduleName: "internal/constants",
            constants: {},
        } satisfies ConstantsOptions);

        this.plugins.set(
            PluginId.NodeResolve,
            {} satisfies RollupNodeResolveOptions,
        );

        this.plugins.set(PluginId.Clear, {
            atClose: false,
            paths: [],
        } satisfies ClearOptions);
    }

    setInput(input: InputOption) {
        this.options.input = input;
    }

    setOutputDir(dir: string) {
        (<OutputOptions>this.options.output).dir = dir;

        const ts = this.plugins.get(
            PluginId.TypeScript,
        ) as RollupTypescriptOptions;

        if (ts.declaration) {
            ts.declarationDir = dir;
        }
    }

    setOutputFormat(
        format: ModuleFormat & ("cjs" | "esm"),
        packageFormat: "module" | "commonjs" | undefined,
        forceExts?: { esm: string; cjs: string },
    ) {
        (<OutputOptions>this.options.output).format = format;

        if (packageFormat === "module") {
            if (format === "esm") {
                this.ext = forceExts?.esm ?? "js";
            } else {
                this.ext = forceExts?.cjs ?? "cjs";
            }
        } else {
            if (format === "esm") {
                this.ext = forceExts?.esm ?? "mjs";
            } else {
                this.ext = forceExts?.cjs ?? "js";
            }
        }
    }

    setExternal(external: RollupOptions["external"]) {
        this.options.external = external;
    }

    setTreeshake(treeshake: RollupOptions["treeshake"]) {
        this.options.treeshake = treeshake;
    }

    setConditions(conditions: Set<string> | null) {
        const ts = this.plugins.get(
            PluginId.TypeScript,
        ) as RollupTypescriptOptions;

        const nodeResolve = this.plugins.get(
            PluginId.NodeResolve,
        ) as RollupNodeResolveOptions;

        if (conditions) {
            ts.customConditions = [...conditions];
            nodeResolve.exportConditions = [...conditions];
        } else {
            delete ts.customConditions;
            delete nodeResolve.exportConditions;
        }
    }

    setRedirectSuffix(suffix: string) {
        if (suffix) {
            this.plugins.set(PluginId.Redirect, {
                suffix,
            } satisfies RedirectOptions);
        } else {
            this.plugins.delete(PluginId.Redirect);
        }
    }

    setImports(options?: NodeJSImportsOptions) {
        if (options) {
            this.plugins.set(PluginId.NodeJSImports, options);
        } else {
            this.plugins.delete(PluginId.NodeJSImports);
        }
    }

    setConstants(constants: Record<string, unknown>) {
        const opts = this.plugins.get(PluginId.Constants) as ConstantsOptions;
        opts.constants = constants;
    }

    setGenerateDeclarationFile(bool: boolean) {
        const ts = this.plugins.get(
            PluginId.TypeScript,
        ) as RollupTypescriptOptions;

        ts.declaration = bool;
        ts.declarationMap = bool;

        ts.declarationDir = bool
            ? (<OutputOptions>this.options.output).dir
            : undefined;
    }

    setClearDirs(dirs: string[]) {
        const opts = this.plugins.get(PluginId.Clear) as ClearOptions;
        opts.paths = dirs;
    }

    build() {
        const ts = this.plugins.get(
            PluginId.TypeScript,
        ) as RollupTypescriptOptions;
        const afterDeclarations: typescript.TransformerFactory<"afterDeclarations">[] =
            [];
        ts.transformers = {
            afterDeclarations,
        };

        // 插件的顺序非常重要
        this.options.plugins = [];
        this.options.plugins.push(tsConfigPaths());
        if (this.plugins.has(PluginId.Redirect)) {
            this.options.plugins.push(
                redirect(this.plugins.get(PluginId.Redirect)),
            );
        }
        this.options.plugins.push(
            constants(this.plugins.get(PluginId.Constants)),
        );
        this.options.plugins.push(fix(typescript)(ts));
        this.options.plugins.push(fix(commonjs)());
        this.options.plugins.push(
            fix(nodeResolve)(this.plugins.get(PluginId.NodeResolve)!),
        );
        this.options.plugins.push(clear(this.plugins.get(PluginId.Clear)!));

        afterDeclarations.push({
            type: "program",
            factory: tsConfigPathsTransformer(),
        });
        if (this.plugins.has(PluginId.NodeJSImports)) {
            afterDeclarations.push({
                type: "program",
                factory: nodejsImportsTransformer(
                    this.plugins.get(PluginId.NodeJSImports),
                ),
            });
        }
        if (this.plugins.has(PluginId.Redirect)) {
            afterDeclarations.push({
                type: "program",
                factory: redirectTransformer(
                    this.plugins.get(PluginId.Redirect),
                ),
            });
        }

        return this.options;
    }
}
