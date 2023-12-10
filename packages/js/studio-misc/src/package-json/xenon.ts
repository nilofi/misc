/**
 * package.json Xenon 字段对象类型
 */
export interface PackageJsonXenonSettings {
    xenon?: {
        /**
         * 构建选项
         */
        build?: {
            /**
             * 根据 {@link getExternal} 策略自动生成 `external` 列表，如果已经传入了 `external` 字段，则会与其合并，默认 `true`
             */
            autoExternal?: boolean;

            /**
             * 打包前清空路径列表
             *
             * 该属性会与构建时传入的参数进行合并
             */
            clean?: string[];

            /**
             * 强制捆绑的包名称列表，即使在 `external` 列表中也会强制捆绑
             *
             * 该属性会与构建时传入的参数进行合并
             */
            bundled?: string[];

            /**
             * 不捆绑的包名称列表，会转为模块正则表达式
             *
             * 该属性会与构建时传入的参数进行合并
             */
            external?: string[];

            /**
             * 传入该属性控制是否强制生成或不生成 `d.ts` 文件，默认 `undefined` 自动判断
             */
            forceGenTypes?: boolean;

            /**
             * 是否捆绑 `d.ts` 文件，默认 `false`
             */
            bundleTypes?: boolean;
        };
    };
}
