import { extname, normalize, sep } from "path";

/**
 * - 单入口
 * ```json
 * {
 *   "exports": "./index.js"
 * }
 * ```
 *
 * - 仅条件导出
 * ```json
 * {
 *   "exports": {
 *     "import": "./index-module.js",
 *     "require": "./index-require.cjs"
 *   }
 * }
 * ```
 *
 * - 仅子路径
 * ```json
 * {
 *   "exports": {
 *     ".": "./index-module.js",
 *     "./cjs": "./index-require.cjs"
 *   }
 * }
 * ```
 *
 * - 子路径 & 条件导出
 * ```json
 * {
 *   "exports": {
 *     ".": {
 *       "import": "./index-module.js"
 *     }
 *   }
 * }
 * ```
 *
 * - 子路径支持 `*` 通配符进行映射
 */
export type PackageJsonExports =
    | string
    | PackageJsonExportsWithConditions
    | PackageJsonExportsWithSubPaths;

export type PackageJsonExportsWithConditions = {
    [condition: string]: string | PackageJsonExportsWithConditions;
};

export type PackageJsonExportsWithSubPaths<
    T extends string | PackageJsonExportsWithConditions =
        | string
        | PackageJsonExportsWithConditions,
> = {
    [path: string]: T;
};

/**
 * - 仅子路径
 * ```json
 * {
 *   "imports": {
 *     "#lib": "./index-module.js",
 *     "#lib/sub": "./index-require.cjs"
 *   }
 * }
 * ```
 *
 * - 子路径 & 条件导出
 * ```json
 * {
 *   "imports": {
 *     "#lib": {
 *       "import": "./index-module.js"
 *     }
 *   }
 * }
 * ```
 */
export type PackageJsonImports = PackageJsonExportsWithSubPaths;

export type Chunk = {
    conditions: Set<string> | null;
    entrys: Set<string>;
    dts: boolean;
};

export interface Chunks {
    // dist/[xxx] -> chunk
    chunks: Map<string, Chunk>;
    errMsg?: string;
}

export function genChunks(
    exports: PackageJsonExports | undefined,
    binConditions: string[],
    bin?: PackageJsonBin,
): Chunks {
    const out = {
        chunks: new Map(),
    } satisfies Chunks;

    // 可执行入口点
    if (bin) {
        handleBinPath(bin, binConditions, out);
    }

    const hasBinChunk = out.chunks.has("bin");

    // 单入口
    if (typeof exports === "string") {
        if (hasBinChunk) {
            tryAddEntry(exports, new Set(), out);
        } else {
            out.chunks.set(".", {
                entrys: new Set([normalize(exports)]),
                conditions: new Set(),
                dts: false,
            });
        }
    } else {
        // 处理单条件的情况
        if (exports) {
            if (hasBinChunk || !tryHandleOneCondExports(exports, out)) {
                walkExports(exports, new Set(), out);
            }
        }
    }

    return out;
}

function isSubPath(str: string) {
    return str.startsWith(".");
}

function toRootDir(path: string) {
    const temp = normalize(path);
    // 可能直接传入的是 "" "." "./"
    if (temp.startsWith(".")) {
        return "";
    } else {
        const arr = temp.split(sep);
        // dist/xxx.js
        if (arr.length === 2) {
            return "";
        } else {
            // dist/[xxx] <- got it.
            return temp.split(sep).at(1);
        }
    }
}

function tryAddEntry(
    path: string,
    // null 为不检查条件
    conditions: Set<string> | null,
    out: Chunks,
) {
    const chunks = out.chunks;
    const root = toRootDir(path);

    if (!root) {
        out.errMsg = `路径格式错误：${path}`;
        return false;
    }

    let chunk = chunks.get(root);
    if (!chunk) {
        chunks.set(
            root,
            (chunk = {
                entrys: new Set(),
                conditions: null,
                dts: false,
            }),
        );
    }

    // 处理 .d.ts
    if (path.endsWith(".d.ts")) {
        chunk.dts = true;
        return true;
    }

    // 同样的 root 不同的条件
    if (conditions) {
        if (chunk.conditions) {
            const hasWrong = isDiff(chunk.conditions, conditions);
            if (hasWrong) {
                out.errMsg = `不同条件的入口点不能构建至同一位置\n位置：${root}\n入口点：${path}\n预期条件：${[...chunk.conditions].join(",")}\n入口条件：${[...conditions].join(",")}`;
                return false;
            }
        } else {
            chunk.conditions = new Set(conditions);
        }
    }

    chunk.entrys.add(normalize(path));

    return true;
}

function isDiff(a: Set<string>, b: Set<string>) {
    if (a.size !== b.size) {
        return true;
    }

    for (const e of a) {
        if (!b.has(e)) {
            return true;
        }
    }

    return false;
}

function tryHandleOneCondExports(
    exports: Exclude<PackageJsonExports, string>,
    out: Chunks,
) {
    const expects = new Set(["import", "require", "default"]);
    const entrys = new Set<string>();
    let condition = "";
    let dts = false;

    const stack: Exclude<PackageJsonExports, string>[] = [exports];
    while (stack.length > 0) {
        const elem = stack.pop()!;
        for (const key in elem) {
            // 检查条件
            if (!isSubPath(key) && key !== "types") {
                if (!expects.has(key)) {
                    return false;
                }

                if (condition && condition !== key) {
                    return false;
                }

                condition = key;
            }

            if (key === "types") {
                dts = true;
                continue;
            }

            const elemm = elem[key];
            if (typeof elemm === "string") {
                entrys.add(normalize(elemm));
            } else {
                stack.push(elemm);
            }
        }
    }

    out.chunks.set(".", {
        entrys,
        conditions: condition ? new Set([condition]) : null,
        dts,
    });

    return true;
}

function walkExports(
    exports: Exclude<PackageJsonExports, string>,
    conditions: Set<string>,
    out: Chunks,
) {
    for (const key in exports) {
        const elem = exports[key];

        // 有 types 则表示需要生成 dts
        if (key === "types") {
            if (typeof elem === "string") {
                tryAddEntry(elem, null, out);
            } else {
                out.errMsg = "types 条件的值必须是字符串";
                return;
            }
            continue;
        }

        // 加入条件
        const set = new Set(conditions);
        if (!isSubPath(key)) {
            set.add(key);
        }

        if (typeof elem === "string") {
            // 路径
            const result = tryAddEntry(elem, set, out);
            if (!result) {
                return;
            }
        } else {
            // 对象
            walkExports(elem, set, out);
        }

        // 错误提前终止
        if (out.errMsg) {
            return;
        }
    }
}

/**
 * package.json bin 字段类型
 */
export type PackageJsonBin = string | PackageJsonBinCommands;

/**
 * package.json bin 字段多命令类型
 */
export type PackageJsonBinCommands = { [key: string]: string };

/**
 * 处理 bin 字段
 */
export function handleBinPath(
    bin: PackageJsonBin,
    conditions: string[],
    out: Chunks,
) {
    const hasErr = (typeof bin === "string" ? [bin] : Object.values(bin))
        .map(v => normalize(v))
        .filter(v => {
            const arr = v.split(sep);
            return (
                arr.at(0) === "dist" &&
                arr.at(1) === "bin" &&
                extname(arr.at(-1) ?? "") === ".js"
            );
        })
        .some(v => !tryAddEntry(v, new Set(conditions), out));
    return hasErr;
}
