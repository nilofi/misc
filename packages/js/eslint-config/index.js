import typescriptParser from "@typescript-eslint/parser";

/**
 * 用于 ESLint 配置文件的脚本文件扩展名
 *
 * @type {string}
 */
export const eslintScriptExts = `{js?(x),ts?(x),mts,mjs,cts,cjs}`;

/**
 * 用于 ESLint 配置文件的脚本文件扩展名
 *
 * @type {string}
 */
export const eslintTypeScriptExts = `{ts?(x),mts,cts}`;

/**
 * 用于 ESLint 配置文件的测试脚本文件名后缀
 *
 * @type {string}
 */
export const eslintTestScriptSuffixs = `{test,spec}`;

/**
 * ESLint TypeScript 解析器配置
 *
 * @type {import('eslint').Linter.FlatConfig}
 */
export const eslintTypeScriptParserConfig = {
    languageOptions: {
        parser: typescriptParser,
        parserOptions: {
            project: true,
        },
    },
};

export { default as commonConfig } from "./configs/acommon.js";
export { default as baseLooseConfig } from "./configs/base.loose.js";
export { default as baseStrictConfig } from "./configs/base.strict.js";
export { default as jsdocLooseConfig } from "./configs/jsdoc.loose.js";
export { default as jsdocStrictConfig } from "./configs/jsdoc.strict.js";
export { default as styleLooseConfig } from "./configs/style.loose.js";
export { default as styleStrictConfig } from "./configs/style.strict.js";
export { default as testLooseConfig } from "./configs/test.loose.js";
export { default as testStrictConfig } from "./configs/test.strict.js";
