import { readFile, writeFile } from "fs/promises";
import * as JSONC from "../jsonc/jsonc.js";

export async function text(path: string, encoding: BufferEncoding = "utf-8") {
    try {
        return await readFile(path, encoding);
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
        return await JSONC.parse(str, undefined, removeComments);
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

export async function write(
    path: string,
    content: string | BufferSource,
    encoding: BufferEncoding = "utf-8",
) {
    try {
        await writeFile(path, content as string, encoding);
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
    try {
        const { encoding = "utf-8", space } = options ?? {};
        await writeFile(path, JSON.stringify(json, undefined, space), encoding);
    } catch (error) {
        // do nothings.
    }
}

export async function writeJsonc(
    path: string,
    json: unknown,
    options?: {
        encoding?: BufferEncoding;
        space?: string | number;
    },
) {
    try {
        const { encoding = "utf-8", space } = options ?? {};
        await writeFile(
            path,
            JSONC.stringify(json, undefined, space),
            encoding,
        );
    } catch (error) {
        // do nothings.
    }
}
