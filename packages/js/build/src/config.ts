import { cwd } from "process";
import type { RollupOptions } from "rollup";
import type { ApiReportAddonConfig } from "./addons/api-report/config.js";
import type { BarrelGeneratorAddonConfig } from "./addons/barrel-generator/config.js";
import type { EntryPointsGeneratorAddonConfig } from "./addons/entry-points-generator/config.js";
import type { ModulesGeneratorAddonConfig } from "./addons/modules-generator/config.js";

export interface Config {
    /**
     * 项目路径，默认 {@link cwd}
     */
    project: string;

    /**
     * 是否生成 `.d.ts` 文件，默认 `true`
     */
    emitDeclarationFile: boolean;

    /**
     * 构建前清空的路径列表，默认 `["./dist"]`
     */
    cleanDirs: string[];

    /**
     * 允许重定向的条件列表，默认包含所有 [W3C Runtime Keys](https://runtime-keys.proposal.wintercg.org/)，并额外包含：
     * - `node-addons`
     * - `cocos`
     * - `browser`
     *
     * @deprecated 使用 `imports` 替代该功能
     */
    redirects: string[];

    /**
     * 摇树选项，默认值与 Rollup 一致
     */
    treeshake: RollupOptions["treeshake"];

    /**
     * 外部导入，默认值与 Rollup 一致
     */
    external: RollupOptions["external"];

    /**
     * 强制指定输出扩展名，默认根据 `package.json` 的 `type` 字段值自动设定
     */
    forceExts?: { esm: string; cjs: string };

    /**
     * 构建常量，无论是否定义，都会将所有条件作为全大写常量名导出，可通过 `internal/constants` 导入
     */
    constants?: Record<string, unknown>;

    /**
     * 构建可执行入口点使用的条件，默认 `["node", "import"]`
     */
    binConditions: string[];

    /**
     * 仅构建同时符合这些条件的 Chunk
     */
    onlyBuildConditions?: string[];

    /**
     * 强制生成 `cocos` 版本，以解决 `cocos` 条件导出读取错误问题（总是读取 `default`）
     */
    forceCocos: boolean;

    /**
     * 自动桶文件内容生成器
     */
    barrel?: BarrelGeneratorAddonConfig;

    /**
     * 入口点生成器
     */
    entryPoint?: EntryPointsGeneratorAddonConfig;

    /**
     * 模块列表生成器
     */
    modules?: ModulesGeneratorAddonConfig;

    /**
     * API 报告生成器
     */
    apiReport?: ApiReportAddonConfig;

    /**
     * 尝试自动替换 `imports` 中存在的路径，默认 `true`
     */
    autoFixImportsPath: boolean;

    /**
     * 尝试自动修复 `.d.ts` 为 `.d.mts` 或者 `.d.cts`，默认 `true`
     */
    autoFixDeclarationFileExt: boolean;
}

export type ConfigInput = Partial<Config> & Required<Pick<Config, never>>;

export function resolveConfig(config: ConfigInput): Config {
    const {
        project = cwd(),
        emitDeclarationFile = true,
        redirects = [
            "browser",
            "node-addons",
            "edge-routine",
            "workerd",
            "deno",
            "lagon",
            "react-native",
            "moddable",
            "netlify",
            "electron",
            "node",
            "bun",
            "react-server",
            "edge-light",
            "fastly",
            "kiesel",
            "wasmer",
            "cocos",
        ],
        treeshake,
        external,
        forceExts,
        constants,
        cleanDirs = ["./dist"],
        forceCocos = false,
        onlyBuildConditions,
        binConditions = ["node", "import"],
        barrel,
        entryPoint,
        modules,
        apiReport,
        autoFixImportsPath = true,
        autoFixDeclarationFileExt = true,
    } = config;

    return {
        project,
        emitDeclarationFile,
        // 遗留功能，不再使用
        redirects: [],
        treeshake,
        external,
        forceExts,
        constants,
        cleanDirs,
        forceCocos,
        onlyBuildConditions,
        binConditions,
        barrel,
        entryPoint,
        modules,
        apiReport,
        autoFixImportsPath,
        autoFixDeclarationFileExt,
    };
}
