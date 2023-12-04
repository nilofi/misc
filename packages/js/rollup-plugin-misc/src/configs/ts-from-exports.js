import nodeResolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { packageJsonUtils } from "@xenon.js/studio-misc";
import { mkdirSync, readFileSync } from "fs";
import { basename, dirname, extname, format, join, parse, relative } from "path";
import { cwd } from "process";
import { defineConfig } from "rollup";
import { bundleStats } from "rollup-plugin-bundle-stats";
import dts from "rollup-plugin-dts";
import { getExternal, getExternalRegexp } from "../common/utils/external.js";
import { replaceFromLast } from "../common/utils/string.js";
import { renameBundleStatsReport } from "../plugins/rename-bundle-stats-report/index.js";

/**
 * @typedef Options
 *
 * @property {(string | RegExp)[]} [external] 不捆绑的包列表
 * @property {boolean} [autoExternal] 根据 {@link getExternal} 策略自动生成 `external` 列表，如果已经传入了 `external` 字段，则会与其合并，默认 `true`
 * @property {boolean} [forceGenTypes] 传入该属性控制是否强制生成或不生成 `d.ts` 文件，默认 `undefined` 自动判断
 * @property {boolean} [bundleTypes] 是否捆绑 `d.ts` 文件，默认 `false`
 * @property {((input:string)=>string) | "default"} [toBundleDistFileName] 可以传入 `default`，文件将会生成在同目录的 `*.bundle.d.ts`，可以提供一个函数，返回捆绑 `d.ts` 文件的生成路径，默认覆盖源文件
 * @property {{version?:string}} [macros] 宏定义，将替换相应的字符串，默认不替换
 */

/**
 * @typedef _SizeReportOptions
 *
 * @property {string} reportPath 存放报告的目录
 * @property {boolean} isBaseline 是否以此生成新的基准
 *
 * @typedef {Options & _SizeReportOptions} SizeReportOptions
 */

/**
 * @typedef {import("@xenon.js/studio-misc").PackageJsonExportsInput} PackageJsonExportsInput
 */

/**
 * 获取配置生成所需公共信息
 *
 * @param {Options} opts
 */
function getCommonThings(opts) {
    const {
        // prettier-keep
        autoExternal = true,
    } = opts;

    /**
     * @type {{name:string,private?:boolean,exports:PackageJsonExportsInput,dependencies?:Record<string,string>}}
     */
    const packageJson = JSON.parse(readFileSync(join(cwd(), "./package.json"), { encoding: "utf-8" }));

    /**
     * @type {Set<string>}
     */
    const distCaches = new Set();

    return {
        /**
         * `package.json` 对象
         */
        packageJson,

        /**
         * 防止重复打包的记录
         */
        distCaches,

        /**
         * 防止多个入口指向同一个文件导致重复打包
         *
         * @param {string} path
         */
        isDuplicate(path) {
            if (distCaches.has(path)) {
                return true;
            }
            distCaches.add(path);
            return false;
        },

        /**
         * 标准化的 `exports` 对象
         */
        exports: packageJsonUtils.normalize(packageJson.exports),

        /**
         * 经过处理的 `external` 列表
         */
        external: autoExternal ? getExternal(packageJson, opts.external) : opts.external ?? [],
    };
}

/**
 * 获取源文件路径
 *
 * `dist/abc/index.js` 对应 `src/abc/index.ts`
 *
 * @param {string} distFile
 */
function getInputFile(distFile) {
    const obj = parse(distFile);
    obj.dir = obj.dir.replace("dist", "src");
    obj.ext = ".ts";
    obj.base = obj.name + obj.ext;
    return format(obj);
}

/**
 * 获取源文件路径
 *
 * `dist/abc/index.d.ts` 对应 `dist/abc/index.js`
 *
 * @param {string} distFile
 */
function getTypesSourceFile(distFile) {
    return distFile.replace(".d.ts", ".js");
}

/**
 * 摇树配置
 *
 * @returns {import("rollup").RollupOptions["treeshake"]}
 */
function treeshakeConfig() {
    return {
        moduleSideEffects: false,
    };
}

/**
 * 基础配置
 *
 * @param {string} input
 * @param {string} dist
 * @param {string} target
 */
