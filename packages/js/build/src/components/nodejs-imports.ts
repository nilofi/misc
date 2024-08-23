import { relativeDot, toPosix } from "@xenon.js/misc";
import { dirname, resolve } from "path";
import ts, {
    type CallExpression,
    type CustomTransformerFactory,
    type LiteralTypeNode,
    type Node,
    type Program,
    type SourceFile,
    type TransformationContext,
} from "typescript";
import type {
    PackageJsonExportsWithConditions,
    PackageJsonImports,
} from "../builders/chunk-builder.js";

export interface NodeJSImportsOptions {
    projectPath: string;
    paths: { [key: string]: string | undefined };
}

export function resolveImports(
    projectPath: string,
    imports: PackageJsonImports | undefined,
    conditions: Set<string> | null,
): NodeJSImportsOptions | undefined {
    // conditions from rollup node-resolve plugin
    const defaultConditions = ["default", "module", "import"];
    const finalConditions = new Set([
        ...defaultConditions,
        ...(conditions ?? []),
    ]);
    const obj: NodeJSImportsOptions = { projectPath, paths: {} };

    if (imports) {
        for (const path in imports) {
            function resolveCondition(
                temp: string | PackageJsonExportsWithConditions,
            ): string | undefined {
                if (typeof temp === "string") {
                    return temp;
                } else {
                    for (const condition in temp) {
                        if (finalConditions.has(condition)) {
                            const solved = resolveCondition(temp[condition]);
                            if (solved != null) {
                                return solved;
                            }
                        }
                    }
                    return undefined;
                }
            }
            const solved = resolveCondition(imports[path]);
            if (solved != null) {
                obj.paths[path] = resolve(projectPath, solved);
            }
        }
    }

    return Object.keys(obj.paths).length > 0 ? obj : undefined;
}

function getImportsFile(
    opts: NodeJSImportsOptions,
    source: string,
    importer?: string,
) {
    let target = opts.paths[source];
    if (target && importer) {
        if (target.endsWith(".ts")) {
            target = target.slice(0, -3) + ".js";
        }
        return toPosix(relativeDot(dirname(importer), target));
    } else {
        return undefined;
    }
}

function isAsyncImport(node: Node): node is CallExpression {
    return (
        ts.isCallExpression(node) &&
        node.expression.kind === ts.SyntaxKind.ImportKeyword &&
        ts.isStringLiteral(node.arguments[0]) &&
        node.arguments.length === 1
    );
}

function isRequire(node: Node): node is CallExpression {
    return (
        ts.isCallExpression(node) &&
        ts.isIdentifier(node.expression) &&
        node.expression.text === "require" &&
        ts.isStringLiteral(node.arguments[0]) &&
        node.arguments.length === 1
    );
}

export function nodejsImportsTransformer(
    opts: NodeJSImportsOptions,
): (program: Program) => CustomTransformerFactory {
    return function nodejsImportsTransformer(program) {
        return context => {
            return {
                transformSourceFile(file) {
                    if (!file.isDeclarationFile) {
                        return file;
                    }
                    return visitEachChild(
                        file,
                        file,
                        opts,
                        context,
                    ) as SourceFile;
                },
                transformBundle(node) {
                    throw "not implemented!";
                },
            };
        };
    };
}

