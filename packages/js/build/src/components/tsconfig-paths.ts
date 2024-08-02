// copy from https://github.com/lightyen/typescript-paths/tree/main/packages/rollup-plugin-tsconfig-paths
import { existsSync } from "fs";
import path from "path";
import type { Plugin } from "rollup";
import { createHandler } from "typescript-paths";
import pathsTransformer from "typescript-transform-paths";

/**
 * 解决与 redirect 插件的兼容性问题
 */
export function tsConfigPaths(): Plugin {
    let handler: ReturnType<typeof createHandler>;
    return {
        name: "tsconfig-paths",
        buildStart() {
            handler = createHandler({
                falllback: moduleName => existsSync(moduleName),
            });
            return;
        },
        async resolveId(request, importer, options) {
            if (!importer || request.startsWith("\0")) {
                return null;
            }
            const moduleName =
                handler == null ? void 0 : handler(request, importer);
            if (!moduleName) {
                return this.resolve(request, importer, {
                    skipSelf: true,
                    ...options,
                });
            }

            if (!path.extname(moduleName)) {
                return this.resolve(moduleName, importer, {
                    skipSelf: true,
                    ...options,
                });
            } else {
                // need to redirect plugin
                return this.resolve(moduleName, importer, {
                    skipSelf: true,
                    ...options,
                });
            }
        },
    };
}

export function tsConfigPathsTransformer() {
    return pathsTransformer.default;
}
