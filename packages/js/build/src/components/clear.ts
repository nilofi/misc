import { xfs } from "@xenon.js/misc";
import { resolve } from "path";
import { rimraf } from "rimraf";
import { type Plugin } from "rollup";

export interface ClearOptions {
    paths?: string[];
    atClose?: boolean;
    /**
     * 是否只有目录为空时才删除，默认 `false`
     */
    clearIfEmpty?: boolean;
}

/**
 * 删除指定文件或目录
 */
export function clear(opts: ClearOptions): Plugin {
    const paths = opts.paths || [];
    const clearIfEmpty = opts.clearIfEmpty ?? false;

    const clear = () => {
        const workspace = process.cwd();
        for (let index = 0; index < paths.length; index++) {
            const path = paths[index];
            const abPath = resolve(workspace, path);
            if (xfs.has(abPath)) {
                if (clearIfEmpty) {
                    if (rmdirIfEmpty(abPath)) {
                        console.log("cleared: ", abPath);
                    }
                } else {
                    rimraf.sync(abPath);
                    console.log("cleared: ", abPath);
                }
            }
        }
    };

    if (!opts.atClose) {
        clear();
    }

    return {
        name: "clear",
        closeBundle() {
            if (opts.atClose) {
                clear();
            }
        },
    };
}

function rmdirIfEmpty(path: string) {
    try {
        const files = xfs.walkSync(path);
        if (files.length === 0) {
            xfs.removeSync(path);
            return true;
        }
        return false;
    } catch {
        return false;
    }
}