function visitEachChild(
    file: SourceFile,
    parent: Node,
    opts: NodeJSImportsOptions,
    context: TransformationContext,
): Node {
    return ts.visitEachChild(
        file,
        node => {
            /**
             * Update require / import functions
             *
             * require('module')
             * import('module')
             */
            if (isRequire(node) || isAsyncImport(node)) {
                const source = node.arguments[0].getText(file);
                const targetSource = getImportsFile(
                    opts,
                    source,
                    file.fileName,
                );
                if (targetSource != null) {
                    console.log(
                        "require/import imports:",
                        source,
                        "=>",
                        targetSource,
                    );
                    return context.factory.updateCallExpression(
                        node,
                        node.expression,
                        node.typeArguments,
                        [context.factory.createStringLiteral(targetSource)],
                    );
                } else {
                    return node;
                }
            }

            /**
             * Update ExternalModuleReference
             *
             * import foo = require("foo");
             */
            if (
                ts.isExternalModuleReference(node) &&
                ts.isStringLiteral(node.expression)
            ) {
                const source = node.expression.getText(file);
                const targetSource = getImportsFile(
                    opts,
                    source,
                    file.fileName,
                );
                if (targetSource != null) {
                    console.log(
                        "import = require imports:",
                        source,
                        "=>",
                        targetSource,
                    );
                    return context.factory.updateExternalModuleReference(
                        node,
                        context.factory.createStringLiteral(targetSource),
                    );
                } else {
                    return node;
                }
            }

            /**
             * Update ImportTypeNode
             *
             * typeof import("./bar");
             * import ("package").MyType;
             */
            if (ts.isImportTypeNode(node)) {
                const argument = node.argument as LiteralTypeNode;

                if (!ts.isStringLiteral(argument.literal)) return node;

                const { text } = argument.literal;
                if (!text) return node;

                const source = text;
                const targetSource = getImportsFile(
                    opts,
                    source,
                    file.fileName,
                );
                if (targetSource != null) {
                    console.log(
                        "typeof import imports:",
                        source,
                        "=>",
                        targetSource,
                    );
                    const res = context.factory.updateImportTypeNode(
                        node,
                        context.factory.updateLiteralTypeNode(
                            argument,
                            context.factory.createStringLiteral(targetSource),
                        ),
                        node.attributes,
                        node.qualifier,
                        node.typeArguments,
                        node.isTypeOf,
                    );

                    return visitEachChild(file, res, opts, context);
                } else {
                    return node;
                }
            }

            /**
             * Update ImportDeclaration
             *
             * import ... 'module';
             */
            if (
                ts.isImportDeclaration(node) &&
                node.moduleSpecifier &&
                ts.isStringLiteral(node.moduleSpecifier)
            ) {
                const source = node.moduleSpecifier.text;
                const targetSource = getImportsFile(
                    opts,
                    source,
                    file.fileName,
                );
                if (targetSource != null) {
                    console.log("import imports:", source, "=>", targetSource);
                    // TODO - In next major version, we can remove this entirely due to TS PR 57223
                    //   see: https://github.com/microsoft/TypeScript/pull/57223
                    //   We should at least skip this if doing a minor version update if the ts version is high enough to not need it
                    // if (
                    //     !file.isDeclarationFile &&
                    //     node.importClause?.namedBindings
                    // ) {
                    //     const resolver =
                    //         transformationContext.getEmitResolver();
                    //     // If run in "manual" mode without a Program, we won't have a resolver, so we can't elide
                    //     if (resolver)
                    //         return elideImportOrExportDeclaration(
                    //             this,
                    //             node,
                    //             p,
                    //             resolver,
                    //         );
                    // }
                    return context.factory.updateImportDeclaration(
                        node,
                        node.modifiers,
                        node.importClause,
                        context.factory.createStringLiteral(targetSource),
                        node.attributes,
                    );
                } else {
                    return node;
                }
            }

            /**
             * Update ExportDeclaration
             *
             * export ... 'module';
             */
            if (
                ts.isExportDeclaration(node) &&
                node.moduleSpecifier &&
                ts.isStringLiteral(node.moduleSpecifier)
            ) {
                const source = node.moduleSpecifier.text;
                const targetSource = getImportsFile(
                    opts,
                    source,
                    file.fileName,
                );
                if (targetSource != null) {
                    console.log("export imports:", source, "=>", targetSource);
                    // TODO - In next major version, we can remove this entirely due to TS PR 57223
                    //   see: https://github.com/microsoft/TypeScript/pull/57223
                    //   We should at least skip this if doing a minor version update if the ts version is high enough to not need it
                    // if (
                    //     !file.isDeclarationFile &&
                    //     node.exportClause &&
                    //     ts.isNamedExports(node.exportClause)
                    // ) {
                    //     const resolver =
                    //         transformationContext.getEmitResolver();
                    //     // If run in "manual" mode without a Program, we won't have a resolver, so we can't elide
                    //     if (resolver)
                    //         return elideImportOrExportDeclaration(
                    //             this,
                    //             node,
                    //             p,
                    //             resolver,
                    //         );
                    // }
                    return context.factory.updateExportDeclaration(
                        node,
                        node.modifiers,
                        node.isTypeOnly,
                        node.exportClause,
                        context.factory.createStringLiteral(targetSource),
                        node.attributes,
                    );
                } else {
                    return node;
                }
            }

            /**
             * Update module augmentation
             */
            if (ts.isModuleDeclaration(node) && ts.isStringLiteral(node.name)) {
                const source = node.name.text;
                const targetSource = getImportsFile(
                    opts,
                    source,
                    file.fileName,
                );
                if (targetSource != null) {
                    console.log("module imports:", source, "=>", targetSource);
                    return context.factory.updateModuleDeclaration(
                        node,
                        node.modifiers,
                        context.factory.createStringLiteral(targetSource),
                        node.body,
                    );
                } else {
                    return node;
                }
            }

            return node;
        },
        context,
    );
}
