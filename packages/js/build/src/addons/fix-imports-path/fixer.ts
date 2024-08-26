import {
    relativeDot,
    toExtname,
    toPosix,
    xfs,
    type PackageJson,
} from "@xenon.js/misc";
import { dirname, join, resolve } from "path";
import type { PackageJsonExportsWithConditions } from "../../builders/chunk-builder.js";

export async function fixImportsPath(project: string) {
    const json = (await xfs.json<PackageJson>(join(project, "package.json")))!;

    const imports = json.imports;
    if (imports) {
        const paths = new Map<string, string>();
        const excludes = new Set<string>();

        for (const path in imports) {
            function resolveCondition(
                temp: string | PackageJsonExportsWithConditions,
            ) {
                if (typeof temp === "string") {
                    paths.set(path, resolve(project, temp));
                    excludes.add(resolve(project, temp));
                } else {
                    for (const condition in temp) {
                        resolveCondition(temp[condition]);
                    }
                }
            }
            resolveCondition(imports[path]);
        }

        for (const { path, stats } of xfs.walkSync(join(project, "src"))) {
            if (!stats.isFile()) {
                continue;
            }

            if (!excludes.has(path)) {
                let content = (await xfs.text(path))!;

                for (const [a, b] of paths) {
                    content = content.replace(
                        toPosix(
                            toExtname(relativeDot(dirname(path), b), ".js"),
                        ),
                        a,
                    );
                }

                await xfs.write(path, content);
            }
        }
    }
}
