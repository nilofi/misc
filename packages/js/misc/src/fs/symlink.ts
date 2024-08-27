import {
    symlinkSync as _symlinkSync,
    existsSync,
    lstatSync,
    statSync,
    type Stats,
} from "fs";
import { symlink as _symlink, lstat, stat } from "fs/promises";
import { dirname, isAbsolute, join, relative } from "path";
import { createDirectory, createDirectorySync } from "./directory.js";
import { exists, isIdentical } from "./general.js";

async function symlinkPaths(src: string, dest: string) {
    if (isAbsolute(src)) {
        try {
            await lstat(src);
        } catch (err) {
            if (err instanceof Error) {
                err.message = err.message.replace("lstat", "ensureSymlink");
            }
            throw err;
        }

        return {
            toCwd: src,
            toDst: src,
        };
    }

    const dstdir = dirname(dest);
    const relativeToDst = join(dstdir, src);

    const exist = await exists(relativeToDst);
    if (exist) {
        return {
            toCwd: relativeToDst,
            toDst: src,
        };
    }

    try {
        await lstat(src);
    } catch (err) {
        if (err instanceof Error) {
            err.message = err.message.replace("lstat", "ensureSymlink");
        }
        throw err;
    }

    return {
        toCwd: src,
        toDst: relative(dstdir, src),
    };
}

function symlinkPathsSync(src: string, dest: string) {
    if (isAbsolute(src)) {
        const exists = existsSync(src);
        if (!exists) throw new Error("absolute srcpath does not exist");
        return {
            toCwd: src,
            toDst: src,
        };
    }

    const dstdir = dirname(dest);
    const relativeToDst = join(dstdir, src);
    const exists = existsSync(relativeToDst);
    if (exists) {
        return {
            toCwd: relativeToDst,
            toDst: src,
        };
    }

    const srcExists = existsSync(src);
    if (!srcExists) throw new Error("relative srcpath does not exist");
    return {
        toCwd: src,
        toDst: relative(dstdir, src),
    };
}

async function symlinkType(src: string, type?: "dir" | "file" | "junction") {
    if (type) return type;

    try {
        const stats = await lstat(src);
        return stats.isDirectory() ? "dir" : "file";
    } catch {
        return "file";
    }
}

function symlinkTypeSync(src: string, type?: "dir" | "file" | "junction") {
    if (type) return type;

    try {
        const stats = lstatSync(src);
        return stats.isDirectory() ? "dir" : "file";
    } catch {
        return "file";
    }
}

export async function createSymlink(
    src: string,
    dest: string,
    type?: "dir" | "file" | "junction",
) {
    let stats: Stats | undefined;

    try {
        stats = await lstat(dest);
    } catch {
        // do nothings.
    }

    if (stats?.isSymbolicLink()) {
        const [srcStat, dstStat] = await Promise.all([stat(src), stat(dest)]);

        if (isIdentical(srcStat, dstStat)) return;
    }

    const relative = await symlinkPaths(src, dest);
    src = relative.toDst;
    const toType = await symlinkType(relative.toCwd, type);
    const dir = dirname(dest);

    if (!(await exists(dir))) {
        await createDirectory(dir);
    }

    return _symlink(src, dest, toType);
}

export function createSymlinkSync(
    src: string,
    dest: string,
    type?: "dir" | "file" | "junction",
) {
    let stats: Stats | undefined;

    try {
        stats = lstatSync(dest);
    } catch {
        // do nothings.
    }

    if (stats?.isSymbolicLink()) {
        const srcStat = statSync(src);
        const dstStat = statSync(dest);
        if (isIdentical(srcStat, dstStat)) return;
    }

    const relative = symlinkPathsSync(src, dest);
    src = relative.toDst;
    type = symlinkTypeSync(relative.toCwd, type);
    const dir = dirname(dest);
    const exists = existsSync(dir);
    if (!exists) {
        createDirectorySync(dir);
    }
    _symlinkSync(src, dest, type);
}
