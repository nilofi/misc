import {
    existsSync as _existsSync,
    type BigIntStats,
    rmSync,
    type Stats,
} from "fs";
import { access, rm } from "fs/promises";

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
