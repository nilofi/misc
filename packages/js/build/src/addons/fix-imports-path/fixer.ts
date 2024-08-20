import {
    relativeDot,
    toExtname,
    toPosix,
    xfs,
    type PackageJson,
} from "@xenon.js/misc";
import { readdirSync } from "fs";
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

        const files = readdirSync(join(project, "src"), {
            withFileTypes: true,
            recursive: true,
        }).filter(v => v.isFile());

        for (const v of files) {
            const barrelFile = join(v.path, v.name);

            if (!excludes.has(barrelFile)) {
                let content = (await xfs.text(barrelFile))!;

                for (const [a, b] of paths) {
                    content = content.replace(
                        toPosix(
                            toExtname(
                                relativeDot(dirname(barrelFile), b),
                                ".js",
                            ),
                        ),
                        a,
                    );
                }

                await xfs.write(barrelFile, content);
            }
        }
    }
}
