// @ts-nocheck
import typescriptParser from "@typescript-eslint/parser";

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
