import { existsSync, renameSync } from "fs";

/**
 * 为了解决 bundle-stats 不支持设置输出报告名称的问题，此插件可以重命名其输出的报告文件
 *
 * @param {{source: string,dist: string}} opts
 * @returns {import("rollup").Plugin}
 */
export function renameBundleStatsReport(opts) {
    return {
        name: "rename-bundle-stats-report",
        closeBundle() {
            if (existsSync(opts.source)) {
                renameSync(opts.source, opts.dist);
                console.log("rename bundle-stats report:", opts.dist);
            }
        },
    };
}
