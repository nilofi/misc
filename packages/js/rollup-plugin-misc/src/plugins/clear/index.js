import { existsSync } from "fs";
import { resolve } from "path";
import { rimraf } from "rimraf";

/**
 * @typedef ClearOptions
 *
 * @property {string[]} targets
 */

/**
 * 删除指定文件或目录
 *
 * @param {ClearOptions} opts
 * @returns {import("rollup").Plugin}
 */
export function clear(opts) {
    const targets = opts.targets || [];
    return {
        name: "clear",
        buildStart(options) {
            const workspace = process.cwd();
            for (let index = 0; index < targets.length; index++) {
                const e = targets[index];
                const target = resolve(workspace, e);
                if (existsSync(target)) {
                    rimraf.sync(target);
                    console.log("cleared: ", target);
                }
            }
        },
    };
}
