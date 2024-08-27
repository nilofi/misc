import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import { convertIgnorePatternToMinimatch } from "@eslint/compat";
import js from "@eslint/js";
import html from "@html-eslint/eslint-plugin";
import jsdoc from "eslint-plugin-jsdoc";
import { getJsdocProcessorPlugin } from "eslint-plugin-jsdoc/getJsdocProcessorPlugin.js";
import node from "eslint-plugin-n";
import nodeSecurity from "eslint-plugin-security";
import { existsSync, readFileSync } from "fs";
import { isAbsolute, resolve } from "path";
import { cwd } from "process";
import {
    config as defineConfig,
    configs as tsConfigs,
    parser as tsParser,
} from "typescript-eslint";
import { javascriptExt, scriptExt, typescriptExt } from "./glob.js";
import jsdocTagSequence from "./jsdoc-tag-sequence.js";

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
export function config(config = {}) {
    const {
        gitignorePath = resolve(cwd(), ".gitignore"),
        ignoreConfigFiles = true,
        jsdocLevel = "loose",
        jsdocDefinedTags = [],
    } = config;

    return defineConfig(
        // 忽略文件
        gitignorePath ? includeIgnoreFile(gitignorePath) : {},
        ignoreConfigFiles
            ? {
                  // 比如根目录的 eslint.config.js
                  ignores: [`**/*.config.${scriptExt}`],
              }
            : {},

        // 默认文件
        {
            files: [`**/*.${scriptExt}`],
        },

        // 基本配置
        {
            languageOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                parserOptions: {
                    projectService: true,
                    ecmaFeatures: {
                        jsx: true,
                    },
                },
            },
            linterOptions: {
                reportUnusedDisableDirectives: "error",
            },
        },

        // 推荐配置
        js.configs.recommended,

        ...tsConfigs.strictTypeChecked,
        ...tsConfigs.stylisticTypeChecked,

        comments.recommended,

        // 偏好配置
        {
            rules: {
                // 不在 @eslint/js 推荐规则内，自认为需要启用的规则
                "array-callback-return": ["error", { checkForEach: false }],
                "no-constructor-return": "error",
                "no-promise-executor-return": "error",
                "no-self-compare": "error",
                "no-template-curly-in-string": "warn",
                "no-unmodified-loop-condition": "error",
                "default-case-last": "error",
                "eqeqeq": ["error", "smart"],
                "grouped-accessor-pairs": ["warn", "getBeforeSet"],
                // 本条已在 @typescript-eslint 推荐规则中
                // "no-array-constructor": "off",
                // "@typescript-eslint/no-array-constructor": "error",
                "no-caller": "error",
                "no-iterator": "error",
                "no-label-var": "error",
                "no-new-wrappers": "error",
                "no-object-constructor": "error",
                "no-return-assign": "error",
                "no-useless-return": "warn",
                "no-var": "error",
                "prefer-object-has-own": "error",
                "prefer-regex-literals": "warn",
                "prefer-rest-params": "error",
                "prefer-template": "warn",
                "require-unicode-regexp": "warn",

                // 被 @typescript-eslint 启用，但错误级别太高
                "prefer-const": "warn",

                // 由于其它规则要求必须处理 Promise，当显式不进行处理时则会使用 void
                "no-void": "off",

                // 有时候保留未使用的东西有用处，所以禁用该规则
                "no-unused-vars": "off",
                "@typescript-eslint/no-unused-vars": "off",

                // 现在还有很多地方需要使用 namespace，未到禁用的时候
                "@typescript-eslint/no-namespace": "off",

                // 现在有很多地方需要使用 ! ，未到禁用的时候
                "@typescript-eslint/no-non-null-assertion": "off",

                // 有用处，并且暂时不会被滥用，不需要禁用
                "@typescript-eslint/no-this-alias": "off",

                // 未完全了解函数的协逆变规则，暂时还需要使用 Function 类型
                "@typescript-eslint/no-unsafe-function-type": "off",

                // 在推荐规则内，但自认为没有必要启用的规则
                "@typescript-eslint/dot-notation": "off",
                "@typescript-eslint/no-inferrable-types": "off",
                "@typescript-eslint/prefer-literal-enum-member": "off",
                "@typescript-eslint/no-unnecessary-type-parameters": "off",
                "@typescript-eslint/no-unnecessary-type-arguments": "off",
                "@typescript-eslint/consistent-type-assertions": "off",
                "@typescript-eslint/consistent-type-definitions": "off",
                "@typescript-eslint/no-extraneous-class": "off",
                "@typescript-eslint/class-literal-property-style": "off",
                "@typescript-eslint/no-unsafe-declaration-merging": "off",
                "@typescript-eslint/unified-signatures": "off",
                "@typescript-eslint/prefer-promise-reject-errors": "off",

                // 在推荐规则内，但需允许 (...args: any[]) 用法
                "@typescript-eslint/no-explicit-any": [
                    "error",
                    { ignoreRestArgs: true },
                ],

                // 在推荐规则内，但需允许传入数值
                "@typescript-eslint/restrict-template-expressions": [
                    "error",
                    {
                        allowAny: true,
                        allowNumber: true,
                    },
                ],

                // 在推荐规则内，但需更宽松
                "@typescript-eslint/no-confusing-void-expression": [
                    "error",
                    {
                        ignoreArrowShorthand: true,
                        ignoreVoidOperator: true,
                    },
                ],

                // 在推荐规则内，但需允许 while (true) 用法
                "@typescript-eslint/no-unnecessary-condition": [
                    "error",
                    {
                        allowConstantLoopConditions: true,
                    },
                ],

                // 在推荐的规则内，但需更宽松
                "@typescript-eslint/no-unused-expressions": [
                    "error",
                    {
                        allowShortCircuit: true,
                        allowTernary: true,
                        allowTaggedTemplates: true,
                        enforceForJSX: true,
                    },
                ],

                // 在推荐的规则内，但需允许空的 interface
                // "@typescript-eslint/no-empty-object-type": [
                //     "error",
                //     {
                //         allowInterfaces: "always",
                //     },
                // ],
                // 某些类型好像必须使用 {} 才能正常运作，暂时关闭
                "@typescript-eslint/no-empty-object-type": "off",

                // 在推荐规则内，但需允许 (this: void) 用法
                // "@typescript-eslint/no-invalid-void-type": [
                //     "error",
                //     { allowAsThisParameter: true },
                // ],
                // 存在误报的情况，暂时关闭
                "@typescript-eslint/no-invalid-void-type": "off",

                // 在推荐规则内，但需更宽松
                // "@typescript-eslint/only-throw-error": [
                //     "error",
                //     {
                //         allowThrowingAny: true,
                //         allowThrowingUnknown: true,
                //     },
                // ],
                // 误报 throw 泛型，暂时关闭
                "@typescript-eslint/only-throw-error": "off",

                // 不在 @typescript-eslint 推荐规则内，自认为需要启用的规则
                "@typescript-eslint/no-unnecessary-qualifier": "error",
                "@typescript-eslint/promise-function-async": "error",
                "@typescript-eslint/require-array-sort-compare": "error",
                "@typescript-eslint/strict-boolean-expressions": [
                    "error",
                    {
                        allowAny: true,
                        allowNullableBoolean: true,
                        allowNullableEnum: false,
                    },
                ],
                "@typescript-eslint/switch-exhaustiveness-check": "error",

                // 该规则可避免 verbatimModuleSyntax 导致意外留下的的副作用导入
                "@typescript-eslint/no-import-type-side-effects": "error",

                // 允许整个文件的 disable 指令
                "@eslint-community/eslint-comments/no-unlimited-disable": "off",
                "@eslint-community/eslint-comments/disable-enable-pair": [
                    "error",
                    { "allowWholeFile": true },
                ],

                // 如果禁用则必须进行注释
                "@eslint-community/eslint-comments/require-description":
                    "error",
            },
        },

        // JSDoc
        ...(jsdocLevel !== "none"
            ? defineConfig(
                  // 推荐配置
                  {
                      files: [`**/*.${javascriptExt}`],
                      ...jsdoc.configs["flat/recommended"],
                  },
                  {
                      files: [`**/*.${typescriptExt}`],
                      ...jsdoc.configs["flat/recommended-typescript"],
                  },
                  {
                      name: "jsdoc/examples-plugin",
                      plugins: {
                          examples: getJsdocProcessorPlugin({
                              checkDefaults: true,
                              checkParams: true,
                              checkProperties: true,
                              parser: tsParser,
                          }),
                      },
                      processor: "examples/examples",
                  },
                  // 根据源码得知数组第一位是规则配置
                  jsdoc.configs.examples[1],
                  jsdoc.configs["default-expressions"][1],

                  //  代码块兼容 TypeScript 避免报错因为没有 Project
                  {
                      files: [
                          "**/*.md/*.js",
                          "**/*.jsdoc-defaults",
                          "**/*.jsdoc-params",
                          "**/*.jsdoc-properties",
                      ],
                      ...tsConfigs.disableTypeChecked,
                  },
                  // 补充一些代码块兼容规则
                  {
                      files: [
                          "**/*.md/*.js",
                          "**/*.jsdoc-defaults",
                          "**/*.jsdoc-params",
                          "**/*.jsdoc-properties",
                      ],
                      rules: {
                          "@typescript-eslint/no-unused-expressions": "off",
                          "@typescript-eslint/no-explicit-any": "off",
                      },
                  },

                  // 偏好配置
                  {
                      files: [`**/*.${scriptExt}`],
                      rules: {
                          "jsdoc/check-template-names": "warn",
                          "jsdoc/check-tag-names": [
                              "warn",
                              {
                                  definedTags: jsdocDefinedTags.concat([
                                      // Xenon Reactive
                                      "val",
                                      "reactive",
                                      "shallow",
                                      "computed",
                                  ]),
                              },
                          ],
                          "jsdoc/no-bad-blocks": [
                              "warn",
                              {
                                  preventAllMultiAsteriskBlocks: true,
                              },
                          ],
                          "jsdoc/no-defaults": "off",
                          "jsdoc/no-blank-block-descriptions": "warn",
                          "jsdoc/no-blank-blocks": "warn",
                          "jsdoc/require-asterisk-prefix": "warn",
                          "jsdoc/require-hyphen-before-param-description": [
                              "warn",
                              "never",
                          ],
                          "jsdoc/require-jsdoc": "off",
                          "jsdoc/tag-lines": [
                              "warn",
                              "any",
                              {
                                  startLines: 1,
                              },
                          ],
                          "jsdoc/sort-tags": [
                              "warn",
                              {
                                  tagSequence: jsdocTagSequence,
                                  alphabetizeExtras: true,
                              },
                          ],
                      },
                  },

                  // 宽松配置
                  ...(jsdocLevel === "loose"
                      ? defineConfig({
                            files: [`**/*.${scriptExt}`],
                            rules: {
                                "jsdoc/check-param-names": [
                                    "warn",
                                    {
                                        disableMissingParamChecks: true,
                                    },
                                ],
                                "jsdoc/require-param": "off",
                                "jsdoc/require-returns": "off",
                                "jsdoc/require-yields": "off",
                            },
                        })
                      : []),
              )
            : []),
    );
}

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
export function configForNodeJS(config = {}) {
    const { includeSecurityRules = true } = config;
    return defineConfig(
        node.configs["flat/recommended"],
        includeSecurityRules ? nodeSecurity.configs.recommended : {},
    );
}

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
export function configForWeb(config = {}) {
    const {} = config;
    return defineConfig({
        files: ["**/*.html"],
        ...html.configs["flat/recommended"],
    });
}

/**
 * The Code copied from @eslint/compat, but with a few modifications to handle it correctly.
 *
 * @param {string} ignoreFilePath The absolute path to the ignore file.
 * @returns {FlatESLintConfig} An object with an `ignores` property that is an array of ignore patterns.
 * @throws {Error} If the ignore file path is not an absolute path.
 */
function includeIgnoreFile(ignoreFilePath) {
    if (!isAbsolute(ignoreFilePath)) {
        throw new Error("The ignore file location must be an absolute path.");
    }

    if (!existsSync(ignoreFilePath)) {
        return {};
    }

    const ignoreFile = readFileSync(ignoreFilePath, "utf8");
    const lines = ignoreFile.split(/\r?\n/u);

    return {
        name: "Imported .gitignore patterns",
        ignores: lines
            .map(line => line.trim())
            .filter(line => line && !line.startsWith("#"))
            // no '/' then no dir
            .map(v => (v.at(-1) === "/" ? [v] : [v, v + "/"]))
            .flat(1)
            .map(convertIgnorePatternToMinimatch),
    };
}
