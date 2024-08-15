import {
    type TBundleOptions,
    type TCreateOptions,
    type TModuleOptions,
} from "ctix";

export interface BarrelGeneratorConfig {
    /**
     * 项目路径
     */
    project: string;

    /**
     * 文件路径
     */
    file: string;

    /**
     * 包含文件列表
     */
    include: string[];

    /**
     * 排除文件列表
     */
    exclude?: string[];

    /**
     * 高级选项
     */
    ctix?: TCreateOptions | TBundleOptions | TModuleOptions;
}

export type BarrelGeneratorAddonConfig = {
    /**
     * 是否在构建时自动执行
     */
    atBuild: boolean;

    /**
     * 桶文件列表
     */
    files: Omit<BarrelGeneratorConfig, "project">[];
};
