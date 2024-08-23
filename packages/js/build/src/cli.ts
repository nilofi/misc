#!/usr/bin/env node

import { Command } from "@commander-js/extra-typings";
import { existsSync } from "fs";
import { resolve } from "path";
import { cwd } from "process";
import { resolveConfig, type Config } from "./config.js";
import { build, watch } from "./main.js";

const CONFIG_PATH = ["xebuild.config.js", "xebuild.config.mjs"];

const program = new Command()
    .name("xe-build")
    .description("A modern build tool out of the box.")
    .option("-w, --watch", "use watch mode.")
    .option("-c --config <path>", "set config file path.")
    .option("-p --project <path>", "set project path.")
    .option(
        "-d --cleanDirs <dirs...>",
        "a list of paths to empty before building.",
    )
    .option(
        "-b --binConditions <conditions...>",
        "a list of conditions used to build an executable entry point.",
    )
    .option(
        "-o --onlyBuildConditions <conditions...>",
        "only chunks that meet both of these conditions are build.",
    );

program.parse();

const params = program.opts();

// console.log("options:", params);

async function readConfigFile(): Promise<{ config: Config; err?: unknown }> {
    let result: Config;

    try {
        const { default: config } = await import(
            resolve(
                cwd(),
                params.config ??
                    CONFIG_PATH.find(v => existsSync(resolve(cwd(), v))) ??
                    "",
            )
        );
        result = resolveConfig(config);
    } catch (error) {
        if (params.config) {
            return {
                config: undefined!,
                err: error,
            };
        } else {
            result = resolveConfig({});
        }
    }

    if (params.project) {
        result.project = params.project;
    }
    if (params.cleanDirs) {
        result.cleanDirs = params.cleanDirs;
    }
    if (params.binConditions) {
        result.binConditions = params.binConditions;
    }
    if (params.onlyBuildConditions) {
        result.onlyBuildConditions = params.onlyBuildConditions;
    }

    return {
        config: result,
    };
}

const { config, err } = await readConfigFile();
if (err) {
    throw err;
}

if (params.watch) {
    await watch(config);
} else {
    await build(config);
}
