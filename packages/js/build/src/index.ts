export * from "./addons/barrel-generator/config.js";
export { generateBarrel } from "./addons/barrel-generator/generator.js";
export * from "./addons/entry-points-generator/config.js";
export { generateEntryPoints } from "./addons/entry-points-generator/generator.js";
export * from "./addons/modules-generator/config.js";
export {
    generateModules,
    type Modules,
} from "./addons/modules-generator/generator.js";
export * from "./config.js";
export { build, watch } from "./main.js";