function baseConfig(input, dist, target) {
    return {
        config: defineConfig({
            input: input,
            output: {
                file: dist,
                generatedCode: "es2015",
                sourcemap: true,
            },
            treeshake: treeshakeConfig(),
            preserveSymlinks: true,
            plugins: [],
        }),
        plugins: {
            /**
             * @type {import("@rollup/plugin-typescript").RollupTypescriptOptions}
             */
            typescript: {
                declaration: false,
                declarationMap: false,
                declarationDir: undefined,
                customConditions: [target],
            },
            /**
             * @type {import("@rollup/plugin-replace").RollupReplaceOptions}
             */
            replace: {
                delimiters: ["", ""],
            },
        },
        applyPlugins() {
            const plugins = this.plugins;
            // @ts-ignore
            this.config.plugins.push(replace(plugins.replace));
            // @ts-ignore
            this.config.plugins.push(typescript(plugins.typescript));
            // @ts-ignore
            this.config.plugins.push(
                // @ts-ignore
                nodeResolve({
                    exportConditions: [target],
                }),
            );
        },
    };
}

/**
 * 捆绑 d.ts 配置
 *
 * @param {string} input
 * @param {string} dist
 * @param {string} target
 * @param {import("rollup").RollupOptions["external"]} external
 */
function bundleTypesConfig(input, dist, target, external) {
    return defineConfig({
        input: input,
        output: {
            file: dist,
            sourcemap: true,
        },
        treeshake: treeshakeConfig(),
        external,
        preserveSymlinks: true,
        plugins: [
            // @ts-ignore
            nodeResolve({
                exportConditions: [target],
            }),
            dts({
                respectExternal: true,
            }),
        ],
    });
}

/**
 * 设置宏替换
 *
 * @param {{
    replace: import("@rollup/plugin-replace").RollupReplaceOptions;
}} plugins
 * @param {Options} opts
 */
function setMacroReplace(plugins, opts) {
    if ("version" in opts.macros) {
        plugins.replace["$:VERSION"] = opts.macros.version;
    }
}

/**
 * 设置生成类型
 *
 * @param {{
    typescript: import("@rollup/plugin-typescript").RollupTypescriptOptions;
}} plugins
 * @param {string} distFile
 */
function setGenTypes(plugins, distFile) {
    plugins.typescript.declaration = true;
    plugins.typescript.declarationMap = true;
    plugins.typescript.declarationDir = dirname(distFile);
}

/**
 * 将 `external` 名称列表转换为模块正则表达式列表
 *
 * @param {string[]} names
 */
export function toExternalRegexps(names) {
    return names.map(name => getExternalRegexp(name));
}

/**
 * 路径转换为 `*.bundle.d.ts` 文件名
 */
function toBundleDistFileName(input) {
    const temp = parse(input);
    temp.name = replaceFromLast(temp.name, ".d", ".bundle.d");
    temp.base = temp.name + temp.ext;
    return format(temp);
}

/**
 * 根据 `package.json` 的 `exports` 字段生成编译 TypeScript 的 `rollup` 配置
 *
 * - 需先填写标准的 `exports` 对象格式，可参考 {@link PackageJsonExportsInput} 的类型定义
 * - 需将源码存放在 `src` 目录，编译后的文件固定输出至 `dist` 目录，所以如果 `exports` 入口文件写的是 `./dist/index.js`，那么对应编译的则是 `./src/index.ts` 文件
 * - 默认会根据 `types` 入口自动生成 `d.ts` 文件，如果入口文件是 `./dist/index.d.ts`，会尝试查找同级入口文件是 `./dist/index.js` 的入口作为源来生成 `d.ts` 文件
 * - 请确保 rollup 命令执行的目录是 `package.json` 所在的目录
 *
 * @param {Options} opts
 * @returns {import("rollup").RollupOptions[]}
 */
