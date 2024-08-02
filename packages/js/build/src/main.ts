import { join } from "path";
import { chdir } from "process";
import { rollup, watch as rollupWatch, type OutputOptions } from "rollup";
import { genChunks } from "./builders/chunk-builder.js";
import { OptionsBuilder } from "./builders/options-builder.js";
import { resolveImports } from "./components/nodejs-imports.js";
import type { Config } from "./config.js";
import {
    chunksToConstans,
    chunkToDistDir,
    chunkToRollupInput,
    conditionsToFormat,
    pickRedirectSuffix,
    readJson,
} from "./utils.js";

export async function handle(
    config: Config,
    handler: (builder: OptionsBuilder) => void,
) {
    const {
        project,
        treeshake,
        redirects,
        constants,
        external,
        cleanDirs,
        forceCocos,
        onlyBuildConditions,
        binConditions,
    } = config;

    chdir(project);
    const json = readJson<any>(join(project, "package.json"));
    const chunks = genChunks(json.exports, binConditions, json.bin);
    const fixeds = new Set<string>();

    if (chunks.errMsg) {
        console.error("发生错误：", chunks.errMsg);
        return false;
    }

    for (const [key, chunk] of chunks.chunks) {
        if (onlyBuildConditions?.some(v => !chunk.conditions?.has(v))) {
            continue;
        }

        const builder = new OptionsBuilder();

        if (forceCocos && chunk.conditions) {
            redirects.forEach(v => {
                if (chunk.conditions!.delete(v)) {
                    fixeds.add(v);
                }
            });
            chunk.conditions.add("cocos");
        }

        builder.setInput(chunkToRollupInput(key, chunk));
        builder.setOutputDir(`./${chunkToDistDir(key)}`);
        builder.setOutputFormat(
            conditionsToFormat(chunk.conditions, json.type === "module"),
        );
        builder.setExternal(external);
        builder.setTreeshake(treeshake);
        builder.setConditions(chunk.conditions);
        builder.setConstants({
            ...chunksToConstans(chunks, fixeds, chunk),
            ...constants,
        });
        builder.setImports(
            resolveImports(project, json.imports, chunk.conditions),
        );
        const suffixResult = pickRedirectSuffix(redirects, chunk);
        if (suffixResult.errMsg) {
            console.error(
                "发生错误：",
                "chunk:",
                key,
                "error:",
                suffixResult.errMsg,
            );
            return false;
        }
        builder.setRedirectSuffix(suffixResult.suffix);
        builder.setGenerateDeclarationFile(chunk.dts);
        builder.setClearDirs(cleanDirs);

        handler(builder);
    }

    return true;
}

export async function build(config: Config) {
    return handle(config, async builder => {
        try {
            const options = builder.build();
            const bundle = await rollup(options);
            await bundle.write(options.output as OutputOptions);
            await bundle.close();
        } catch (error) {
            console.error("rollup error:", error);
        }
    });
}

export async function watch(config: Config) {
    return handle(config, async builder => {
        try {
            const options = builder.build();
            const watcher = rollupWatch(options);

            watcher.on("event", ({ code, result, error }: any) => {
                if (result) {
                    result.close();
                }
                if (code === "START") {
                    console.log("changing...");
                }
                if (code === "END") {
                    console.log("watching...");
                }
                if (code === "ERROR") {
                    console.log("watch error:", error);
                }
            });

            console.log("watching...");
        } catch (error) {
            console.error("rollup error:", error);
        }
    });
}
