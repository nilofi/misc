#!/usr/bin/env node
import { Command } from "@commander-js/extra-typings";
import * as ui from "@inquirer/prompts";
import { xfs, type PackageJson } from "@xenon.js/misc";
import { config as loadEnv } from "dotenv";
import { $ } from "execa";
import { existsSync } from "fs";
import { Octokit } from "octokit";
import { join, resolve } from "path";
import { cwd, env } from "process";
import semver, { SemVer } from "semver";
import { PublishType, resolveConfig, type Config } from "./config.js";
import { STAGE_TO_NPM_TAG } from "./npm.js";
import { Stage, STAGES } from "./stage.js";

const CONFIG_PATH = ["xebuild.config.js", "xebuild.config.mjs"];

const program = new Command()
    .name("xe-publish")
    .description("A publishing tool.")
    .option("-c --config <path>", "set config file path.")
    .option("-p --project <path>", "set project path.")
    .option("-t --type <type>", "set publish type.")
    .option("-s --stage <type>", "set publish stage.")
    .option("-r --release <version>", "set publish version.")
    .option("-q --quiet", "no inquiries are made.");

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
            result = resolveConfig({
                type: params.type as PublishType,
            });
        }
    }

    if (params.project) {
        result.project = params.project;
    }

    if (params.type) {
        result.type = params.type as PublishType;
    }

    if (result.type == null) {
        return {
            config: undefined!,
            err: "publish type is required.",
        };
    }

    return {
        config: result,
    };
}

let { config, err } = await readConfigFile();
if (err) {
    throw err;
}

loadEnv({ path: join(config.project, ".env") });

const packageJson = (await xfs.json<PackageJson>(
    join(config.project, "package.json"),
))!;
const currentVersion = semver.parse(packageJson.version!)!;

const quiet = params.quiet === true;

function checkQuietParams() {
    if (params.stage == null) {
        return "publish stage is required.";
    }

    if (params.release == null) {
        return "publish version is required.";
    }

    return null;
}

err = quiet ? checkQuietParams() : null;
if (err) {
    throw err;
}

// 询问是否重新构建
const needRebuild = quiet
    ? true
    : await ui.confirm({
          message: "Do you want rebuild?",
          default: true,
      });
if (needRebuild) {
    await $({
        stdio: "inherit",
        cwd: config.project,
    })`pnpm run clean`;
    await $({
        stdio: "inherit",
        cwd: config.project,
    })`pnpm run build`;
}

// 询问版本类型
const stage = (
    quiet
        ? params.stage!
        : await ui.select({
              message: "Select stage:",
              choices: STAGES.map(value => ({ value })),
              default: currentVersion.prerelease.find(v => v === Stage.Beta)
                  ? Stage.Beta
                  : currentVersion.prerelease.find(v => v === Stage.Alpha)
                    ? Stage.Alpha
                    : Stage.Release,
          })
) as Stage;

// 询问版本号
function handleVersion(version: string) {
    if (version === "current") {
        return currentVersion.toString();
    }
    if (semver.valid(version) == null) {
        return incVersion(currentVersion, version as semver.ReleaseType);
    }
    return version;
}
function incVersion(version: string | SemVer, release: semver.ReleaseType) {
    if (release.startsWith("pre")) {
        return semver.inc(version, release, stage, "1")!;
    } else {
        return semver.inc(version, release)!;
    }
}
const version = handleVersion(
    quiet
        ? params.release!
        : await ui.select({
              message: "Select version:",
              choices:
                  stage === Stage.Release
                      ? [
                            {
                                value: currentVersion.toString(),
                                description: "current",
                            },
                            {
                                value: incVersion(currentVersion, "patch"),
                                description: "patch",
                            },
                            {
                                value: incVersion(currentVersion, "minor"),
                                description: "minor",
                            },
                            {
                                value: incVersion(currentVersion, "major"),
                                description: "major",
                            },
                        ]
                      : [
                            {
                                value: currentVersion.toString(),
                                description: "current",
                            },
                            {
                                value: incVersion(currentVersion, "prerelease"),
                                description: "prerelease",
                            },
                            {
                                value: incVersion(currentVersion, "prepatch"),
                                description: "prepatch",
                            },
                            {
                                value: incVersion(currentVersion, "preminor"),
                                description: "preminor",
                            },
                            {
                                value: incVersion(currentVersion, "premajor"),
                                description: "premajor",
                            },
                        ],
          }),
);

// 修改 NPM 版本号
console.log("update package.json version...");
packageJson.version = version;
await xfs.writeJson(join(config.project, "package.json"), packageJson, {
    space: 2,
});

// 提醒检查发布前任务
if (!quiet) {
    const checkItems: Parameters<typeof ui.checkbox>[0]["choices"] = [
        {
            value: "View reports",
        },
        {
            value: "Update changelog",
        },
        {
            value: "Commit all changes and clear the working directory",
        },
        {
            value: `Publish version ${version} (in ${stage} channel)`,
        },
    ];
    await ui.checkbox({
        message: "Please check items?",
        choices: checkItems,
        loop: false,
        validate(choices) {
            if (checkItems.length !== choices.length) {
                return "Please check all items before proceeding.";
            } else {
                return true;
            }
        },
    });
}

// Add Git tag
const versionName = `v${version}`;
const addGitTag = quiet
    ? true
    : await ui.confirm({
          message: "Do you want add git tag?",
      });
if (addGitTag) {
    console.log("add git tag...");
    await $({
        stdio: "inherit",
        cwd: config.project,
    })`git tag -s ${versionName} -m ${stage}`;
    await $({
        stdio: "inherit",
        cwd: config.project,
    })`git push origin ${versionName}`;
}

// 打包成 tarball
console.log("pack tarball...");
const temp = (
    await $({
        cwd: config.project,
    })`pnpm pack --pack-destination=temp`
).stdout;
const tarFile = temp.toString().split("\n").at(-1)!.trim();

// 发布到 npm
async function getCurrentBranch() {
    return (
        await $({ cwd: config.project })`git rev-parse --abbrev-ref HEAD`
    ).stdout
        .toString()
        .trim();
}
const branch = await getCurrentBranch();
const npmTag = STAGE_TO_NPM_TAG[stage];
const publishToNpm = quiet
    ? true
    : await ui.confirm({
          message: "Do you want publish to npm?",
      });
if (publishToNpm) {
    console.log("publish to npm...");
    await $({
        stdio: "inherit",
        cwd: config.project,
    })`pnpm publish ${tarFile} --publish-branch=${branch} --tag=${npmTag}`;
}

// 发布到 Github Release
const publishToGithub = quiet
    ? true
    : await ui.confirm({
          message: "Do you want publish to github?",
      });
if (publishToGithub) {
    console.log("publish to github...");
    if (quiet) {
        if (env.GITHUB_TOKEN == null) {
            throw "publish to github need include github token in .env file.";
        }
    } else {
        while (env.GITHUB_TOKEN == null) {
            await ui.confirm({
                message: "Please include the github token in your.env file.",
            });
            loadEnv({ path: join(config.project, ".env"), override: true });
        }
    }
    const octokit = new Octokit({
        auth: env.GITHUB_TOKEN,
    });
    await octokit.rest.repos.createRelease({
        owner: config.githubOwner!,
        repo: config.githubRepo!,
        name: versionName,
        tag_name: versionName,
        generate_release_notes: true,
        prerelease: stage !== "release",
        make_latest: "legacy",
        headers: {
            "X-GitHub-Api-Version": "2022-11-28",
        },
    });
}

console.log("publish success!");
