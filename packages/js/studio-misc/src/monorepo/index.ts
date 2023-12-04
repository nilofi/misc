import { findUpSync } from "find-up";
import { readFileSync, statSync } from "fs";
import { glob } from "glob";
import { dirname, join, posix, resolve } from "path";
import { parse } from "yaml";
import { TEMP_RELATIVE_PATH } from "../misc/index.js";

/**
 * Monorepo 包信息
 */
export interface MonorepoPackageInfo {
    name: string;
    alias: string;
    path: string;
    absolutePath: string;
    json: Record<string, unknown>;
    jsonPath: string;
    tempPath: string;
}

/**
 * Monorepo 信息
 */
export class MonorepoInfo {
    /**
     * Monorepo 工作区声明文件（绝对路径）
     */
    readonly filePath = findUpSync("pnpm-workspace.yaml")!;

    /**
     * Monorepo 工作区声明文件对象
     */
    readonly info: { packages: string[] } = parse(readFileSync(this.filePath, { encoding: "utf-8" }));

    /**
     * Monorepo 工作区根目录（绝对路径）
     */
    readonly rootPath = dirname(this.filePath);

    /**
     * 所有包的信息
     */
    readonly packageInfos = new Map<string, MonorepoPackageInfo>();

    constructor() {
        const globs = this.info.packages as string[];

        // 收集所有包信息
        for (const globPath of globs) {
            const packages = glob.sync(posix.join(globPath, "/"), { cwd: this.rootPath });
            console.log(packages);
            for (const packagePath of packages) {
                const packageJsonPath = join(packagePath, "package.json");
                const packageJsonAbsolutePath = resolve(this.rootPath, packageJsonPath);
                try {
                    statSync(packageJsonAbsolutePath);
                    const packageJson = JSON.parse(readFileSync(packageJsonAbsolutePath, { encoding: "utf-8" }));
                    this.packageInfos.set(packageJson.name, {
                        name: packageJson.name,
                        alias: (<string>packageJson.name).replace("@", "").replaceAll("/", "-"),
                        path: packagePath,
                        absolutePath: join(this.rootPath, packagePath),
                        json: packageJson,
                        jsonPath: packageJsonPath,
                        tempPath: join(packagePath, TEMP_RELATIVE_PATH),
                    });
                } catch {}
            }
        }
    }

    /**
     * 获取所有公共包
     */
    getPublicPackages() {
        const packages: MonorepoPackageInfo[] = [];
        for (const [name, info] of this.packageInfos) {
            if (!info.json.private) {
                packages.push(info);
            }
        }
        return packages;
    }
}
