/** @import { FlatESLintConfig } from "eslint-define-config" */
/**
 * @typedef Config
 *
 * @property {string} [gitignorePath] .gitignore 路径，默认 `resolve(cwd(), ".gitignore")`
 * @property {boolean} [ignoreConfigFiles] 忽略所有 *.config 配置文件，比如 eslint.config.js，默认 `true`
 * @property {"none" | "loose" | "strict"} [jsdocLevel] JSDoc 检查级别，默认 `loose`
 * @property {string[]} [jsdocDefinedTags] 额外允许的 JSDoc 标签列表
 */
/**
 * @param {Config} config
 * @returns {FlatESLintConfig}
 */
export function config(config?: Config): comments;
/**
 * @typedef ConfigForNodeJS
 *
 * @property {boolean} [includeSecurityRules] 是否启用安全性规则，默认 `true`
 */
/**
 * 针对 Node.JS 的配置
 *
 * 建议配置 `engines` 字段以提供准确的检查，详情请查看 [NPM 文档](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#engines)
 *
 * @param {ConfigForNodeJS} config
 * @returns {FlatESLintConfig}
 */
export function configForNodeJS(config?: ConfigForNodeJS): comments;
/**
 * @typedef ConfigForWeb
 */
/**
 * 针对 Web 的配置
 *
 * 建议配置 `engines` 字段以提供准确的检查，详情请查看 [NPM 文档](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#engines)
 *
 * @param {ConfigForWeb} config
 * @returns {FlatESLintConfig}
 */
export function configForWeb(config?: ConfigForWeb): comments;
export type Config = {
    /**
     * .gitignore 路径，默认 `resolve(cwd(), ".gitignore")`
     */
    gitignorePath?: string;
    /**
     * 忽略所有 *.config 配置文件，比如 eslint.config.js，默认 `true`
     */
    ignoreConfigFiles?: boolean;
    /**
     * JSDoc 检查级别，默认 `loose`
     */
    jsdocLevel?: "none" | "loose" | "strict";
    /**
     * 额外允许的 JSDoc 标签列表
     */
    jsdocDefinedTags?: string[];
};
export type ConfigForNodeJS = {
    /**
     * 是否启用安全性规则，默认 `true`
     */
    includeSecurityRules?: boolean;
};
export type ConfigForWeb = any;
