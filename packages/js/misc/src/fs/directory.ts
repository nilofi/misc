import { mkdirSync } from "fs";
import { mkdir } from "fs/promises";

export async function create(path: string) {
    try {
        await mkdir(path, { recursive: true });
    } catch (error) {
        // do nothings.
    }
}

export function createSync(path: string) {
    try {
        mkdirSync(path, { recursive: true });
    } catch (error) {
        // do nothings.
    }
}
