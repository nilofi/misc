// @ts-nocheck
import typescript from "@typescript-eslint/eslint-plugin";
import common from "./acommon.js";

/**
 * 样式宽松配置
 *
 * @type {import('eslint').Linter.FlatConfig}
 */
export default {
    ...common,
    plugins: {
        typescript,
    },
    rules: {},
};
