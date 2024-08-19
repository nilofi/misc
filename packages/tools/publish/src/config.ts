import { cwd } from "process";
import { NpmPackageManagerType } from "./npm.js";

export enum PublishType {
    Npm = "npm",
}

export interface Config {
    /**
     * 项目路径，默认 {@link cwd}
     */
    project: string;

    /**
     * 发布类型
     */
    type: PublishType;

    /**
     * NPM 包管理器，默认 {@link NpmPackageManagerType.Npm}
     */
    npmPackageManager?: NpmPackageManagerType;

    /**
     * 清理命令，默认 `npm run clean`
     */
    cleanCommand?: string;

    /**
     * 构建命令，默认 `npm run build`
     */
    buildCommand?: string;

    /**
     * Github 所属者
     */
    githubOwner?: string;

    /**
     * Github 仓库
     */
    githubRepo?: string;
}

export type ConfigInput = Partial<Config> & Required<Pick<Config, "type">>;

export function resolveConfig(config: ConfigInput): Config {
    let {
        project = cwd(),
        npmPackageManager = NpmPackageManagerType.Npm,
        type,
        buildCommand,
        cleanCommand,
        githubOwner,
        githubRepo,
    } = config;

    if (buildCommand == null) {
        buildCommand = `${npmPackageManager} run build`;
    }

    if (cleanCommand == null) {
        cleanCommand = `${npmPackageManager} run clean`;
    }

    return {
        type,
        project,
        npmPackageManager,
        buildCommand,
        cleanCommand,
        githubOwner,
        githubRepo,
    };
}