export function tsConfigFromExports(opts) {
    const {
        // prettier-keep
        packageJson,
        isDuplicate,
        exports,
        external,
    } = getCommonThings(opts);

    /**
     * @type {import("rollup").RollupOptions[]}
     */
    const configs = [];

    for (const path in exports) {
        const targets = exports[path];
        for (const target in targets) {
            const typesObject = targets[target];

            const hasTypes = typesObject.types != null;
            const typesSourceFile = hasTypes ? getTypesSourceFile(typesObject.types) : null;
            let typesGenerated = false;

            for (const type in typesObject) {
                if (type === "types") {
                    continue;
                }

                const distFile = typesObject[type];
                const inputFile = getInputFile(distFile);

                if (isDuplicate(distFile)) {
                    continue;
                }

                const data = baseConfig(inputFile, distFile, target);
                const {
                    // prettier-keep
                    config,
                    plugins,
                    applyPlugins,
                } = data;

                // 排除包
                if (external) {
                    config.external = external;
                }

                // 当有宏替换配置时
                if (opts.macros) {
                    setMacroReplace(plugins, opts);
                }

                // 当是 d.ts 源文件或强制生成类型时
                if (opts.forceGenTypes || (hasTypes && typesSourceFile === distFile && opts.forceGenTypes !== false)) {
                    setGenTypes(plugins, distFile);
                    typesGenerated = true;
                }

                applyPlugins.call(data);

                configs.push(config);
            }

            if (hasTypes && !typesGenerated) {
                throw new Error("can't find the source file for types");
            }

            if (opts.bundleTypes && typesGenerated) {
                const inputFile = typesObject.types;
                const distFile = opts.toBundleDistFileName === "default" ? toBundleDistFileName(inputFile) : opts.toBundleDistFileName ? opts.toBundleDistFileName(inputFile) : inputFile;
                if (!isDuplicate(distFile)) {
                    const config = bundleTypesConfig(inputFile, distFile, target, external);
                    configs.push(config);
                }
            }
        }
    }

    return configs;
}

/**
 * 与 {@link tsConfigFromExports} 配置基本相同，但用于生成 size 报告
 *
 * @param {SizeReportOptions} opts
 * @returns {import("rollup").RollupOptions[]}
 */
export function tsSizeReportConfigFromExports(opts) {
    const {
        // prettier-keep
        packageJson,
        isDuplicate,
        exports,
        external,
    } = getCommonThings(opts);

    const reportDir = opts.reportPath;

    mkdirSync(reportDir, { recursive: true });

    /**
     * @type {import("rollup").RollupOptions[]}
     */
    const configs = [];

    for (const path in exports) {
        const targets = exports[path];
        for (const target in targets) {
            const typesObject = targets[target];

            for (const type in typesObject) {
                if (type === "types") {
                    continue;
                }

                const distFile = typesObject[type];
                const inputFile = getInputFile(distFile);

                if (isDuplicate(distFile)) {
                    continue;
                }

                const data = baseConfig(inputFile, distFile, target);
                const {
                    // prettier-keep
                    config,
                    plugins,
                    applyPlugins,
                } = data;

                // 排除包
                if (external) {
                    config.external = external;
                }

                // 当有宏替换配置时
                if (opts.macros) {
                    setMacroReplace(plugins, opts);
                }

                const reportDir = opts.reportPath;
                const name = packageJson.name.replaceAll("@", "").replaceAll("/", "-");
                const distName = basename(distFile, extname(distFile));
                const baselineDir = join(reportDir, "baselines");
                const baselineFile = join(baselineDir, `${name}.${distName}.baseline.json`);

                // @ts-ignore
                config.plugins.push(
                    // @ts-ignore
                    terser({
                        ecma: 2020,
                    }),
                    bundleStats({
                        compare: true,
                        baseline: false,
                        baselineFilepath: baselineFile,
                        outDir: relative(cwd(), reportDir),
                    }),
                );

                if (opts.isBaseline) {
                    // @ts-ignore
                    config.plugins.push(
                        bundleStats({
                            compare: false,
                            baseline: true,
                            baselineFilepath: baselineFile,
                            outDir: relative(cwd(), reportDir),
                            html: false,
                            json: false,
                        }),
                    );
                }

                // @ts-ignore
                config.plugins.push(
                    renameBundleStatsReport({
                        source: join(reportDir, "bundle-stats.html"),
                        dist: join(reportDir, `${name}.${distName}.bundle-stats.html`),
                    }),
                );

                applyPlugins.call(data);

                configs.push(config);
            }
        }
    }

    return configs;
}
