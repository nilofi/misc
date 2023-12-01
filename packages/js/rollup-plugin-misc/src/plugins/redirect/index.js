import { existsSync } from "fs";
import { dirname, parse, resolve } from "path";

/**
 * 如果某个文件在同目录下有指定后缀的同名文件，则将导入重定向到该后缀文件
 *
 * @example
 * suffix: node
 * `utils.ts` -> `utils.node.ts`
 *
 * @param {{suffix: string}} opts
 * @returns {import("rollup").Plugin}
 */
export function redirect(opts) {
    if (opts.suffix === "") return;

    return {
        name: "redirect",
        async resolveId(source, importer, options) {
            const { dir, name, ext } = parse(source);

            // 不能是别名
            const isAlias = dir === "";
            if (isAlias) return null;

            // 解析出绝对路径并判断文件是否存在
            const targetFilePath = `${dir}/${name}.${opts.suffix}.ts`;
            const targetSource = `${dir}/${name}.${opts.suffix}${ext}`;
            const targetFileAbsPath = resolve(dirname(importer ?? ""), targetFilePath);
            if (!existsSync(targetFileAbsPath)) return null;

            // 自身导入不需要重定向
            if (targetFileAbsPath === importer) return null;

            console.log("redirect:", source, "=>", targetSource);

            return this.resolve(targetSource, importer, Object.assign({ skipSelf: true }, options)).then(resolved => resolved || { id: targetSource });
        },
    };
}
