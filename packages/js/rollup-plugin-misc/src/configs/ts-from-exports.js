import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { packageJsonUtils, TEMP_RELATIVE_PATH } from "@xenon.js/studio-misc";
import { mkdirSync, readFileSync } from "fs";
import { format, join, parse, relative } from "path";
import { cwd } from "process";
import { defineConfig } from "rollup";
import { bundleStats } from "rollup-plugin-bundle-stats";
import dts from "rollup-plugin-dts";
import { getExternal, getExternalRegexp } from "../common/utils/external.js";
import { replaceFromLast } from "../common/utils/string.js";
import { clear, clearAtEnd } from "../plugins/clear/index.js";
import { renameBundleStatsReport } from "../plugins/rename-bundle-stats-report/index.js";

const ROLLUP_WATCH = process.env.ROLLUP_WATCH === "true";

/**
 * @typedef Options
 *
 * @property {string[]} [clean] 打包前清空路径列表
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
 * @typedef {{typesInput:string|null}} SubPathInfoOptions
 */

/**
 * @typedef {{input:{[name:string]:string},format:import("rollup").InternalModuleFormat,target:string} & SubPathInfoOptions} BuildInfo
 */

/**
 * @typedef {{key:string,input:string} & SubPathInfoOptions} SubPathInfo
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
    /**
     * @type {{name:string,private?:boolean,exports:PackageJsonExportsInput,dependencies?:Record<string,string>,xenon?:any}}
     */
    const packageJson = JSON.parse(readFileSync(join(cwd(), "./package.json"), { encoding: "utf-8" }));

    let { autoExternal = opts.autoExternal ?? true, external = [] } = packageJson.xenon?.build ?? {};

    external = external.map(name => getExternalRegexp(name));

    if (opts.external) {
        external.push(...opts.external);
    }

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
        external: autoExternal ? getExternal(packageJson, external) : external ?? [],

        /**
         * 传入该属性控制是否强制生成或不生成 `d.ts` 文件，默认 `undefined` 自动判断
         */
        forceGenTypes: packageJson.xenon?.build?.forceGenTypes ?? opts.forceGenTypes,

        /**
         * 是否捆绑 `d.ts` 文件，默认 `false`
         */
        bundleTypes: packageJson.xenon?.build?.bundleTypes ?? opts.bundleTypes,

        /**
         * 打包前清空路径列表
         */
        cleanPaths: (packageJson.xenon?.build?.clean ?? []).concat(opts.clean ?? []),
    };
}

/**
 * 将 `exports` 转换为 {@link BuildInfo} 集合
 *
 * @param {import("@xenon.js/studio-misc").PackageJsonExportsOutput} exports
 * @param {boolean} forceGenTypes
 * @returns {Map<string, Map<string,BuildInfo>>}
 */
function toBuildInfos(exports, forceGenTypes) {
    const infos = new Map();

    /**
     * @param {string} target
     * @param {string} type
     * @param {SubPathInfo} subPathInfo
     */
    const addSubPath = (target, type, subPathInfo) => {
        const format = toFormat(type);

        if (!infos.has(target)) {
            infos.set(target, new Map());
        }
        const infoMap = infos.get(target);

        if (!infoMap.has(format)) {
            infoMap.set(format, { input: {}, target, format, typesInput: null });
        }
        const info = infoMap.get(format);

        info.input[subPathInfo.key] = subPathInfo.input;

        if (subPathInfo.typesInput != null) {
            if (info.typesInput != null) {
                if (subPathInfo.typesInput !== "") {
                    info.typesInput = subPathInfo.typesInput;
                }
            } else {
                info.typesInput = subPathInfo.typesInput;
            }
        }
    };

    // 将所有配置转到 infos 中
    for (const path in exports) {
        const targets = exports[path];

        for (const target in targets) {
            const typesObject = targets[target];
            const hasTypes = typesObject.types != null;
            const typesSourceFile = hasTypes ? getTypesSourceFile(typesObject.types) : null;
            let isSourceFileFind = false;

            for (const type in typesObject) {
                if (type === "types") continue;

                const distFile = typesObject[type];
                const inputFile = getInputFile(distFile);

                if (hasTypes && typesSourceFile === distFile) {
                    isSourceFileFind = true;
                }

                const genTypes = (isSourceFileFind && forceGenTypes !== false) || forceGenTypes;

                addSubPath(target, type, { key: distFile, input: inputFile, typesInput: genTypes ? typesSourceFile ?? "" : null });
            }

            if (hasTypes && !isSourceFileFind && forceGenTypes == undefined) {
                throw new Error("can't find the source file for types.");
            }
        }
    }

    return infos;
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
        // moduleSideEffects: false,
    };
}

