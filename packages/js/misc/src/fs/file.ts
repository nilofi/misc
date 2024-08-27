import { readFileSync, writeFileSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import { dirname } from "path";
import * as JSONC from "../jsonc/jsonc.js";
import { createDirectory, createDirectorySync } from "./directory.js";
import { exists, existsSync } from "./general.js";

export async function text(path: string, encoding: BufferEncoding = "utf-8") {
    try {
        return await readFile(path, encoding);
    } catch (error) {
        return undefined;
    }
}

export function textSync(path: string, encoding: BufferEncoding = "utf-8") {
    try {
        return readFileSync(path, encoding);
    } catch (error) {
        return undefined;
    }
}

export async function json<T>(
    path: string,
    encoding: BufferEncoding = "utf-8",
) {
    try {
        const str = await readFile(path, encoding);
        return JSON.parse(str) as T;
    } catch (error) {
        return undefined;
    }
}

export function jsonSync<T>(path: string, encoding: BufferEncoding = "utf-8") {
    try {
        const str = readFileSync(path, encoding);
        return JSON.parse(str) as T;
    } catch (error) {
        return undefined;
    }
}

export async function jsonc<T>(
    path: string,
    options?: {
        encoding?: BufferEncoding;
        removeComments?: boolean;
    },
): Promise<T | undefined> {
    try {
        const { encoding = "utf-8", removeComments } = options ?? {};
        const str = await readFile(path, encoding);
        return JSONC.parse<T>(str, undefined, removeComments);
    } catch (error) {
        return undefined;
    }
}

export function jsoncSync<T>(
    path: string,
    options?: {
        encoding?: BufferEncoding;
        removeComments?: boolean;
    },
): T | undefined {
    try {
        const { encoding = "utf-8", removeComments } = options ?? {};
        const str = readFileSync(path, encoding);
        return JSONC.parse<T>(str, undefined, removeComments);
    } catch (error) {
        return undefined;
    }
}

export async function bytes(path: string) {
    try {
        const buffer = await readFile(path);
        return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.length);
    } catch (error) {
        return undefined;
    }
}

export function bytesSync(path: string) {
    try {
        const buffer = readFileSync(path);
        return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.length);
    } catch (error) {
        return undefined;
    }
}

export async function write(
    path: string,
    content: string | BufferSource,
    encoding: BufferEncoding = "utf-8",
) {
    try {
        const dir = dirname(path);

        if (!(await exists(dir))) {
            await createDirectory(dir);
        }

        await writeFile(path, content as string, encoding);
    } catch (error) {
        // do nothings.
    }
}

export function writeSync(
    path: string,
    content: string | BufferSource,
    encoding: BufferEncoding = "utf-8",
) {
    try {
        const dir = dirname(path);

        if (!existsSync(dir)) {
            createDirectorySync(dir);
        }

        writeFileSync(path, content as string, encoding);
    } catch (error) {
        // do nothings.
    }
}

export async function writeJson(
    path: string,
    json: unknown,
    options?: {
        encoding?: BufferEncoding;
        space?: number;
    },
) {
    const { encoding = "utf-8", space } = options ?? {};
    await write(path, JSON.stringify(json, undefined, space), encoding);
}

export function writeJsonSync(
    path: string,
    json: unknown,
    options?: {
        encoding?: BufferEncoding;
        space?: number;
    },
) {
    const { encoding = "utf-8", space } = options ?? {};
    writeSync(path, JSON.stringify(json, undefined, space), encoding);
}

export async function writeJsonc(
    path: string,
    json: unknown,
    options?: {
        encoding?: BufferEncoding;
        space?: string | number;
    },
) {
    const { encoding = "utf-8", space } = options ?? {};
    await write(path, JSONC.stringify(json, undefined, space), encoding);
}

export function writeJsoncSync(
    path: string,
    json: unknown,
    options?: {
        encoding?: BufferEncoding;
        space?: string | number;
    },
) {
    const { encoding = "utf-8", space } = options ?? {};
    writeSync(path, JSONC.stringify(json, undefined, space), encoding);
}
