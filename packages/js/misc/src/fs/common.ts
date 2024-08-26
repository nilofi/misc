import type { Stats } from "fs";

export interface FileItem {
    path: string;
    stats: Stats;
}
