import { readFileSync } from "fs";
import { join } from "path";
import { cwd } from "process";

/**
 * 获取指定包的排除正则表达式
 *
 * @param {string} name
 */
export function getExternalRegexp(name) {
    const regexPattern = `^${name}$|^${name}\/.+$`;
    return new RegExp(regexPattern);
}

/**
 * 获取不捆绑的依赖包列表
 *
 * 策略：
 * - 私有包：不捆绑任何包
 * - 公开包：只捆绑私有包，不捆绑公开包
 * - 任何情况下都不捆绑在 `peerDependencies` 内声明的包
 *
 * @param {Record<string,unknown>} packageJson
 * @param {(string | RegExp)[]} [base]
 * @returns {import("rollup").RollupOptions["external"]}
 */
export function getExternal(packageJson, base = []) {
    /**
     * 返回指定包是否私有
     *
     * @param {string} name
     * @returns {boolean}
     */
    function isPrivate(name) {
        const path = join(cwd(), "node_modules", name, "package.json");
        const json = JSON.parse(readFileSync(path, { encoding: "utf-8" }));
        return json.private;
    }

    if (packageJson.private) {
        base.push(/node_modules/);
    } else {
        const keys = [
            // prettier-keep
            "dependencies",
            "peerDependencies",
            "optionalDependencies",
        ];

        keys.forEach(key => {
            const deps = packageJson[key];
            if (deps) {
                Object.keys(deps)
                    .filter(v => !isPrivate(v) || key === "peerDependencies")
                    .forEach(v => {
                        base.push(getExternalRegexp(v));
                    });
            }
        });
    }

    return base;
}
