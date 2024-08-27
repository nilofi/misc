import {
    existsSync as _existsSync,
    lstatSync as _lstatSync,
    statSync as _statSync,
    type BigIntStats,
    rmSync,
    type Stats,
} from "fs";
import { lstat as _lstat, stat as _stat, access, rm } from "fs/promises";

export async function exists(path: string) {
    try {
        await access(path);
        return true;
    } catch {
        return false;
    }
}

export function existsSync(path: string) {
    return _existsSync(path);
}

export function has(path: string) {
    return _existsSync(path);
}

export async function remove(path: string) {
    try {
        await rm(path, { force: true, recursive: true });
    } catch (error) {
        // do nothings.
    }
}

export function removeSync(path: string) {
    try {
        rmSync(path, { force: true, recursive: true });
    } catch (error) {
        // do nothings.
    }
}

export async function stat<B extends boolean = false>(
    path: string,
    bigint: B = false as B,
): Promise<(B extends true ? BigIntStats : Stats) | undefined> {
    try {
        return (await _stat(path, { bigint })) as never;
    } catch (error) {
        return undefined;
    }
}

export function statSync<B extends boolean = false>(
    path: string,
    bigint: B = false as B,
): (B extends true ? BigIntStats : Stats) | undefined {
    try {
        return _statSync(path, { bigint }) as never;
    } catch (error) {
        return undefined;
    }
}

export async function lstat<B extends boolean = false>(
    path: string,
    bigint: B = false as B,
): Promise<(B extends true ? BigIntStats : Stats) | undefined> {
    try {
        return (await _lstat(path, { bigint })) as never;
    } catch (error) {
        return undefined;
    }
}

export function lstatSync<B extends boolean = false>(
    path: string,
    bigint: B = false as B,
): (B extends true ? BigIntStats : Stats) | undefined {
    try {
        return _lstatSync(path, { bigint }) as never;
    } catch (error) {
        return undefined;
    }
}

export function isIdentical(
    srcStat: Stats | BigIntStats,
    destStat: Stats | BigIntStats,
) {
    return !!(
        destStat.ino &&
        destStat.dev &&
        destStat.ino === srcStat.ino &&
        destStat.dev === srcStat.dev
    );
}
