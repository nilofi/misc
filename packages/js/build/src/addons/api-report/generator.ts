import {
    Extractor,
    ExtractorConfig,
    ExtractorLogLevel,
} from "@microsoft/api-extractor";
import { xfs } from "@xenon.js/misc";
import { basename, dirname, join, resolve } from "path";
import type { ApiReportConfig } from "./config.js";

export async function generateApiReport(config: ApiReportConfig) {
    console.log("generating api report...");
    const { project, entryPoint, file, conditions } = config;
    const tsconfig = await xfs.jsonc<{
        compilerOptions?: { customConditions?: string[] };
    }>(join(project, "tsconfig.json"), {
        removeComments: true,
    });
    if (tsconfig && conditions) {
        tsconfig.compilerOptions ??= {};
        tsconfig.compilerOptions.customConditions = conditions;
    }
    Extractor.invoke(
        ExtractorConfig.prepare({
            configObjectFullPath: undefined,
            packageJsonFullPath: join(project, "package.json"),
            configObject: {
                projectFolder: project,
                mainEntryPointFilePath: resolve(project, entryPoint),
                compiler: {
                    // tsconfigFilePath: "<projectFolder>/tsconfig.json",
                    overrideTsconfig: tsconfig,
                },
                dtsRollup: {
                    enabled: false,
                },
                docModel: {
                    enabled: false,
                },
                apiReport: {
                    enabled: true,
                    reportFolder: resolve(project, dirname(file)),
                    reportTempFolder: join(project, "temp"),
                    reportFileName: basename(file),
                    includeForgottenExports: true,
                },
                tsdocMetadata: {
                    enabled: false,
                },
                messages: {
                    extractorMessageReporting: {
                        "ae-missing-release-tag": {
                            logLevel: ExtractorLogLevel.None,
                        },
                        "ae-unresolved-link": {
                            logLevel: ExtractorLogLevel.None,
                        },
                    },
                    tsdocMessageReporting: {
                        "default": {
                            logLevel: ExtractorLogLevel.None,
                        },
                    },
                },
            },
        }),
        {
            localBuild: true,
        },
    );
    console.log("generate api report finished.");
}
