export interface EntryPointsGeneratorConfig {
    /**
     * `package.json` 路径
     */
    packageJsonPath: string;

    /**
     * `exports` 映射对象
     *
     * - Key: 子路径
     * - Value: 源代码路径
     */
    entryPoints: Record<string, string>;

    /**
     * 需生成的条件
     */
    conditions?: string[];
}

export type EntryPointsGeneratorAddonConfig = {
    /**
     * 是否在构建时自动执行
     */
    atBuild: boolean;
} & Omit<EntryPointsGeneratorConfig, "packageJsonPath">;
