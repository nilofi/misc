export interface ModulesGeneratorConfig {
    /**
     * 项目路径
     */
    project: string;

    /**
     * 文件路径
     */
    file: string;

    /**
     * 排除以下路径不作为模块目录
     */
    exclude: string[];

    /**
     * 单独作为模块的文件列表
     */
    entryPoints: string[];
}

export type ModulesGeneratorAddonConfig = {
    /**
     * 是否在构建时自动执行
     */
    atBuild: boolean;
} & Omit<ModulesGeneratorConfig, "project">;
