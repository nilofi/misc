import { toPosix, xfs } from "@xenon.js/misc";
import { dirname, parse, resolve } from "path";
import type { Plugin } from "rollup";
import ts, {
    type CallExpression,
    type CustomTransformerFactory,
    type LiteralTypeNode,
    type Node,
    type Program,
    type SourceFile,
    type TransformationContext,
} from "typescript";

export interface RedirectOptions {
    suffix: string;
}

function getRedirectFile(
    opts: RedirectOptions,
    source: string,
    importer?: string,
) {
    const { dir, name, ext } = parse(source);

    // 不能是别名
    const isAlias = dir === "";
    if (isAlias) return null;

    // 解析出绝对路径并判断文件是否存在
    const targetFilePath = `${toPosix(dir)}/${name}.${opts.suffix}.ts`;
    const targetSource = `${toPosix(dir)}/${name}.${opts.suffix}${ext}`;
    const targetFileAbsPath = resolve(dirname(importer ?? ""), targetFilePath);

    if (!xfs.has(targetFileAbsPath)) return null;

    // code.node.ts -> code.ts 不需要重定向
    if (targetFileAbsPath === importer) return null;

    return targetSource;
}

/**
 * 如果某个文件在同目录下有指定后缀的同名文件，则将导入重定向到该后缀文件
 *
 * @example
 * suffix: node
 * `utils.ts` -> `utils.node.ts`
 */
export function redirect(opts: RedirectOptions): Plugin {
    return {
        name: "redirect",
        async resolveId(source, importer, options) {
            const targetSource = getRedirectFile(opts, source, importer);

            if (targetSource == null) {
                return null;
            }

            console.log("redirect:", source, "=>", targetSource);

            return this.resolve(
                targetSource,
                importer,
                Object.assign({ skipSelf: true }, options),
            ).then(resolved => resolved || { id: targetSource });
        },
    };
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

export function redirectTransformer(
    opts: RedirectOptions,
): (program: Program) => CustomTransformerFactory {
    return function redirectTransformer(program) {
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
    opts: RedirectOptions,
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
                const targetSource = getRedirectFile(
                    opts,
                    source,
                    file.fileName,
                );
                if (targetSource != null) {
                    console.log(
                        "require/import redirect:",
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
                const targetSource = getRedirectFile(
                    opts,
                    source,
                    file.fileName,
                );
                if (targetSource != null) {
                    console.log(
                        "import = require redirect:",
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
                const targetSource = getRedirectFile(
                    opts,
                    source,
                    file.fileName,
                );
                if (targetSource != null) {
                    console.log(
                        "typeof import redirect:",
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
                const targetSource = getRedirectFile(
                    opts,
                    source,
                    file.fileName,
                );
                if (targetSource != null) {
                    console.log("import redirect:", source, "=>", targetSource);
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
                const targetSource = getRedirectFile(
                    opts,
                    source,
                    file.fileName,
                );
                if (targetSource != null) {
                    console.log("export redirect:", source, "=>", targetSource);
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
                const targetSource = getRedirectFile(
                    opts,
                    source,
                    file.fileName,
                );
                if (targetSource != null) {
                    console.log("module redirect:", source, "=>", targetSource);
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
