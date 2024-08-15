import { xfs, type PackageJson } from "@xenon.js/misc";
import { format, parse } from "path";
import type { EntryPointsGeneratorConfig } from "./config.js";

export async function generateEntryPoints(config: EntryPointsGeneratorConfig) {
    const { packageJsonPath, entryPoints, conditions } = config;

    console.log("generating entry points...");

    const exports: Record<string, PackageJson.PackageExportsEntry> = {};
    for (const [key, src] of Object.entries(entryPoints)) {
        exports[key] = generateDists(src, conditions);
    }

    const json = await xfs.json<PackageJson>(packageJsonPath);
    if (json) {
        json.exports = exports;
        await xfs.writeJson(packageJsonPath, json, { space: 2 });
        console.log("generate entry points finished.");
    } else {
        console.error("generate entry points failed.");
    }
}

function generateDists(src: string, conditions?: string[]) {
    if (conditions) {
        const paths: PackageJson.PackageExportsEntry = {};
        for (const condition of conditions) {
            paths[condition] = generateDist(src, condition);
        }
        return paths;
    } else {
        return generateDist(src, "");
    }
}

function generateDist(src: string, condition: string = "") {
    const info = parse(src);
    const originalDir = info.dir;
    info.dir = originalDir.replace(
        "src",
        `dist/${condition ? condition + "-" : ""}es`,
    );
    info.base = info.name + ".js";
    const importPath = format(info);
    info.dir = originalDir.replace(
        "src",
        `dist/${condition ? condition + "-" : ""}cjs`,
    );
    info.base = info.name + ".cjs";
    const requirePath = format(info);
    info.dir = originalDir.replace(
        "src",
        `dist/${condition ? condition + "-" : ""}es`,
    );
    info.base = info.name + ".d.ts";
    const typesPath = format(info);
    return {
        types: typesPath,
        import: importPath,
        require: requirePath,
    };
}
