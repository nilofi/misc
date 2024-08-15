import { mkdir } from "fs/promises";

export async function create(path: string) {
    try {
        await mkdir(path, { recursive: true });
    } catch (error) {
        // do nothings.
    }
}
