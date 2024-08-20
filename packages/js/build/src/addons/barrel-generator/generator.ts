import { building, type TBundleOptions } from "ctix-temp";
import { basename, dirname, join } from "path";
import type { BarrelGeneratorConfig } from "./config.js";

export async function generateBarrel(configs: BarrelGeneratorConfig[]) {
    console.log("generating barrel...");
    const options = configs.map(v => toOption(v));
    await building({
        $kind: "build",
        config: "",
        options,
        spinnerStream: "stdout",
        progressStream: "stdout",
        reasonerStream: "stderr",
    });
    console.log("generate barrel finished.");
}

function toOption(config: BarrelGeneratorConfig): TBundleOptions {
    const { project, file, include, exclude, ctix } = config;

    return {
        mode: "bundle",
        project: join(project, "tsconfig.json"),
        exportFilename: basename(file),
        useSemicolon: true,
        useBanner: true,
        useTimestamp: false,
        directive: "",
        quote: '"',
        fileExt: "to-js",
        overwrite: true,
        backup: false,
        generationStyle: "default-alias-named-star",
        include,
        exclude: exclude!,
        output: dirname(file),
        ...(ctix as Partial<TBundleOptions>),
    };
}
