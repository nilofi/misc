import type { Plugin } from "rollup";

export interface ConstantsOptions {
    moduleName: string;
    constants: Record<string, unknown>;
}

/**
 * 构建常量模块插件
 */
export function constants(opts: ConstantsOptions): Plugin {
    const { moduleName, constants } = opts;
    const resolvedModuleName = "\0" + moduleName;

    let content = "";

    for (const key in constants) {
        content += `export const ${key} = ${JSON.stringify(constants[key])};\n`;
    }

    return {
        name: "constants",
        resolveId(source) {
            if (source === moduleName) {
                return resolvedModuleName;
            }
            return null;
        },
        load(id) {
            if (id === resolvedModuleName) {
                return content;
            }
            return null;
        },
    };
}
