/**
 * package.json exports 字段的输入类型定义
 */
export interface PackageJsonExportsInput {
    [path: string]: {
        [targetOrType: string]:
            | {
                  [type: string]: string;
              }
            | string;
    };
}

/**
 * package.json exports 字段的输出类型定义
 */
export interface PackageJsonExportsOutput {
    [path: string]: {
        [target: string]: {
            [type: string]: string;
        };
    };
}

/**
 * 标准化 exports 对象
 *
 * 规定只能出现两种情况：
 * 无条件导出：exports: { ".": { types: "./types/index.d.ts", import: "./index.js" } }
 * 有条件导出：exports: { ".": { nodejs: { types: "./types/index.d.ts", import: "./index.js" } } }
 *
 * 无条件导出会被处理为 "default" 条件导出的对象
 */
export function normalize(
    exports: PackageJsonExportsInput,
): PackageJsonExportsOutput {
    const exportsKeys = Object.keys(exports);

    const result: PackageJsonExportsOutput = {};

    exportsKeys.forEach(path => {
        const obj = JSON.parse(JSON.stringify(exports[path]));
        const key = Object.keys(obj).pop();

        if (key == null) {
            result[path] = {};
        } else {
            const hasTarget = typeof obj[key] === "object";
            if (hasTarget) {
                result[path] = obj;
            } else {
                result[path] = {
                    default: obj as { [type: string]: string },
                };
            }
        }
    });

    return result;
}
