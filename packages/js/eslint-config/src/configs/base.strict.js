// @ts-nocheck
import common from "./acommon.js";
import baseLoose from "./base.loose.js";

/**
 * 基础严格配置
 *
 * @type {import('eslint').Linter.FlatConfig}
 */
export default {
    ...common,
    plugins: {
        ...baseLoose.plugins,
    },
    rules: {
        ...baseLoose.rules,
    },
};
