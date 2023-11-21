import eslintComments from "@eslint-community/eslint-plugin-eslint-comments";
import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import common from "./acommon.js";

/**
 * 基础宽松配置
 *
 * @type {import('eslint').Linter.FlatConfig}
 */
export default {
    ...common,
    plugins: {
        "@typescript-eslint": typescript,
        eslintComments,
    },
    rules: {
        // offical
        ...js.configs.recommended.rules,
        "array-callback-return": ["error", { checkForEach: false }],
        "no-constant-binary-expression": "error",
        "no-constructor-return": "error",
        "no-promise-executor-return": "error",
        "no-new-native-nonconstructor": "error",
        "no-self-compare": "error",
        "no-template-curly-in-string": "error",
        "valid-typeof": "error",
        "require-atomic-updates": "error",
        "default-case-last": "error",
        "eqeqeq": ["error", "smart"],
        "grouped-accessor-pairs": ["error", "getBeforeSet"],
        "no-array-constructor": "error",
        "no-caller": "error",
        "no-inline-comments": ["error", { ignorePattern: "prettier-keep" }],
        "no-iterator": "error",
        "no-label-var": "error",
        "no-new": "error",
        "no-new-wrappers": "error",
        "no-return-assign": "error",
        "no-useless-return": "error",
        "no-var": "error",
        "no-void": "off",
        "prefer-object-has-own": "error",
        "prefer-object-spread": "error",
        "prefer-rest-params": "error",
        "prefer-regex-literals": "error",
        "prefer-template": "error",
        "require-unicode-regexp": "error",
        "require-yield": "error",
        "spaced-comment": ["error", "always", { line: { markers: ["/"] } }],
        "no-trailing-spaces": "error",

        // typescript
        ...typescript.configs["eslint-recommended"].overrides[0].rules,
        ...typescript.configs.recommended.rules,
        ...typescript.configs["recommended-requiring-type-checking"].rules,
        "@typescript-eslint/array-type": "error",
        "@typescript-eslint/ban-ts-comment": ["error", { "ts-expect-error": "allow-with-description", "ts-ignore": true, "ts-nocheck": true, "ts-check": false }],
        "@typescript-eslint/ban-types": ["error", { types: { "{}": false, "Function": false }, extendDefaults: true }],
        "@typescript-eslint/no-confusing-non-null-assertion": "error",
        "@typescript-eslint/no-duplicate-enum-values": "error",
        "@typescript-eslint/no-dynamic-delete": "error",
        "@typescript-eslint/no-explicit-any": ["error", { ignoreRestArgs: true }],
        "@typescript-eslint/no-import-type-side-effects": "error",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-this-alias": "off",
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
        "@typescript-eslint/no-unnecessary-condition": "error",
        "@typescript-eslint/no-unnecessary-qualifier": "error",
        "@typescript-eslint/no-unsafe-enum-comparison": "error",
        "@typescript-eslint/non-nullable-type-assertion-style": "error",
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/prefer-includes": "error",
        "@typescript-eslint/prefer-optional-chain": "error",
        "@typescript-eslint/prefer-reduce-type-parameter": "error",
        "@typescript-eslint/prefer-return-this-type": "error",
        "@typescript-eslint/prefer-string-starts-ends-with": "error",
        "@typescript-eslint/prefer-ts-expect-error": "error",
        "@typescript-eslint/require-array-sort-compare": "error",
        "@typescript-eslint/restrict-plus-operands": "error",
        "@typescript-eslint/restrict-template-expressions": "error",
        "@typescript-eslint/strict-boolean-expressions": ["error", { allowAny: true, allowNullableBoolean: true, allowNullableEnum: false }],
        "@typescript-eslint/switch-exhaustiveness-check": "error",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "off",
        // typescript override
        "no-async-promise-executor": "off",
        "no-dupe-class-members": "off",
        "@typescript-eslint/no-dupe-class-members": "error",
        "no-invalid-this": "off",
        "@typescript-eslint/no-invalid-this": ["error", { "capIsConstructor": false }],
        "no-redeclare": "off",
        "@typescript-eslint/no-redeclare": "error",
        "@typescript-eslint/require-await": "error",
        "@typescript-eslint/no-implied-eval": "error",
        "@typescript-eslint/padding-line-between-statements": [
            // prettier-keep
            "error",
            { blankLine: "always", prev: ["function", "case", "default"], next: "*" },
        ],

        // eslint-comments
        "eslintComments/disable-enable-pair": "error",
        "eslintComments/no-aggregating-enable": "error",
        "eslintComments/no-duplicate-disable": "error",
        "eslintComments/no-unlimited-disable": "error",
        "eslintComments/no-unused-disable": "error",
        "eslintComments/no-unused-enable": "error",
        "eslintComments/require-description": "error",

        // override typescript recommended
        "prefer-const": "off",
    },
};
