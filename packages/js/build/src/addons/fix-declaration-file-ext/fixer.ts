import { copyFileSync, existsSync, readdirSync } from "fs";
import { join } from "path";

export async function fixDeclarationFileExt(project: string) {
    const files = readdirSync(join(project, "dist"), {
        withFileTypes: true,
        recursive: true,
    }).filter(v => v.isFile());

    // 当前采用 copyFileSync 的方式是临时解决方案
    // 因为实际上如果仅重命名后缀的话，需要修改 d.ts 文件
    // 的导入后缀，比如改为 `.cjs` 才能够正确获取类型
    // 并且内部暂时仅能正确处理 d.ts 后缀

    for (const v of files) {
        const file = join(v.path, v.name);

        if (file.endsWith(".d.ts")) {
            const fileWithoutExt = file.slice(0, -5);
            if (!existsSync(fileWithoutExt + ".js")) {
                if (existsSync(fileWithoutExt + ".mjs")) {
                    copyFileSync(file, fileWithoutExt + ".d.mts");
                    // renameSync(file, fileWithoutExt + ".d.mts");
                } else if (existsSync(fileWithoutExt + ".cjs")) {
                    copyFileSync(file, fileWithoutExt + ".d.cts");
                    // renameSync(file, fileWithoutExt + ".d.cts");
                }
            }
        }
    }
}
