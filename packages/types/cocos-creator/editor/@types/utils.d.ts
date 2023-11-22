import type { Utils as UtilsType } from "./utils/index.js";

declare global {
    export namespace Editor {
        export const Utils = UtilsType;
    }
}
