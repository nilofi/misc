// Reference from fs-extra v11.2.0

import {
    close as _close,
    copyFileSync as _copyFileSync,
    futimes as _futimes,
    statSync as _statSync,
    chmodSync,
    closeSync,
    existsSync,
    futimesSync,
    lstatSync,
    mkdirSync,
    opendirSync,
    openSync,
    readlinkSync,
    statSync,
    symlinkSync,
    unlinkSync,
    type BigIntStats,
    type Stats,
} from "fs";
import {
    copyFile as _copyFile,
    chmod,
    lstat,
    mkdir,
    open,
    opendir,
    readlink,
    stat,
    symlink,
    unlink,
    type FileHandle,
} from "fs/promises";
import { basename, dirname, join, parse, resolve } from "path";
import { cwd, emitWarning } from "process";
import { isChild } from "../path/path.js";
import { createDirectory, createDirectorySync } from "./directory.js";
import { exists, isIdentical } from "./general.js";

export interface CopyOptions {
    /**
     * 是否覆盖原文件，默认 `true`
     */
    overwrite: boolean;

    /**
     * 将设置上次修改和访问时间为原始源文件的上次修改和访问时间，默认 `false`
     */
    preserveTimestamps: boolean;

    /**
     * 取消对符号链接的引用，默认 `false`
     */
    dereference: boolean;

    /**
     * 用于过滤需复制的文件/目录，返回 `true` 则复制，`false` 则忽略，支持异步函数
     */
    filter?: (src: string, dest: string) => boolean | PromiseLike<boolean>;

    /**
     * 当文件存在时是否抛出错误，仅 {@link overwrite} 为 `false` 时有效，默认 `false`
     */
    errorOnExist: boolean;
}

export type CopySyncOptions = Omit<CopyOptions, "filter"> & {
    filter?: (src: string, dest: string) => boolean;
};

export async function copy(
    src: string,
    dest: string,
    options?: Partial<CopyOptions>,
) {
    const opts: CopyOptions = {
        overwrite: options?.overwrite ?? true,
        preserveTimestamps: options?.preserveTimestamps ?? false,
        dereference: options?.dereference ?? false,
        filter: options?.filter,
        errorOnExist: options?.errorOnExist ?? false,
    };

    // Warn about using preserveTimestamps on 32-bit node
    if (opts.preserveTimestamps && process.arch === "ia32") {
        emitWarning(
            "Using the preserveTimestamps option in 32-bit node is not recommended;\n\n" +
                "\tsee https://github.com/jprichardson/node-fs-extra/issues/269",
            "Warning",
            "fs-extra-WARN0001" as never,
        );
    }

    const { srcStat, destStat } = await checkPaths(src, dest, "copy", opts);

    await checkParentPaths(src, srcStat, dest, "copy");

    const include = await runFilter(src, dest, opts);

    if (!include) return;

    // check if the parent of dest exists, and create it if it doesn't exist
    const destParent = dirname(dest);
    const dirExists = await exists(destParent);
    if (!dirExists) {
        await createDirectory(destParent);
    }

    await getStatsAndPerformCopy(destStat, src, dest, opts);
}

async function checkParentPaths(
    src: string,
    srcStat: BigIntStats,
    dest: string,
    funcName: string,
) {
    const srcParent = resolve(dirname(src));
    const destParent = resolve(dirname(dest));
    if (destParent === srcParent || destParent === parse(destParent).root)
        return;

    let destStat;
    try {
        destStat = await stat(destParent, { bigint: true });
    } catch (err) {
        if (err instanceof Error) {
            if ((<NodeJS.ErrnoException>err).code === "ENOENT") return;
        }
        throw err;
    }

    if (isIdentical(srcStat, destStat)) {
        throw new Error(errMsg(src, dest, funcName));
    }

    return checkParentPaths(src, srcStat, destParent, funcName);
}

