import { mkdirSync } from "fs";
import { mkdir } from "fs/promises";

export async function createDirectory(path: string) {
    try {
        await mkdir(path, { recursive: true });
    } catch (error) {
        // do nothings.
    }
}

export function createDirectorySync(path: string) {
    try {
        mkdirSync(path, { recursive: true });
    } catch (error) {
        // do nothings.
    }
}
