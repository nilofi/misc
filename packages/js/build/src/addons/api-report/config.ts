export interface ApiReportConfig {
    /**
     * 项目路径
     */
    project: string;

    /**
     * 输出 `.md` 文件
     */
    file: string;

    /**
     * 入口 `.d.ts` 文件
     */
    entryPoint: string;

    /**
     * 是否指定条件，如果不指定则使用 `tsconfig.json` 文件中的配置
     */
    conditions?: string[];
}

export type ApiReportAddonConfig = {
    /**
     * 是否在构建时自动执行
     */
    atBuild: boolean;

    /**
     * 输出目录
     *
     * 如果填写 `.report`，那么实际可能输出到 `.report/cocos-es/index.api.md` 文件
     */
    output: string;
} & Omit<ApiReportConfig, "project" | "entryPoint" | "file" | "conditions">;
