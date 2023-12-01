import { writeFileSync } from "fs";
import { dirname, join } from "path";

/**
 * 解决某些环境（比如 Cocos Creator）下因为 tslib 未设置 type: module 导致的导入问题
 *
 * @returns {import("rollup").Plugin}
 */
export function tslibWraper() {
    let tslibPath = "";
    return {
        name: "tslib-wraper",
        writeBundle(options, bundle) {
            for (const key in bundle) {
                if (key.includes("tslib")) {
                    tslibPath = join(options.dir, dirname(key), "package.json");
                    break;
                }
            }
        },
        closeBundle() {
            if (tslibPath) {
                writeFileSync(
                    tslibPath,
                    JSON.stringify({
                        "name": "tslib",
                        "main": "./tslib.es6.js",
                        "type": "module",
                    }),
                );
                console.log("tslib-wraper:", tslibPath);
            }
        },
    };
}
