// @ts-nocheck
import common from "./acommon.js";
import styleLoose from "./style.loose.js";

/**
 * 样式严格配置
 *
 * @type {import('eslint').Linter.FlatConfig}
 */
export default {
    ...common,
    plugins: {
        ...styleLoose.plugins,
    },
    rules: {
        ...styleLoose.rules,
    },
};
