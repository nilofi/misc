import { existsSync, readdirSync, rmdirSync } from "fs";
import { resolve } from "path";
import { rimraf } from "rimraf";

/**
 * @typedef ClearOptions
 *
 * @property {string[]} targets
 * @property {string[]} [targetsIfEmpty]
 */

/**
 * 删除指定文件或目录
 *
 * @param {ClearOptions} opts
 * @returns {import("rollup").Plugin}
 */
export function clear(opts) {
    const targets = opts.targets || [];
    const targetsIfEmpty = opts.targetsIfEmpty || [];
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
            for (let index = 0; index < targetsIfEmpty.length; index++) {
                const e = targetsIfEmpty[index];
                const target = resolve(workspace, e);
                rmdirIfEmpty(target);
            }
        },
    };
}

/**
 * 删除指定文件或目录
 *
 * @param {ClearOptions} opts
 * @returns {import("rollup").Plugin}
 */
export function clearAtEnd(opts) {
    const targets = opts.targets || [];
    const targetsIfEmpty = opts.targetsIfEmpty || [];
    return {
        name: "clearAtEnd",
        closeBundle(options) {
            const workspace = process.cwd();
            for (let index = 0; index < targets.length; index++) {
                const e = targets[index];
                const target = resolve(workspace, e);
                if (existsSync(target)) {
                    rimraf.sync(target);
                    console.log("cleared: ", target);
                }
            }
            for (let index = 0; index < targetsIfEmpty.length; index++) {
                const e = targetsIfEmpty[index];
                const target = resolve(workspace, e);
                rmdirIfEmpty(target);
            }
        },
    };
}

/**
 * @param {string} path
 */
export function rmdirIfEmpty(path) {
    try {
        const files = readdirSync(path);
        if (files.length === 0) {
            rmdirSync(path);
        }
    } catch {}
}
