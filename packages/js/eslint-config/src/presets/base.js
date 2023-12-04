// @ts-nocheck
import { MonorepoInfo } from "@xenon.js/studio-misc";
import { join } from "path";
import { eslintScriptExts, eslintTestScriptSuffixs } from "../common/globs.js";
import { default as baseStrictConfig } from "../configs/base.strict.js";
import { default as jsdocStrictConfig } from "../configs/jsdoc.strict.js";
import { default as styleStrictConfig } from "../configs/style.strict.js";
import { default as testStrictConfig } from "../configs/test.strict.js";
import { eslintTypeScriptParserConfig } from "../configs/typescript/parser.js";

/**
 * @typedef BaseConfigOptions
 *
 * @property {boolean} [default] 是否生成默认配置，默认 `false`
 * @property {boolean} [monorepo] 是否为 Monorepo，默认 `false`
 * @property {string[]} [ignorePackages] 生成 Monorepo 默认配置时，要忽略的包
 * @property {string[]} [dirs] 需检查的文件夹路径，支持 glob
 * @property {string[]} [ignores] 需全局忽略的文件夹路径，支持 glob
 */

/**
 * 返回基础配置
 *
 * @param {BaseConfigOptions} opts
 *
 * @returns {import('eslint').Linter.FlatConfig[]}
 */
export function baseConfig(opts) {
    /**
     * 全局忽略
     */
    const ignores = {
        ignores: [
            // prettier-keep
            ...(opts.default ? [`**/dist/**/*`] : []),
            ...(opts.ignores ?? []),
        ],
    };

    /**
     * 排除测试用的脚本
     *
     * @type {import('eslint').Linter.FlatConfig}
     */
    const scriptsWithoutTests = {
        files: [
            // prettier-keep
            // example: `src/**/*.${eslintScriptExts}`,
        ],
        ignores: [
            // prettier-keep
            // example: `src/**/*.${eslintTestScriptSuffixs}.${eslintScriptExts}`,
        ],
    };

    /**
     * 测试脚本
     *
     * @type {import('eslint').Linter.FlatConfig}
     */
    const testScripts = {
        files: [
            // prettier-keep
            // example: `src/**/*.${eslintTestScriptSuffixs}.${eslintScriptExts}`,
        ],
    };

    /**
     * @param {string} dir
     */
    function addDir(dir) {
        scriptsWithoutTests.files.push(join(dir, `**/*.${eslintScriptExts}`));
        scriptsWithoutTests.ignores.push(join(dir, `**/*.${eslintTestScriptSuffixs}.${eslintScriptExts}`));
        testScripts.files.push(join(dir, `**/*.${eslintTestScriptSuffixs}.${eslintScriptExts}`));
    }

    // 自动将所有 Monorepo 包加入检查路径
    if (opts.monorepo && opts.default) {
        const monorepo = new MonorepoInfo();
        for (const glob of monorepo.info.packages) {
            addDir(glob);
        }
        if (opts.ignorePackages) {
            for (const packageName of opts.ignorePackages) {
                ignores.ignores.push(join(monorepo.packageInfos.get(packageName).path, "**/*"));
            }
        }
    }

    if (opts.dirs) {
        for (const dir of opts.dirs) {
            addDir(dir);
        }
    }

    // 兼容 Monorepo
    if (opts.monorepo) {
        eslintTypeScriptParserConfig.languageOptions.parserOptions.project = ["./**/tsconfig.json"];
    }

    /**
     * 配置
     *
     * @type {import('eslint').Linter.FlatConfig[]}
     */
    return [
        ignores,
        {
            ...scriptsWithoutTests,
            ...eslintTypeScriptParserConfig,
        },
        {
            ...testScripts,
            ...eslintTypeScriptParserConfig,
        },
        {
            ...scriptsWithoutTests,
            ...baseStrictConfig,
        },
        {
            ...scriptsWithoutTests,
            ...styleStrictConfig,
        },
        {
            ...scriptsWithoutTests,
            ...jsdocStrictConfig,
        },
        {
            ...testScripts,
            ...testStrictConfig,
        },
    ];
}
