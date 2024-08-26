import { xfs } from "@xenon.js/misc";
import { join } from "path";

export async function fixDeclarationFileExt(project: string) {
    // 当前采用 copyFileSync 的方式是临时解决方案
    // 因为实际上如果仅重命名后缀的话，需要修改 d.ts 文件
    // 的导入后缀，比如改为 `.cjs` 才能够正确获取类型
    // 并且内部暂时仅能正确处理 d.ts 后缀

    for (const { path, stats } of xfs.walkSync(join(project, "dist"))) {
        if (!stats.isFile()) {
            continue;
        }

        if (path.endsWith(".d.ts")) {
            const fileWithoutExt = path.slice(0, -5);
            if (!xfs.has(fileWithoutExt + ".js")) {
                if (xfs.has(fileWithoutExt + ".mjs")) {
                    xfs.copySync(path, fileWithoutExt + ".d.mts");
                    // renameSync(file, fileWithoutExt + ".d.mts");
                } else if (xfs.has(fileWithoutExt + ".cjs")) {
                    xfs.copySync(path, fileWithoutExt + ".d.cts");
                    // renameSync(file, fileWithoutExt + ".d.cts");
                }
            }
        }
    }
}
