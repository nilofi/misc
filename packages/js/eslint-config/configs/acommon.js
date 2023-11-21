/**
 * 基础配置
 *
 * @type {import('eslint').Linter.FlatConfig}
 */
export default {
    languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    linterOptions: {
        reportUnusedDisableDirectives: true,
    },
};
