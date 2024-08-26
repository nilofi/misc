import { lstat, lstatSync, readdir, readdirSync, stat, statSync } from "fs";
import { join, resolve, sep } from "path";
import { Readable } from "stream";
import type { FileItem } from "./common.js";

export interface WalkerOptions {
    /**
     * 是否深度优先遍历，默认 `false`
     */
    reverse: boolean;

    /**
     * {@link readdir} 数组排序方法
     */
    sorter?: (a: unknown, b: unknown) => number;

    /**
     * {@link readdir} 数组过滤方法
     */
    filter?: (value: unknown, index: number, array: unknown[]) => boolean;

    /**
     * 遍历深度，`-1` 表示无限制，`0` 表示仅迭代根目录，`1` 表示迭代根目录和 1 级子目录，以此类推，默认 `-1`
     */
    depth: number;

    /**
     * 是否不解析符号链接，默认 `false`
     */
    preserveSymlinks: boolean;
}

export class Walker extends Readable {
    root: string;
    started: boolean;
    paths: string[];
    options: WalkerOptions;
    rootDepth: number | undefined;

    constructor(dir: string, options?: Partial<WalkerOptions>) {
        super({
            objectMode: true,
        });

        this.root = resolve(dir);
        this.paths = [this.root];
        this.options = {
            reverse: options?.reverse ?? false,
            sorter: options?.sorter,
            filter: options?.filter,
            depth: options?.depth ?? -1,
            preserveSymlinks: options?.preserveSymlinks ?? false,
        };
        this.started = false;

        if (this.options.depth > -1) {
            this.rootDepth = this.root.split(sep).length + 1;
        }
    }

    override _read() {
        this._walk();
    }

    protected _walk() {
        if (this.paths.length === 0) {
            this.push(null);
            return;
        }

        const { reverse, sorter, filter, depth, preserveSymlinks } =
            this.options;

        const _stat = preserveSymlinks ? lstat : stat;

        const isRoot = !this.started;
        this.started = true;

        const path = reverse ? this.paths.pop()! : this.paths.shift()!;

        _stat(path, (err, stats) => {
            const item = { path, stats };

            if (err) {
                this.destroy(err);
                return;
            }

            if (
                !stats.isDirectory() ||
                (this.rootDepth != null &&
                    path.split(sep).length - this.rootDepth >= depth)
            ) {
                this.push(isRoot ? null : item);
                return;
            }

            readdir(path, (err, paths) => {
                if (err) {
                    if (!isRoot) {
                        this.push(item);
                    }
                    this.destroy(err);
                    return;
                }

                paths = paths.map(part => join(path, part));

                if (filter) {
                    paths = paths.filter(filter);
                }

                if (sorter) {
                    paths.sort(sorter);
                }

                // 文件太多时使用 apply 会堆栈溢出，应先判断文件数量，暂定 1024
                if (paths.length >= 1024) {
                    for (const path of paths) {
                        this.paths.push(path);
                    }
                } else {
                    this.paths.push(...paths);
                }

                if (!isRoot) {
                    this.push(item);
                } else {
                    this._walk();
                }
            });
        });
    }
}

export interface Walker extends Readable, AsyncIterable<FileItem> {
    on(
        event:
            | "close"
            | "data"
            | "end"
            | "error"
            | "pause"
            | "readable"
            | "resume",
        listener: Function,
    ): this;
    on(event: "close", listener: () => void): this;
    on(event: "data", listener: (item: FileItem) => void): this;
    on(event: "end", listener: () => void): this;
    on(event: "readable", listener: () => void): this;
    on(event: "error", listener: (err: Error) => void): this;
    read(): FileItem;
    [Symbol.asyncIterator](): AsyncIterableIterator<FileItem>;
}

function _walkSync(
    dir: string,
    options?: Partial<Omit<WalkerOptions, "reverse"> & { rootDepth: number }>,
    ls?: FileItem[],
): FileItem[] {
    const opts = {
        sorter: options?.sorter,
        filter: options?.filter,
        depth: options?.depth ?? -1,
        preserveSymlinks: options?.preserveSymlinks ?? false,
        rootDepth: options?.rootDepth,
    };

    const { sorter, filter, depth, preserveSymlinks } = opts;

    if (!ls) {
        ls = [];
        dir = resolve(dir);
        if (depth > -1) {
            opts.rootDepth = dir.split(sep).length + 1;
        }
    }

    if (opts.rootDepth != null) {
        const curDepth = dir.split(sep).length - opts.rootDepth;
        if (curDepth >= depth) {
            return ls;
        }
    }

    let paths = readdirSync(dir).map(p => join(dir, p));

    if (filter) {
        paths = paths.filter(filter);
    }

    if (sorter) {
        paths.sort(sorter);
    }

    for (const path of paths) {
        const stats = preserveSymlinks ? lstatSync(path) : statSync(path);
        const item = { path, stats };
        const isDir = stats.isDirectory();
        ls.push(item);
        if (isDir) {
            ls = _walkSync(path, opts, ls);
        }
    }

    return ls;
}

export function walk(dir: string, options?: Partial<WalkerOptions>) {
    return new Walker(dir, options);
}

export function walkSync(dir: string, options?: Partial<WalkerOptions>) {
    return _walkSync(dir, { ...options });
}