async function close(fd: FileHandle) {
    return new Promise<void>((resolve, reject) => {
        _close(fd.fd, err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

async function futimes(fd: FileHandle, atime: Date, mtime: Date) {
    return new Promise<void>((resolve, reject) => {
        _futimes(fd.fd, atime, mtime, err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

async function utimesMillis(path: string, atime: Date, mtime: Date) {
    // if (!HAS_MILLIS_RES) return fs.utimes(path, atime, mtime, callback)
    const fd = await open(path, "r+");

    let closeErr = null;

    try {
        await futimes(fd, atime, mtime);
    } finally {
        try {
            await close(fd);
        } catch (e) {
            closeErr = e;
        }
    }

    if (closeErr) {
        throw closeErr;
    }
}

async function getStats(src: string, dest: string, opts: CopyOptions) {
    const statFunc = opts.dereference
        ? async (file: string) => stat(file, { bigint: true })
        : async (file: string) => lstat(file, { bigint: true });

    return Promise.all([
        statFunc(src),
        statFunc(dest).catch((err: unknown) => {
            if (err instanceof Error) {
                if ((<NodeJS.ErrnoException>err).code === "ENOENT") return null;
            }
            throw err;
        }),
    ]).then(([srcStat, destStat]) => ({ srcStat, destStat }));
}

function errMsg(src: string, dest: string, funcName: string) {
    return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`;
}

async function checkPaths(
    src: string,
    dest: string,
    funcName: string,
    opts: CopyOptions,
) {
    const { srcStat, destStat } = await getStats(src, dest, opts);
    if (destStat) {
        if (isIdentical(srcStat, destStat)) {
            const srcBaseName = basename(src);
            const destBaseName = basename(dest);
            if (
                funcName === "move" &&
                srcBaseName !== destBaseName &&
                srcBaseName.toLowerCase() === destBaseName.toLowerCase()
            ) {
                return { srcStat, destStat, isChangingCase: true };
            }
            throw new Error("Source and destination must not be the same.");
        }
        if (srcStat.isDirectory() && !destStat.isDirectory()) {
            throw new Error(
                `Cannot overwrite non-directory '${dest}' with directory '${src}'.`,
            );
        }
        if (!srcStat.isDirectory() && destStat.isDirectory()) {
            throw new Error(
                `Cannot overwrite directory '${dest}' with non-directory '${src}'.`,
            );
        }
    }

    if (srcStat.isDirectory() && isChild(src, dest)) {
        throw new Error(errMsg(src, dest, funcName));
    }

    return { srcStat, destStat };
}

function runFilter(src: string, dest: string, opts: CopyOptions) {
    if (!opts.filter) return true;
    return opts.filter(src, dest);
}

async function getStatsAndPerformCopy(
    destStat: BigIntStats | null,
    src: string,
    dest: string,
    opts: CopyOptions,
) {
    const statFn = opts.dereference ? stat : lstat;
    const srcStat = await statFn(src);

    if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts);

    if (
        srcStat.isFile() ||
        srcStat.isCharacterDevice() ||
        srcStat.isBlockDevice()
    )
        return onFile(srcStat, destStat, src, dest, opts);

    if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts);
    if (srcStat.isSocket())
        throw new Error(`Cannot copy a socket file: ${src}`);
    if (srcStat.isFIFO()) throw new Error(`Cannot copy a FIFO pipe: ${src}`);
    throw new Error(`Unknown file: ${src}`);
}

async function onFile(
    srcStat: Stats,
    destStat: BigIntStats | null,
    src: string,
    dest: string,
    opts: CopyOptions,
) {
    if (!destStat) return copyFile(srcStat, src, dest, opts);

    if (opts.overwrite) {
        await unlink(dest);
        return copyFile(srcStat, src, dest, opts);
    }
    if (opts.errorOnExist) {
        throw new Error(`'${dest}' already exists`);
    }
}

async function copyFile(
    srcStat: Stats,
    src: string,
    dest: string,
    opts: CopyOptions,
) {
    await _copyFile(src, dest);
    if (opts.preserveTimestamps) {
        // Make sure the file is writable before setting the timestamp
        // otherwise open fails with EPERM when invoked with 'r+'
        // (through utimes call)
        if (fileIsNotWritable(srcStat.mode)) {
            await makeFileWritable(dest, srcStat.mode);
        }

        // Set timestamps and mode correspondingly

        // Note that The initial srcStat.atime cannot be trusted
        // because it is modified by the read(2) system call
        // (See https://nodejs.org/api/fs.html#fs_stat_time_values)
        const updatedSrcStat = await stat(src);
        await utimesMillis(dest, updatedSrcStat.atime, updatedSrcStat.mtime);
    }

    return chmod(dest, srcStat.mode);
}

function fileIsNotWritable(srcMode: number) {
    return (srcMode & 0o200) === 0;
}

async function makeFileWritable(dest: string, srcMode: number) {
    return chmod(dest, srcMode | 0o200);
}

async function onDir(
    srcStat: Stats,
    destStat: BigIntStats | null,
    src: string,
    dest: string,
    opts: CopyOptions,
) {
    // the dest directory might not exist, create it
    if (!destStat) {
        await mkdir(dest);
    }

    const promises = [];

    // loop through the files in the current directory to copy everything
    for await (const item of await opendir(src)) {
        const srcItem = join(src, item.name);
        const destItem = join(dest, item.name);

        const result = runFilter(srcItem, destItem, opts);

        promises.push(
            (typeof result === "boolean"
                ? Promise.resolve(result)
                : result
            ).then(async include => {
                if (include) {
                    // only copy the item if it matches the filter function
                    return checkPaths(srcItem, destItem, "copy", opts).then(
                        async ({ destStat }) => {
                            // If the item is a copyable file, `getStatsAndPerformCopy` will copy it
                            // If the item is a directory, `getStatsAndPerformCopy` will call `onDir` recursively
                            return getStatsAndPerformCopy(
                                destStat,
                                srcItem,
                                destItem,
                                opts,
                            );
                        },
                    );
                }
            }),
        );
    }

    await Promise.all(promises);

    if (!destStat) {
        await chmod(dest, srcStat.mode);
    }
}

async function onLink(
    destStat: BigIntStats | null,
    src: string,
    dest: string,
    opts: CopyOptions,
) {
    let resolvedSrc = await readlink(src);
    if (opts.dereference) {
        resolvedSrc = resolve(cwd(), resolvedSrc);
    }
    if (!destStat) {
        return symlink(resolvedSrc, dest);
    }

    let resolvedDest = null;
    try {
        resolvedDest = await readlink(dest);
    } catch (e) {
        // dest exists and is a regular file or directory,
        // Windows may throw UNKNOWN error. If dest already exists,
        // fs throws error anyway, so no need to guard against it here.
        if (e instanceof Error) {
            if (
                (<NodeJS.ErrnoException>e).code === "EINVAL" ||
                (<NodeJS.ErrnoException>e).code === "UNKNOWN"
            )
                return symlink(resolvedSrc, dest);
        }
        throw e;
    }
    if (opts.dereference) {
        resolvedDest = resolve(cwd(), resolvedDest);
    }
    if (isChild(resolvedSrc, resolvedDest)) {
        throw new Error(
            `Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`,
        );
    }

    // do not copy if src is a subdir of dest since unlinking
    // dest in this case would result in removing src contents
    // and therefore a broken symlink would be created.
    if (isChild(resolvedDest, resolvedSrc)) {
        throw new Error(
            `Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`,
        );
    }

    // copy the link
    await unlink(dest);
    return symlink(resolvedSrc, dest);
}

export function copySync(
    src: string,
    dest: string,
    options?: Partial<CopySyncOptions>,
) {
    const opts: CopySyncOptions = {
        overwrite: options?.overwrite ?? true,
        preserveTimestamps: options?.preserveTimestamps ?? false,
        dereference: options?.dereference ?? false,
        filter: options?.filter,
        errorOnExist: options?.errorOnExist ?? false,
    };

    // Warn about using preserveTimestamps on 32-bit node
    if (opts.preserveTimestamps && process.arch === "ia32") {
        emitWarning(
            "Using the preserveTimestamps option in 32-bit node is not recommended;\n\n" +
                "\tsee https://github.com/jprichardson/node-fs-extra/issues/269",
            "Warning",
            "fs-extra-WARN0002" as never,
        );
    }

    const { srcStat, destStat } = checkPathsSync(src, dest, "copy", opts);
    checkParentPathsSync(src, srcStat, dest, "copy");
    if (opts.filter && !opts.filter(src, dest)) return;
    const destParent = dirname(dest);
    if (!existsSync(destParent)) createDirectorySync(destParent);
    getStatsAndPerformCopySync(destStat, src, dest, opts);
}

function checkParentPathsSync(
    src: string,
    srcStat: BigIntStats,
    dest: string,
    funcName: string,
) {
    const srcParent = resolve(dirname(src));
    const destParent = resolve(dirname(dest));
    if (destParent === srcParent || destParent === parse(destParent).root)
        return;
    let destStat;
    try {
        destStat = statSync(destParent, { bigint: true });
    } catch (err) {
        if (err instanceof Error) {
            if ((<NodeJS.ErrnoException>err).code === "ENOENT") return;
        }
        throw err;
    }
    if (isIdentical(srcStat, destStat)) {
        throw new Error(errMsg(src, dest, funcName));
    }
    checkParentPathsSync(src, srcStat, destParent, funcName);
}

function getStatsAndPerformCopySync(
    destStat: BigIntStats | null,
    src: string,
    dest: string,
    opts: CopySyncOptions,
) {
    const statSync = opts.dereference ? _statSync : lstatSync;
    const srcStat = statSync(src);

    if (srcStat.isDirectory()) {
        onDirSync(srcStat, destStat, src, dest, opts);
    } else if (
        srcStat.isFile() ||
        srcStat.isCharacterDevice() ||
        srcStat.isBlockDevice()
    ) {
        onFileSync(srcStat, destStat, src, dest, opts);
    } else if (srcStat.isSymbolicLink()) {
        onLinkSync(destStat, src, dest, opts);
    } else if (srcStat.isSocket())
        throw new Error(`Cannot copy a socket file: ${src}`);
    else if (srcStat.isFIFO())
        throw new Error(`Cannot copy a FIFO pipe: ${src}`);
    else {
        throw new Error(`Unknown file: ${src}`);
    }
}

function onFileSync(
    srcStat: Stats,
    destStat: BigIntStats | null,
    src: string,
    dest: string,
    opts: CopySyncOptions,
) {
    if (!destStat) {
        copyFileSync(srcStat, src, dest, opts);
        return;
    }
    mayCopyFile(srcStat, src, dest, opts);
}

function mayCopyFile(
    srcStat: Stats,
    src: string,
    dest: string,
    opts: CopySyncOptions,
) {
    if (opts.overwrite) {
        unlinkSync(dest);
        copyFileSync(srcStat, src, dest, opts);
    } else if (opts.errorOnExist) {
        throw new Error(`'${dest}' already exists`);
    }
}

function copyFileSync(
    srcStat: Stats,
    src: string,
    dest: string,
    opts: CopySyncOptions,
) {
    _copyFileSync(src, dest);
    if (opts.preserveTimestamps) handleTimestamps(srcStat.mode, src, dest);
    setDestModeSync(dest, srcStat.mode);
}

function handleTimestamps(srcMode: number, src: string, dest: string) {
    // Make sure the file is writable before setting the timestamp
    // otherwise open fails with EPERM when invoked with 'r+'
    // (through utimes call)
    if (fileIsNotWritable(srcMode)) makeFileWritableSync(dest, srcMode);
    setDestTimestamps(src, dest);
}

function makeFileWritableSync(dest: string, srcMode: number) {
    setDestModeSync(dest, srcMode | 0o200);
}

function setDestModeSync(dest: string, srcMode: number) {
    chmodSync(dest, srcMode);
}

function utimesMillisSync(path: string, atime: Date, mtime: Date) {
    const fd = openSync(path, "r+");
    futimesSync(fd, atime, mtime);
    closeSync(fd);
}

function setDestTimestamps(src: string, dest: string) {
    // The initial srcStat.atime cannot be trusted
    // because it is modified by the read(2) system call
    // (See https://nodejs.org/api/fs.html#fs_stat_time_values)
    const updatedSrcStat = _statSync(src);
    utimesMillisSync(dest, updatedSrcStat.atime, updatedSrcStat.mtime);
}

function onDirSync(
    srcStat: Stats,
    destStat: BigIntStats | null,
    src: string,
    dest: string,
    opts: CopySyncOptions,
) {
    if (!destStat) {
        mkDirAndCopy(srcStat.mode, src, dest, opts);
        return;
    }
    copyDir(src, dest, opts);
}

function mkDirAndCopy(
    srcMode: number,
    src: string,
    dest: string,
    opts: CopySyncOptions,
) {
    mkdirSync(dest);
    copyDir(src, dest, opts);
    setDestModeSync(dest, srcMode);
}

function copyDir(src: string, dest: string, opts: CopySyncOptions) {
    const dir = opendirSync(src);

    try {
        let dirent;

        while ((dirent = dir.readSync()) !== null) {
            copyDirItem(dirent.name, src, dest, opts);
        }
    } finally {
        dir.closeSync();
    }
}

function copyDirItem(
    item: string,
    src: string,
    dest: string,
    opts: CopySyncOptions,
) {
    const srcItem = join(src, item);
    const destItem = join(dest, item);
    if (opts.filter && !opts.filter(srcItem, destItem)) return;
    const { destStat } = checkPathsSync(srcItem, destItem, "copy", opts);
    getStatsAndPerformCopySync(destStat, srcItem, destItem, opts);
}

function onLinkSync(
    destStat: BigIntStats | null,
    src: string,
    dest: string,
    opts: CopySyncOptions,
) {
    let resolvedSrc = readlinkSync(src);
    if (opts.dereference) {
        resolvedSrc = resolve(cwd(), resolvedSrc);
    }

    if (!destStat) {
        symlinkSync(resolvedSrc, dest);
    } else {
        let resolvedDest;
        try {
            resolvedDest = readlinkSync(dest);
        } catch (err) {
            // dest exists and is a regular file or directory,
            // Windows may throw UNKNOWN error. If dest already exists,
            // fs throws error anyway, so no need to guard against it here.
            if (err instanceof Error) {
                if (
                    (<NodeJS.ErrnoException>err).code === "EINVAL" ||
                    (<NodeJS.ErrnoException>err).code === "UNKNOWN"
                ) {
                    symlinkSync(resolvedSrc, dest);
                    return;
                }
            }
            throw err;
        }
        if (opts.dereference) {
            resolvedDest = resolve(process.cwd(), resolvedDest);
        }
        if (isChild(resolvedSrc, resolvedDest)) {
            throw new Error(
                `Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`,
            );
        }

        // prevent copy if src is a subdir of dest since unlinking
        // dest in this case would result in removing src contents
        // and therefore a broken symlink would be created.
        if (isChild(resolvedDest, resolvedSrc)) {
            throw new Error(
                `Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`,
            );
        }
        copyLink(resolvedSrc, dest);
    }
}

function copyLink(resolvedSrc: string, dest: string) {
    unlinkSync(dest);
    symlinkSync(resolvedSrc, dest);
}

function getStatsSync(src: string, dest: string, opts: CopySyncOptions) {
    let destStat;
    const statFunc = opts.dereference
        ? (file: string) => statSync(file, { bigint: true })
        : (file: string) => lstatSync(file, { bigint: true });
    const srcStat = statFunc(src);
    try {
        destStat = statFunc(dest);
    } catch (err) {
        if (err instanceof Error) {
            if ((<NodeJS.ErrnoException>err).code === "ENOENT")
                return { srcStat, destStat: null };
        }
        throw err;
    }
    return { srcStat, destStat };
}

function checkPathsSync(
    src: string,
    dest: string,
    funcName: string,
    opts: CopySyncOptions,
) {
    const { srcStat, destStat } = getStatsSync(src, dest, opts);

    if (destStat) {
        if (isIdentical(srcStat, destStat)) {
            const srcBaseName = basename(src);
            const destBaseName = basename(dest);
            if (
                funcName === "move" &&
                srcBaseName !== destBaseName &&
                srcBaseName.toLowerCase() === destBaseName.toLowerCase()
            ) {
                return { srcStat, destStat, isChangingCase: true };
            }
            throw new Error("Source and destination must not be the same.");
        }
        if (srcStat.isDirectory() && !destStat.isDirectory()) {
            throw new Error(
                `Cannot overwrite non-directory '${dest}' with directory '${src}'.`,
            );
        }
        if (!srcStat.isDirectory() && destStat.isDirectory()) {
            throw new Error(
                `Cannot overwrite directory '${dest}' with non-directory '${src}'.`,
            );
        }
    }

    if (srcStat.isDirectory() && isChild(src, dest)) {
        throw new Error(errMsg(src, dest, funcName));
    }
    return { srcStat, destStat };
}