/**
 * 基础配置
 *
 * @param {BuildInfo} info
 */
function baseConfig(info) {
    return {
        config: defineConfig({
            input: toRollupInput(info.input),
            output: {
                dir: "./dist",
                format: info.format,
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
                customConditions: [info.target],
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
                commonjs(),
                // @ts-ignore
                nodeResolve({
                    exportConditions: [info.target],
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
            commonjs(),
            // @ts-ignore
            nodeResolve({
                exportConditions: [target, "types"],
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
 */
function setGenTypes(plugins) {
    plugins.typescript.declaration = true;
    plugins.typescript.declarationMap = true;
    plugins.typescript.declarationDir = "./dist";
}

/**
 * 插入清空插件
 *
 * @param {boolean} isAfter
 * @param {import("rollup").RollupOptions[]} configs
 * @param {string[]} paths
 * @param {string[]} [pathsIfEmpty]
 */
function addClearPlugin(isAfter, configs, paths, pathsIfEmpty) {
    const firstConfig = configs[0];
    // @ts-ignore
    firstConfig.plugins.unshift(
        (isAfter ? clearAtEnd : clear)({
            targets: paths,
            targetsIfEmpty: pathsIfEmpty,
        }),
    );
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
 * 路径转换为 `*.d.ts` 文件名
 *
 * @param {string} input
 */
function toBundleInputFileName(input) {
    const temp = parse(input);
    temp.name = temp.name + ".d";
    temp.ext = ".ts";
    temp.base = temp.name + temp.ext;
    return format(temp);
}

/**
 * 路径转换为 `*.bundle.d.ts` 文件名
 *
 * @param {string} input
 */
function toBundleDistFileName(input) {
    const temp = parse(input);
    temp.name = replaceFromLast(temp.name, ".d", ".bundle.d");
    temp.base = temp.name + temp.ext;
    return format(temp);
}

/**
 * `exports` 中的 `type` 转为 `format`
 *
 * @param {string} type
 */
function toFormat(type) {
    switch (type) {
        case "import":
            return "es";

        case "require":
            return "cjs";

        default:
            return "es";
    }
}

/**
 * 将 {@link BuildInfo.input} 转换为 `rollup` 的 `input` 格式
 *
 * @param {BuildInfo["input"]} input
 * @returns {import("rollup").RollupOptions["input"]}
 */
function toRollupInput(input) {
    const _keys = Object.keys(input);
    /**
     * @type {import("rollup").RollupOptions["input"]}
     */
    const out = {};
    for (const _key of _keys) {
        out[toEntryKey(_key)] = input[_key];
    }
    return out;
}

/**
 * `./dist/index.js` -> `dist/index`
 *
 * @param {string} key
 */
function toEntryKey(key) {
    const info = parse(key);
    let str = "";
    if (info.dir.startsWith("./dist")) {
        str = info.dir.replace("./dist", "");
    } else if (info.dir.startsWith("/dist")) {
        str = info.dir.replace("/dist", "");
    } else {
        str = info.dir;
    }
    str = join(str, info.name);
    return str;
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
        // @ts-ignore
        packageJson,
        isDuplicate,
        exports,
        external,
        forceGenTypes,
        bundleTypes,
        cleanPaths,
    } = getCommonThings(opts);

    /**
     * @type {import("rollup").RollupOptions[]}
     */
    const configs = [];

    /**
     * @type {Map<string, Map<string,BuildInfo>>} target -> format -> buildInfo
     */
    const infos = toBuildInfos(exports, forceGenTypes);

    // @ts-ignore
    for (const [target, formatMap] of infos) {
        for (const info of formatMap.values()) {
            // 可以处理的重复入口文件都在 addSubPath 中处理了
            // 这里有重复入口文件是错误的
            if (Object.keys(info.input).some(v => isDuplicate(v))) {
                throw new Error("different target or different format can't have the same entry file.");
            }

            const data = baseConfig(info);
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

            // 生成 d.ts 文件
            if (info.typesInput != null) {
                setGenTypes(plugins);
            }

            applyPlugins.call(data);

            configs.push(config);
        }
    }

    if (bundleTypes) {
        for (const [target, formatMap] of infos) {
            for (const info of formatMap.values()) {
                if (info.typesInput != null) {
                    for (const key in info.input) {
                        const inputFile = toBundleInputFileName(key);
                        const distFile = opts.toBundleDistFileName === "default" ? toBundleDistFileName(inputFile) : opts.toBundleDistFileName ? opts.toBundleDistFileName(inputFile) : inputFile;
                        if (!isDuplicate(distFile)) {
                            const config = bundleTypesConfig(inputFile, distFile, target, external);
                            configs.push(config);
                        }
                    }
                }
            }
        }
    }

    // 清空输出目录
    if (!ROLLUP_WATCH && cleanPaths.length > 0) {
        addClearPlugin(false, configs, cleanPaths);
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
        cleanPaths,
        forceGenTypes,
    } = getCommonThings(opts);

    const {
        // prettier-keep
        reportPath: reportDir,
    } = opts;

    mkdirSync(reportDir, { recursive: true });

    /**
     * @type {import("rollup").RollupOptions[]}
     */
    const configs = [];

    /**
     * @type {Map<string, Map<string,BuildInfo>>} target -> format -> buildInfo
     */
    const infos = toBuildInfos(exports, forceGenTypes);

    for (const formatMap of infos.values()) {
        for (const info of formatMap.values()) {
            // 可以处理的重复入口文件都在 addSubPath 中处理了
            // 这里有重复入口文件是错误的
            if (Object.keys(info.input).some(v => isDuplicate(v))) {
                throw new Error("different target or different format can't have the same entry file.");
            }

            const data = baseConfig(info);
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

            // 将输出目录转到 temp/dist 目录
            // @ts-ignore
            config.output.dir = join(TEMP_RELATIVE_PATH, "dist");

            const name = packageJson.name.replaceAll("@", "").replaceAll("/", "-");
            const baselineDir = join(reportDir, "baselines");
            const baselineFile = join(baselineDir, `${name}.${info.target}.${info.format}.baseline.json`);

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
                    // @ts-ignore
                    outDir: relative(join(cwd(), config.output.dir), reportDir),
                }),
            );

            if (opts.isBaseline) {
                // @ts-ignore
                config.plugins.push(
                    bundleStats({
                        compare: false,
                        baseline: true,
                        baselineFilepath: baselineFile,
                        // @ts-ignore
                        outDir: relative(join(cwd(), config.output.dir), reportDir),
                        html: false,
                        json: false,
                    }),
                );
            }

            // @ts-ignore
            config.plugins.push(
                renameBundleStatsReport({
                    source: join(reportDir, "bundle-stats.html"),
                    dist: join(reportDir, `${name}.${info.target}.${info.format}.bundle-stats.html`),
                }),
            );

            applyPlugins.call(data);

            configs.push(config);
        }
    }

    // 清空输出目录
    if (!ROLLUP_WATCH && cleanPaths.length > 0) {
        addClearPlugin(
            true,
            configs,
            cleanPaths.map(v => join(TEMP_RELATIVE_PATH, v)),
            [TEMP_RELATIVE_PATH],
        );
    }

    return configs;
}
