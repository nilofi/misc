import * as tsm from 'ts-morph';
import yargs, { Argv, ArgumentsCamelCase } from 'yargs';
import { SingleBar } from 'cli-progress';
import ora from 'ora';
import { PassFailEither } from 'my-only-either';
import { SetRequired, SetOptional } from 'type-fest';
import { GlobOptions, Glob } from 'glob';
import dayjs from 'dayjs';
import { Options } from 'prettier';
import { Eta } from 'eta';

declare function getCommentKind(kind: tsm.SyntaxKind): tsm.ts.SyntaxKind.SingleLineCommentTrivia | tsm.ts.SyntaxKind.MultiLineCommentTrivia;

declare function getCommentsWithParent(node: tsm.Node<tsm.ts.Node>): tsm.CommentRange[];

declare function getCommentWorkspace(workspace: string): string;

declare function getCommentWorkspaces(rawWorkspace?: string): string[];

interface IInlineCommentInfo {
    commentCode: string;
    filePath: string;
    tag: string;
    pos: {
        line: number;
        column: number;
        start: number;
    };
    workspaces?: string[];
}

interface IStatementComments {
    kind: tsm.SyntaxKind.MultiLineCommentTrivia | tsm.SyntaxKind.SingleLineCommentTrivia;
    pos: {
        line: number;
        column: number;
        start: number;
    };
    filePath: string;
    range: string;
}

declare function getInlineCommented(params: {
    comment: IStatementComments;
    options: {
        keyword: string;
    };
}): IInlineCommentInfo | undefined;

declare const CE_INLINE_COMMENT_KEYWORD: {
    readonly FILE_EXCLUDE_KEYWORD: "@ctix-exclude";
    readonly FILE_DECLARATION_KEYWORD: "@ctix-declaration";
    readonly NEXT_STATEMENT_EXCLUDE_KEYWORD: "@ctix-exclude-next";
    readonly FILE_GENERATION_STYLE_KEYWORD: "@ctix-generation-style";
};
type CE_INLINE_COMMENT_KEYWORD = (typeof CE_INLINE_COMMENT_KEYWORD)[keyof typeof CE_INLINE_COMMENT_KEYWORD];

declare function getInlineCommentedFiles(params: {
    project: tsm.Project;
    filePaths: string[];
    keyword: CE_INLINE_COMMENT_KEYWORD;
}): {
    filePath: string;
    commentCode: string;
    tag: string;
    pos: {
        line: number;
        column: number;
        start: number;
    };
    workspaces?: string[];
}[];

declare const CE_GENERATION_STYLE: {
    readonly AUTO: "auto";
    readonly DEFAULT_ALIAS_NAMED_STAR: "default-alias-named-star";
    readonly DEFAULT_ALIAS_NAMED_DESTRUCTIVE: "default-alias-named-destructive";
    readonly DEFAULT_NON_ALIAS_NAMED_DESTRUCTIVE: "default-non-alias-named-destructive";
    readonly DEFAULT_STAR_NAMED_STAR: "default-star-named-star";
    readonly DEFAULT_STAR_NAMED_DESTRUCTIVE: "default-star-named-destructive";
};
type CE_GENERATION_STYLE = (typeof CE_GENERATION_STYLE)[keyof typeof CE_GENERATION_STYLE];

interface IInlineGenerationStyleInfo {
    commentCode: string;
    filePath: string;
    style: CE_GENERATION_STYLE;
    pos: {
        line: number;
        column: number;
        start: number;
    };
    workspaces?: string[];
}

declare function getInlineStyle(params: {
    comment: IStatementComments;
    options: {
        keyword: string;
    };
}): IInlineGenerationStyleInfo | undefined;

declare function getJsDocComment(kind: tsm.SyntaxKind.MultiLineCommentTrivia | tsm.SyntaxKind.SingleLineCommentTrivia, comment: string): string;

declare function getJsDocTag(tag: string): string;

declare function getNodeComments(node: tsm.Node<tsm.ts.Node>, identifier?: string): IStatementComments[];

interface IExtendOptions {
    eol: string;
    tsconfig: tsm.ts.ParsedCommandLine;
    topDir: {
        dirs: string[];
        depth: number;
    };
    resolved: {
        projectDirPath: string;
        projectFilePath: string;
    };
}

declare function getOutputExcludedFiles(params: {
    project: tsm.Project;
    extendOptions: Pick<IExtendOptions, 'eol'>;
    exportFilename: string;
    filePaths: string[];
}): Promise<string[]>;

interface ISourceFileComments {
    filePath: string;
    comments: IStatementComments[];
}

declare function getSourceFileComments(sourceFile: tsm.SourceFile): ISourceFileComments;

declare function getExportAssignmentMap(sourceFile: tsm.SourceFile): Map<string, tsm.ExportAssignment>;

declare function getExportedKind(node: tsm.ExportedDeclarations): {
    name?: string;
    isPureType: boolean;
    kind: tsm.SyntaxKind;
};

interface IExportStatement {
    path: {
        filename: string;
        dirPath: string;
        relativePath: string;
    };
    pos: {
        line: number;
        column: number;
    };
    depth: number;
    isDefault: boolean;
    identifier: {
        name: string;
        alias: string;
    };
    isPureType: boolean;
    isAnonymous: boolean;
    isExcluded: boolean;
    comments: IInlineCommentInfo[];
}

interface IModeGenerateOptions {
    project: string;
    exportFilename: string;
    useSemicolon: boolean;
    useBanner: boolean;
    useTimestamp: boolean;
    quote: string;
    directive: string;
    overwrite: boolean;
    backup: boolean;
    include: string[];
    exclude: string[];
}

declare function getExportStatement(sourceFile: tsm.SourceFile, option: Pick<IModeGenerateOptions, 'project' | 'exportFilename'>, extendOptions: Pick<IExtendOptions, 'eol'>): Promise<IExportStatement[]>;

declare function getFileScope(tsconfig: unknown): {
    include: string[];
    exclude: string[];
};

declare function getFunctionName(kind: tsm.SyntaxKind, name?: string): string | undefined;

declare function getStatementAlias({ alias, isDefault, filenamified, kind, }: {
    alias?: string;
    filenamified: string;
    isDefault?: boolean;
    kind: ReturnType<typeof getExportedKind>;
}): string;

declare function getSummaryStatement(params: {
    node: tsm.ExportedDeclarations;
    project: string;
    identifier?: string;
    alias?: string;
    eol: string;
    path: IExportStatement['path'];
    isDefault?: boolean;
}): IExportStatement;

declare function getTypeScriptConfig(project: string): tsm.ts.ParsedCommandLine;

declare function getTypeScriptProject(projectOption: tsm.ProjectOptions): tsm.Project;

declare function isDeclaration(statement: tsm.SyntaxKind): boolean;

declare function isDeclarationFile(sourceFile: tsm.SourceFile): boolean;

interface IReason {
    type: 'error' | 'warn';
    lineAndCharacter?: tsm.ts.LineAndCharacter;
    filePath: string;
    source?: tsm.SourceFile;
    nodes?: tsm.Node[];
    message: string;
}

declare class StatementTable {
    #private;
    static key(statement: string | IExportStatement): string;
    constructor();
    select(key: string | IExportStatement): IExportStatement[];
    selects(): IExportStatement[][];
    insert(statement: IExportStatement): void;
    inserts(statements: IExportStatement[]): void;
    isDuplicate(statement: IExportStatement): boolean;
    isDuplicateFromSecond(statement: IExportStatement): boolean;
    getDuplicateReason(): IReason[];
}

declare class SymbolTable {
    #private;
    constructor(sourceFile: tsm.SourceFile);
    get table(): Readonly<Map<number, tsm.Node>>;
    getByPos(pos: number): tsm.Node | undefined;
}

declare const CE_CTIX_COMMAND: {
    readonly BUILD_COMMAND: "build";
    readonly BUILD_COMMAND_ALIAS: "b";
    readonly REMOVE_COMMAND: "remove";
    readonly REMOVE_COMMAND_ALIAS: "r";
    readonly INIT_COMMAND: "init";
    readonly INIT_COMMAND_ALIAS: "i";
};
type CE_CTIX_COMMAND = (typeof CE_CTIX_COMMAND)[keyof typeof CE_CTIX_COMMAND];

type TStreamType = Extract<keyof typeof process, 'stdout' | 'stderr'>;

interface IProjectOptions {
    config: string;
    spinnerStream: TStreamType;
    progressStream: TStreamType;
    reasonerStream: TStreamType;
}

declare const CE_CTIX_BUILD_MODE: {
    readonly CREATE_MODE: "create";
    readonly BUNDLE_MODE: "bundle";
    readonly MODULE_MODE: "module";
};
type CE_CTIX_BUILD_MODE = (typeof CE_CTIX_BUILD_MODE)[keyof typeof CE_CTIX_BUILD_MODE];

interface ICommonModeOptions {
    mode: CE_CTIX_BUILD_MODE;
}

interface IModeBundleOptions {
    output: string;
}

interface IModeCreateOptions {
    skipEmptyDir: boolean;
    startFrom: string;
}

declare const CE_EXTENSION_PROCESSING: {
    readonly NOT_EXTENSION: "none";
    readonly KEEP_EXTENSION: "keep";
    readonly REPLACE_JS: "to-js";
};
type CE_EXTENSION_PROCESSING = (typeof CE_EXTENSION_PROCESSING)[keyof typeof CE_EXTENSION_PROCESSING];

interface IModeTsGenerateOptions {
    fileExt: CE_EXTENSION_PROCESSING;
    generationStyle: CE_GENERATION_STYLE;
}

type TCommandBuildArgvOptions = IProjectOptions & ICommonModeOptions & IModeGenerateOptions & IModeTsGenerateOptions & IModeBundleOptions & IModeCreateOptions;

interface ICommandRemoveOptions {
    removeBackup: boolean;
    exportFilename: string;
    forceYes: boolean;
}

type TCommandRemoveOptions = {
    $kind: typeof CE_CTIX_COMMAND.REMOVE_COMMAND;
} & IProjectOptions & ICommandRemoveOptions;

declare function castConfig(command: CE_CTIX_COMMAND, config: unknown, paths: {
    from: 'none' | '.ctirc' | 'tsconfig.json' | 'package.json';
    config?: string;
    tsconfig?: string;
}): TCommandBuildArgvOptions | TCommandRemoveOptions | IProjectOptions;

declare function getConfigObject(argv: Record<string, unknown>, ...keywordArgs: string[]): Record<string, unknown> | undefined;

declare function getConfigValue(argv: Record<string, unknown>, ...keywordArgs: string[]): string | undefined;

declare function getExtendOptions(project: string): Promise<IExtendOptions>;

declare function loadConfig(): Promise<TCommandBuildArgvOptions | TCommandRemoveOptions | IProjectOptions>;

declare function parseConfig<T = unknown>(buf: Buffer | string): T;

interface ICommandInitOptions {
    forceYes: boolean;
}

declare function setCommandInitOptions<T = Argv<ICommandInitOptions>>(args: Argv<ICommandInitOptions>): T;

declare function setCommandRemoveOptions<T = Argv<ICommandRemoveOptions>>(args: Argv<ICommandRemoveOptions>): T;

declare function setModeBundleOptions<T = Argv<IModeBundleOptions>>(args: Argv<IModeBundleOptions>): T;

declare function setModeCreateOptions<T = Argv<IModeCreateOptions>>(args: Argv<IModeCreateOptions>): T;

declare function setModeGenerateOptions<T = Argv<IModeGenerateOptions & IModeTsGenerateOptions>>(args: Argv<IModeGenerateOptions & IModeTsGenerateOptions>): T;

declare function setProjectOptions<T = Argv<IProjectOptions>>(args: Argv<IProjectOptions>): T;

declare function buildCommand(argv: yargs.ArgumentsCamelCase<TCommandBuildArgvOptions>): Promise<void>;

declare function initCommand(argv: yargs.ArgumentsCamelCase<ICommandInitOptions>): Promise<void>;

declare function removeCommand(argv: yargs.ArgumentsCamelCase<TCommandRemoveOptions & TCommandBuildArgvOptions>): Promise<void>;

interface IChoiceTypeItem {
    filePath: string;
    name: string;
    value: string;
}

interface IInitQuestionAnswer {
    cwd: string;
    tsconfig: string[];
    mode: CE_CTIX_BUILD_MODE;
    overwirte: boolean;
    packageJson: string;
    addEveryOptions: boolean;
    configComment: boolean;
    confirmBackupPackageTsconfig: boolean;
    configPosition: '.ctirc' | 'tsconfig.json' | 'package.json';
    exportFilename: string;
}

declare function getRatioNumber(num: number, base?: 1 | 100): number;

declare function askInitOptions(): Promise<IInitQuestionAnswer>;

declare function askInitOverwrite(): void;

declare function askRemoveFiles(filePaths: string[]): Promise<string[]>;

declare class ProgressBar {
    #private;
    static get it(): ProgressBar;
    static get isBootstrap(): boolean;
    static bootstrap(): void;
    constructor(bar: SingleBar, stream: TStreamType, enable: boolean);
    set stream(value: TStreamType);
    get enable(): boolean;
    set enable(value: boolean);
    get head(): string;
    set head(value: string);
    start(max: number, initial?: number): void;
    increment(): void;
    update(current: number): void;
    stop(): void;
}

declare class Reasoner {
    #private;
    static get it(): Reasoner;
    static get isBootstrap(): boolean;
    static bootstrap(): void;
    constructor(func: typeof console.log | typeof console.error, stream: TStreamType, enable: boolean);
    set stream(value: TStreamType);
    get enable(): boolean;
    set enable(value: boolean);
    static messaging(reason: IReason): string;
    start(reasons: IReason[]): void;
}

declare class Spinner {
    #private;
    static get it(): Spinner;
    static get isBootstrap(): boolean;
    static bootstrap(): void;
    constructor(spinner: ora.Ora, stream: TStreamType, enable: boolean);
    set stream(value: TStreamType);
    get enable(): boolean;
    set enable(value: boolean);
    start(message?: string): void;
    messaging(kind: 'succeed' | 'fail' | 'update', message: string): void;
    fail(message: string): void;
    succeed(message: string): void;
    update(message: string): void;
    stop(): void;
}

declare const CE_INLINE_EXCLUDE_KIND: {
    readonly FILE_EXCLUDE_KEYWORD: "file";
    readonly NEXT_STATEMENT_EXCLUDE_KEYWORD: "next-statement";
};
type CE_INLINE_EXCLUDE_KIND = (typeof CE_INLINE_EXCLUDE_KIND)[keyof typeof CE_INLINE_EXCLUDE_KIND];

interface IDocumentComment {
    line: number;
    kind: 'file' | 'statement';
    keywordPos: {
        line: number;
        pos: number;
    };
    content: string;
    namespace?: string;
}

interface IExcludeFile {
    filePath: string;
    fileExcludeComment: IInlineCommentInfo[];
    firstExcludeComment?: IInlineCommentInfo;
    excluded: boolean;
}

interface IDeclarationFile {
    path: {
        filename: string;
        dirPath: string;
        relativePath: string;
    };
}

interface IIdentifierWithNode {
    identifier: string;
    node: tsm.Node;
    isIsolatedModules: boolean;
    moduleDeclaration?: string;
}

interface IExportInfo {
    isEmpty: boolean;
    resolvedFilePath: string;
    resolvedDirPath: string;
    relativeFilePath: string;
    depth: number;
    starExported: boolean;
    defaultExport?: IIdentifierWithNode;
    namedExports: IIdentifierWithNode[];
}

declare const CE_CTIX_DEFAULT_VALUE: {
    readonly CONFIG_FILENAME: ".ctirc";
    readonly TSCONFIG_FILENAME: "tsconfig.json";
    readonly EXPORT_FILENAME: "index.ts";
    readonly PACKAGE_JSON_FILENAME: "package.json";
    readonly REMOVE_FILE_CHOICE_FUZZY: 50;
};
type CE_CTIX_DEFAULT_VALUE = (typeof CE_CTIX_DEFAULT_VALUE)[keyof typeof CE_CTIX_DEFAULT_VALUE];

interface IModeModuleOptions {
    output: string;
}

type TBundleOptions = {
    mode: typeof CE_CTIX_BUILD_MODE.BUNDLE_MODE;
} & IModeBundleOptions & IModeGenerateOptions & IModeTsGenerateOptions;

type TCreateOptions = {
    mode: typeof CE_CTIX_BUILD_MODE.CREATE_MODE;
} & IModeCreateOptions & IModeGenerateOptions & IModeTsGenerateOptions;

type TModuleOptions = {
    mode: typeof CE_CTIX_BUILD_MODE.MODULE_MODE;
} & IModeGenerateOptions & IModeModuleOptions;

type TCommandBuildOptions = IProjectOptions & {
    $kind: typeof CE_CTIX_COMMAND.BUILD_COMMAND;
    options: (TCreateOptions | TBundleOptions | TModuleOptions)[];
};

type TCommandInitOptions = {
    $kind: typeof CE_CTIX_COMMAND.INIT_COMMAND;
} & ICommandInitOptions;

declare function getCommand(raw: (string | number)[]): CE_CTIX_COMMAND;

declare function getConfigFilePath(fileName: string, configFilePath?: string): Promise<string | undefined>;

declare function getDefaultInitAnswer(): Promise<IInitQuestionAnswer>;

declare function getEOL(text: string): string;
declare function getSourceFileEol(sourceFiles: string[]): Promise<string>;

declare function getTsconfigComparer(cwd: string): (left: string, right: string) => number;

declare function readConfigFromFile(configFilePath: string): Promise<PassFailEither<Error, Record<string, unknown>>>;

declare function readConfigFromPackageJson(): Promise<PassFailEither<Error, Record<string, unknown>>>;

declare function readConfigFromTsconfigJson(tsconfigFilePath: string): Promise<PassFailEither<Error, Record<string, unknown>>>;

declare function createBuildOptions(argv: ArgumentsCamelCase<TCommandBuildArgvOptions> & {
    options?: (TCreateOptions | TBundleOptions)[];
    from?: string;
}): Promise<TCommandBuildOptions>;

declare function createRemoveOptions(argv: ArgumentsCamelCase<TCommandRemoveOptions & TCommandBuildArgvOptions> & {
    options?: (TCreateOptions | TBundleOptions)[];
}): TCommandRemoveOptions;

declare function getOutputValue(argv: Pick<SetRequired<Partial<TCommandBuildArgvOptions>, 'project'> & {
    options?: (TCreateOptions | TBundleOptions | TModuleOptions)[];
}, 'output' | 'project'>, option: Partial<TBundleOptions | TModuleOptions>): string;

declare function transformBundleMode(argv: SetRequired<Partial<TCommandBuildArgvOptions>, 'project'> & {
    options?: (TCreateOptions | TBundleOptions)[];
}, option: Partial<TBundleOptions> & {
    include: TBundleOptions['include'];
    exclude: TBundleOptions['exclude'];
}): TBundleOptions;

declare function transformCreateMode(argv: SetRequired<Partial<TCommandBuildArgvOptions>, 'project'> & {
    options?: (TCreateOptions | TBundleOptions)[];
}, option: Partial<Omit<TCreateOptions, 'include' | 'exclude'>> & {
    include: TCreateOptions['include'];
    exclude: TCreateOptions['exclude'];
}): Promise<TCreateOptions>;

declare function transformModuleMode(argv: SetRequired<Partial<TCommandBuildArgvOptions>, 'project'> & {
    options?: (TCreateOptions | TBundleOptions | TModuleOptions)[];
}, option: Partial<Omit<TModuleOptions, 'include' | 'exclude'>> & {
    include: TModuleOptions['include'];
    exclude: TModuleOptions['exclude'];
}): Promise<TModuleOptions>;

declare function building(options: TCommandBuildOptions): Promise<void>;

declare function bundling(buildOptions: TCommandBuildOptions, bundleOption: TBundleOptions): Promise<void>;

declare function creating(_buildOptions: TCommandBuildOptions, createOption: TCreateOptions): Promise<void>;

declare function initializing(option: TCommandInitOptions): Promise<void>;

declare function moduling(_buildOptions: TCommandBuildOptions, moduleOption: TModuleOptions): Promise<void>;

declare function removing(options: TCommandRemoveOptions & Omit<TCommandBuildOptions, '$kind'>): Promise<void>;

declare function checkOutputFile(outputMap: Map<string, string>): Promise<IReason[]>;

declare function endsEol(content: string, eol: string, size?: number): string;

declare function getGlobFiles<T extends GlobOptions>(glob: Glob<T>): string[];

interface IGetRemoveFileGlobPatternReturn {
    origin: string;
    project: string;
    pattern: string;
}
declare function getRemoveFileGlobPattern(argv: Pick<yargs.ArgumentsCamelCase<TCommandRemoveOptions & TCommandBuildArgvOptions>, 'exportFilename' | 'removeBackup'>, options: (Pick<TCreateOptions, 'project' | 'exportFilename'> | Pick<TBundleOptions, 'project' | 'exportFilename'>)[]): Promise<IGetRemoveFileGlobPatternReturn[]>;

declare function getTsExcludeFiles(config: {
    config: Pick<IModeGenerateOptions, 'exclude'>;
    extend: Pick<IExtendOptions, 'tsconfig'>;
}): string[];

declare function getTsIncludeFiles(config: {
    config: Pick<IModeGenerateOptions, 'include'>;
    extend: Pick<IExtendOptions, 'tsconfig'> & {
        resolved: Pick<IExtendOptions['resolved'], 'projectDirPath'>;
    };
}): string[];

declare class ProjectContainer {
    #private;
    static get it(): ProjectContainer;
    static get isBootstrap(): boolean;
    static project(projectPath: string): tsm.Project;
    static addSourceFilesAtPaths(projectPath: string, filePaths: string[]): void;
    static bootstrap(): void;
    constructor();
    project(projectPath: string): tsm.Project;
    addSourceFilesAtPaths(projectPath: string, filePaths: string[]): void;
}

declare function unlinks(filePaths: string[], callback?: (filePath: string) => void | Promise<void>): Promise<void>;

declare function dfsWalk(currentDirPath: string, callback: (params: {
    dirPath: string;
    filePaths: string[];
}) => void | Promise<void>): Promise<void>;

declare function addCurrentDirPrefix(filePath: string, sep?: string): string;

declare function addExt(filename: string, ext: string): string;

declare const extensions: string[];

declare function filenamify(filename: string): string;

declare function getAllParentDir(parentDir: string, childDir: string): string[];

declare function getDepth(dirPath: string): number;

declare function getExtname(filePath: string): string;

declare function getImportStatementExtname(option: CE_EXTENSION_PROCESSING, extname: string): string;

declare function getImportStatementRemoveExtname(extname: string): string;

declare function getImportStatementReplaceJs(extname: string): string;

declare function getParentDir(rawDirPath: string): string | undefined;

declare function getRelativeDepth(basePath: string, dirPath: string): number;

declare const defaultExclude: string[];

declare class ExcludeContainer {
    #private;
    constructor(params: {
        config: Pick<IModeGenerateOptions, 'exclude'>;
        inlineExcludeds: IInlineCommentInfo[];
        cwd: string;
    });
    get globs(): Readonly<Glob<GlobOptions>[]>;
    get map(): Readonly<Map<string, boolean>>;
    isExclude(filePath: string): boolean;
}

declare class IncludeContainer {
    #private;
    constructor(params: {
        config: Pick<IModeGenerateOptions, 'include'>;
        cwd: string;
    });
    get globs(): Readonly<Glob<GlobOptions>[]>;
    get map(): Readonly<Map<string, boolean>>;
    isInclude(filePath: string): boolean;
    files(): string[];
}

declare function getCheckedValue<T>(types: string, value: unknown): T | undefined;

declare function isConfigComment(answer: Pick<IInitQuestionAnswer, 'configComment' | 'configPosition'>): boolean;

declare function getBanner(option: Pick<TCreateOptions | TBundleOptions, 'useBanner' | 'useTimestamp'>, todayArgs?: dayjs.Dayjs): string | undefined;

declare function indexWrites(indexFiles: {
    path: string;
    content: string;
}[], option: Pick<TCreateOptions | TBundleOptions | TModuleOptions, 'directive' | 'useBanner' | 'useTimestamp' | 'backup'>, extendOptions: IExtendOptions): Promise<void>;

declare function prettifing(project: string, contents: string, options?: Options): Promise<{
    apply: boolean;
    contents: string;
}>;

declare const CE_AUTO_RENDER_CASE: {
    readonly DEFAULT_NAMED: 1;
    readonly DEFAULT: 2;
    readonly NAMED: 3;
    readonly NAMED_PARTAL: 4;
    readonly DEFAULT_PARTIAL: 5;
    readonly DEFAULT_NAMED_PARTIAL: 6;
    readonly UNKNOWN: number;
};
type CE_AUTO_RENDER_CASE = (typeof CE_AUTO_RENDER_CASE)[keyof typeof CE_AUTO_RENDER_CASE];

declare const CE_TEMPLATE_NAME: {
    readonly INDEX_FILE_TEMPLATE: "index-file-template";
    readonly NESTED_OPTIONS_TEMPLATE: "nested-options-template";
    readonly OPTIONS_TEMPLATE: "options-template";
    readonly MODULE_INDEX_FILE_TEMPLATE: "module-index-file-template";
    readonly DECLARATION_FILE_TEMPLATE: "declaration-file-template";
};
type CE_TEMPLATE_NAME = (typeof CE_TEMPLATE_NAME)[keyof typeof CE_TEMPLATE_NAME];

interface IIndexFileWriteParams {
    directive?: string;
    banner?: string;
    eol: string;
    content: string;
}

interface IIndexRenderData {
    options: {
        quote: string;
        useSemicolon: boolean;
    };
    filePath: string;
    statement: {
        importPath: string;
        extname: {
            origin: string;
            render: string;
        };
        isHasDefault: boolean;
        isHasPartialExclude: boolean;
        default?: IExportStatement;
        named: IExportStatement[];
    };
}

declare function createRenderData(renderCase: CE_AUTO_RENDER_CASE, style: CE_GENERATION_STYLE, option: Pick<IModeGenerateOptions & IModeTsGenerateOptions & IModeBundleOptions, 'fileExt' | 'quote' | 'useSemicolon'>, filePath: string, statement: IIndexRenderData['statement']): {
    case: CE_AUTO_RENDER_CASE;
    style: CE_GENERATION_STYLE;
    renderData: IIndexRenderData;
};

declare function getAutoRenderCase(renderData: IIndexRenderData): {
    case: CE_AUTO_RENDER_CASE;
    style: CE_GENERATION_STYLE;
};

declare function getGenerationStyle(name: string): CE_GENERATION_STYLE;

declare function getInlineDeclarationRenderData(declarations: ReturnType<typeof getInlineCommentedFiles>, options: SetOptional<Pick<TBundleOptions, 'output' | 'fileExt'>, 'output'>): {
    relativePath: string;
    extname: {
        origin: string;
        render: string;
    };
    filePath: string;
    commentCode: string;
    tag: string;
    pos: {
        line: number;
        column: number;
        start: number;
    };
    workspaces?: string[];
}[];

declare function getModuleRenderData(option: Pick<IModeGenerateOptions & IModeBundleOptions, 'project' | 'quote' | 'useSemicolon'>, filePath: string, output: string): Promise<IIndexRenderData | undefined>;

declare function getRenderData(option: Pick<IModeGenerateOptions & IModeTsGenerateOptions & IModeBundleOptions, 'fileExt' | 'quote' | 'useSemicolon'>, filePath: string, statements: IExportStatement[], output?: string): IIndexRenderData | undefined;

declare function getSelectStyle(params: {
    comment?: IStatementComments;
    options: {
        style: CE_GENERATION_STYLE;
    };
    renderData: IIndexRenderData;
}): ReturnType<typeof getAutoRenderCase>;

declare class TemplateContainer {
    #private;
    static get it(): TemplateContainer;
    static get isBootstrap(): boolean;
    static getDefaultTemplate(): Map<string, string>;
    static load(templatePath?: string): Promise<Map<string, string>>;
    static bootstrap(templatePath?: string): Promise<void>;
    static getTemplateFileNames(basePath: string, templateName: string): string;
    static readFiles(basePath: string): Promise<{
        indexFile: string;
        options: string;
        nestedOptions: string;
        moduleIndexFile: string;
        declarationFile: string;
        defaultAliasNamedStar: string;
        defaultAliasNamedDestructive: string;
        defaultNonAliasNamedDestructive: string;
        defaultStarNamedStar: string;
        defaultStarNamedDestructive: string;
    }>;
    static evaluate<T extends object>(name: string, data: T, option?: ConstructorParameters<typeof Eta>[0]): Promise<string>;
    constructor(args: {
        templatePath?: string;
        templates: Map<string, string>;
    });
    get templatePath(): string | undefined;
    etaResolvePath(templatePath: string): string;
    etaReadFile(templatePath: string): string;
    evaluate<T extends object>(name: string, data: T, option?: ConstructorParameters<typeof Eta>[0]): Promise<string>;
}

declare const declarationFileTemplate = "\n<%- it.declarations.forEach((declaration) => { -%>\nimport <%-= it.options.quote %><%= declaration.relativePath %><%= declaration.extname.render %><%= it.options.quote -%>\n\n<%- }) %>\n";

declare const defaultAliasNamedDestructiveDefaultTemplate = "\n<%- if (it.statement.default != null && it.statement.named.length > 0) { -%>\n\n  export { <%= it.statement.default.isPureType ? 'type ' : '' %>default as <%= it.statement.default.identifier.alias %>, <%= it.statement.named.map((named) => (named.isPureType ? 'type ' + named.identifier.name : named.identifier.name)).join(', ') %> } from<%= \" \" %>\n  <%-= it.options.quote %><%= it.statement.importPath %><%= it.statement.extname.render %><%= it.options.quote -%>\n  <%- if (it.options.useSemicolon) { -%><%-= \";\" -%><%- } -%>\n\n<%- } else if (it.statement.default != null) { -%>\n\n  export { <%= it.statement.default.isPureType ? 'type ' : '' %>default as <%= it.statement.default.identifier.alias %> } from<%= \" \" %>\n  <%-= it.options.quote %><%= it.statement.importPath %><%= it.statement.extname.render %><%= it.options.quote %>\n  <%- if (it.options.useSemicolon) { -%><%-= \";\" -%><%- } -%>\n\n<% } else if (it.statement.named.length > 0) { -%>\n\n  export { <%= it.statement.named.map((named) => (named.isPureType ? 'type ' + named.identifier.name : named.identifier.name)).join(', ') %> } from<%= \" \" %>\n  <%-= it.options.quote %><%= it.statement.importPath %><%= it.statement.extname.render %><%= it.options.quote %>\n  <%- if (it.options.useSemicolon) { -%><%-= \";\" -%><%- } -%>\n\n<% } else { %>\n<% } -%>\n";

declare const defaultAliasNamedStarDefaultTemplate = "\n<%- if (it.statement.default != null && it.statement.named.length > 0) { -%>\n\n  export { <%= it.statement.default.isPureType ? 'type ' : '' %>default as <%= it.statement.default.identifier.alias %> } from<%= \" \" %>\n  <%-= it.options.quote %><%= it.statement.importPath %><%= it.statement.extname.render %><%= it.options.quote %>\n  <%- if (it.options.useSemicolon) { -%><%-= \";\\n\" -%><%- } else { -%><%-= \"\\n\" -%><%- } -%>\n  export * from <%= it.options.quote %><%= it.statement.importPath %><%= it.statement.extname.render %><%= it.options.quote %>\n  <%- if (it.options.useSemicolon) { -%><%-= \";\" -%><%- } -%>\n\n<%- } else if (it.statement.default != null) { -%>\n\n  export { <%= it.statement.default.isPureType ? 'type ' : '' %>default as <%= it.statement.default.identifier.alias %> } from<%= \" \" %>\n  <%-= it.options.quote %><%= it.statement.importPath %><%= it.statement.extname.render %><%= it.options.quote %>\n  <%- if (it.options.useSemicolon) { -%><%-= \";\" -%><%- } -%>\n\n<% } else if (it.statement.named.length > 0) { -%>\n\n  export * from <%-= it.options.quote %><%= it.statement.importPath %><%= it.statement.extname.render %><%= it.options.quote %>\n  <%- if (it.options.useSemicolon) { -%><%-= \";\" -%><%- } -%>\n\n<% } else { %>\n<% } -%>\n";

declare const defaultNonAliasNamedDestructiveDefaultTemplate = "\n<%- if (it.statement.default != null && it.statement.named.length > 0) { -%>\n\n  export { default, <%= it.statement.named.map((named) => (named.isPureType ? 'type ' + named.identifier.name : named.identifier.name)).join(', ') %> } from<%= \" \" %>\n  <%-= it.options.quote %><%= it.statement.importPath %><%= it.statement.extname.render %><%= it.options.quote %>\n  <%- if (it.options.useSemicolon) { -%><%-= \";\" -%><%- } -%>\n\n<%- } else if (it.statement.default != null) { -%>\n\n  export { default } from<%= \" \" %>\n  <%-= it.options.quote %><%= it.statement.importPath %><%= it.statement.extname.render %><%= it.options.quote %>\n  <%- if (it.options.useSemicolon) { -%><%-= \";\" -%><%- } -%>\n\n<% } else if (it.statement.named.length > 0) { -%>\n\n  export { <%= it.statement.named.map((named) => (named.isPureType ? 'type ' + named.identifier.name : named.identifier.name)).join(', ') %> } from<%= \" \" %>\n  <%-= it.options.quote %><%= it.statement.importPath %><%= it.statement.extname.render %><%= it.options.quote %>\n  <%- if (it.options.useSemicolon) { -%><%-= \";\" -%><%- } -%>\n\n<% } else { %>\n<% } -%>\n";

declare const defaultStarNamedDestructiveDefaultTemplate = "\n<%- if (it.statement.default != null && it.statement.named.length > 0) { -%>\n\n  export * from <%-= it.options.quote %><%= it.statement.importPath %><%= it.statement.extname.render %><%= it.options.quote %>\n  <%- if (it.options.useSemicolon) { -%><%-= \";\" -%><%- } -%>\n  export { <%= it.statement.named.map((named) => (named.isPureType ? 'type ' + named.identifier.name : named.identifier.name)).join(', ') %> } from<%= \" \" %>\n  <%-= it.options.quote %><%= it.statement.importPath %><%= it.statement.extname.render %><%= it.options.quote %>\n  <%- if (it.options.useSemicolon) { -%><%-= \";\" -%><%- } -%>\n\n<%- } else if (it.statement.default != null) { -%>\n\n  export * from <%-= it.options.quote %><%= it.statement.importPath %><%= it.statement.extname.render %><%= it.options.quote %>\n  <%- if (it.options.useSemicolon) { -%><%-= \";\" -%><%- } -%>\n\n<% } else if (it.statement.named.length > 0) { -%>\n\n  export { <%= it.statement.named.map((named) => (named.isPureType ? 'type ' + named.identifier.name : named.identifier.name)).join(', ') %> } from<%= \" \" %>\n  <%-= it.options.quote %><%= it.statement.importPath %><%= it.statement.extname.render %><%= it.options.quote %>\n  <%- if (it.options.useSemicolon) { -%><%-= \";\" -%><%- } -%>\n\n<% } else { %>\n<% } -%>\n";

declare const defaultStarNamedStarDefaultTemplate = "\nexport * from <%-= it.options.quote %><%= it.statement.importPath %><%= it.statement.extname.render %><%= it.options.quote %>\n<%- if (it.options.useSemicolon) { -%><%-= \";\" -%><%- } -%>\n";

declare const indexFileDefaultTemplate = "\n<%- if (it.directive != null && it.directive !== '' && it.banner != null) { -%>\n  <%-= it.directive -%>\n  <%-= it.eol -%>\n<%- } else if (it.directive != null && it.directive !== '') { -%>\n  <%-= it.directive -%>\n  <%-= it.eol -%><%-= it.eol -%>\n<%- } -%>\n\n<%- if (it.directive != null && it.directive !== '' && it.banner != null) { -%>\n  <%-= it.banner -%>\n  <%-= it.eol -%><%-= it.eol -%>\n<%- } else if (it.banner != null) { -%>\n  <%-= it.banner -%>\n  <%-= it.eol -%><%-= it.eol -%>\n<%- } -%>\n\n<%-= it.content -%>\n";

declare const moduleIndexFileDefaultTemplate = "\n<% it.datas.forEach((data) => { %>\n  import <%= data.statement.default.identifier.name %> from<%= \" \" %>\n  <%-= it.options.quote %><%= data.statement.importPath %><%-= data.statement.default.identifier.name -%>\n  <%-= data.statement.extname.render %><%-= it.options.quote %>\n  <%- if (it.options.useSemicolon) { -%><%-= \";\" -%><%- } -%>\n<% }); %>\n\n<%= \"\\n\" %>\n<%= \"\\n\" %>\n\nexport {\n  <% it.datas.forEach((data, index) => { %>\n    <%= data.statement.default.identifier.name %><%- if (it.datas.length !== 1 && it.datas.length > index) { -%><%-= \",\" %><% } %>\n  <% }); %>\n}<%- if (it.options.useSemicolon) { -%><%-= \";\" -%><%- } -%>\n";

declare const nestedOptionDefaultTemplate = "\n{\n  <%- if (it.isComment && it.options.mode != null) { -%>\n  // build mode\n  // - create: create an `index.ts` file in each directory\n  // - bundle: bundle all export information in one `index.ts` file\n  <%- } -%>\n  <%- if (it.options.mode != null) { -%>\n  \"mode\": \"<%= it.options.mode %>\",\n  <%- } -%>\n  \n  <%- if (it.isComment && it.options.project != null) { -%>\n  // tsconfig.json path: you must pass path with filename, like this \"./tsconfig.json\"\n  // only work root directory or cli parameter\n  // \n  // @mode all\n  <%- } -%>\n  <%- if (it.options.project != null) { -%>\n  \"project\": \"<%= it.options.project %>\",\n  <%- } -%>\n  \n  <%- if (it.isComment && it.options.exportFilename != null) { -%>\n  // Export filename, if you not pass this field that use \"index.ts\" or \"index.d.ts\"\n  // \n  // @mode create, bundle, remove\n  // @default index.ts\n  <%- } -%>\n  <%- if (it.options.exportFilename != null) { -%>\n  \"exportFilename\": \"<%= it.options.exportFilename %>\",\n  <%- } -%>\n  \n  <%- if (it.addEveryOptions && it.isComment && it.options.useSemicolon != null) { -%>\n  // add ctix comment at first line of creted index.ts file, that remark created from ctix\n  //\n  // @mode create, bundle\n  // @default false\n  <%- } -%>\n  <%- if (it.addEveryOptions && it.options.useSemicolon != null) { -%>\n  \"useSemicolon\": <%= it.options.useSemicolon %>,\n  <%- } -%>\n  \n  <%- if (it.addEveryOptions && it.isComment && it.options.useBanner != null) { -%>\n  // add ctix comment at first line of creted index.ts file, that remark created from ctix\n  //\n  // @mode create, bundle\n  // @default false\n  <%- } -%>\n  <%- if (it.addEveryOptions && it.options.useBanner != null) { -%>\n  \"useBanner\": <%= it.options.useBanner %>,\n  <%- } -%>\n  \n  <%- if (it.addEveryOptions && it.isComment && it.options.useTimestamp != null) { -%>\n  // If specified as true, adds the created date to the top of the `index.ts` file,\n  // this option only works if the `useBanner` option is enabled\n  //\n  // @mode create, bundle\n  // @default false\n  <%- } -%>\n  <%- if (it.addEveryOptions && it.options.useTimestamp != null) { -%>\n  \"useTimestamp\": <%= it.options.useTimestamp %>,\n  <%- } -%>\n  \n  <%- if (it.addEveryOptions && it.isComment && it.options.quote != null) { -%>\n  // quote mark \" or '\n  // @mode create, bundle\n  // \n  // @default '\n  <%- } -%>\n  <%- if (it.addEveryOptions && it.options.quote != null) { -%>\n  \"quote\": \"<%= it.options.quote %>\",\n  <%- } -%>\n\n  <%- if (it.addEveryOptions && it.isComment && it.options.directive != null) { -%>\n  // Use to add a literal like `\"use strict\"` to the top. It will be added before the banner.\n  //\n  // @mode create, bundle\n  <%- } -%>\n  <%- if (it.addEveryOptions && it.options.directive != null) { -%>\n  \"directive\": \"<%= it.options.directive %>\",\n  <%- } -%>\n\n  <%- if (it.addEveryOptions && it.isComment && it.options.fileExt != null) { -%>\n  // keep file extension in export statement path\n  //\n  // if this option set true that see below\n  // export * from './test.ts'\n  //\n  // @mode create, bundle\n  // @default none\n  <%- } -%>\n  <%- if (it.addEveryOptions && it.options.fileExt != null) { -%>\n  \"fileExt\": \"<%= it.options.fileExt %>\",\n  <%- } -%>\n\n  <%- if (it.addEveryOptions && it.isComment && it.options.overwrite != null) { -%>\n  // overwrite each index.ts file\n  // @mode create, bundle\n  // @default false\n  <%- } -%>\n  <%- if (it.addEveryOptions && it.options.overwrite != null) { -%>\n  \"overwrite\": <%= it.options.overwrite %>,\n  <%- } -%>\n\n  <%- if (it.addEveryOptions && it.isComment && it.options.backup != null) { -%>\n  // Create a backup file if the `index.ts` file already exists. \n  // This option only works if the `overwrite` option is enabled.\n  //\n  // @mode create, bundle\n  // @defulat true\n  <%- } -%>\n  <%- if (it.addEveryOptions && it.options.backup != null) { -%>\n  \"backup\": <%= it.options.backup %>,\n  <%- } -%>\n\n  <%- if (it.addEveryOptions && it.isComment && it.options.generationStyle != null) { -%>\n  // When generating the `index.ts` file, decide how you want to generate it\n  //\n  // @mode create, bundle\n  // @default auto\n  <%- } -%>\n  <%- if (it.addEveryOptions && it.options.generationStyle != null) { -%>\n  \"generationStyle\": \"<%= it.options.generationStyle %>\",\n  <%- } -%>\n\n  <%- if (it.isComment && it.options.include != null) { -%>\n  // A list of files to use when generating the index.ts file. If no value is set,\n  // the value of the include setting set in the tsconfig.json file will be used\n  //\n  // @mode create, bundle\n  <%- } -%>\n  <%- if (it.options.include != null) { -%>\n  \"include\": <%= it.options.include %>,\n  <%- } -%>\n\n  <%- if (it.isComment && it.options.exclude != null) { -%>\n  // A list of files to exclude when generating the index.ts file. If no value is set,\n  // the value of the exclude setting set in the tsconfig.json file is used\n  //\n  // @mode create, bundle\n  <%- } -%>\n  <%- if (it.options.exclude != null) { -%>\n  \"exclude\": <%= it.options.exclude %>,\n  <%- } -%>\n\n  <%- if (it.addEveryOptions && it.isComment && it.options.skipEmptyDir != null) { -%>\n  // If `skipEmptyDir` is set to true, an empty directory with no files will not create an `index.ts` file\n  //\n  // @mode create\n  // @default true\n  <%- } -%>\n  <%- if (it.addEveryOptions && it.options.skipEmptyDir != null) { -%>\n  \"skipEmptyDir\": <%= it.options.skipEmptyDir %>,\n  <%- } -%>\n\n  <%- if (it.addEveryOptions && it.isComment && it.options.startFrom != null) { -%>\n  // Specify the starting directory to start creating the `index.ts` file\n  //\n  // @mode create\n  // @default tsconfig.json file directory\n  <%- } -%>\n  <%- if (it.addEveryOptions && it.options.startFrom != null) { -%>\n  \"startFrom\": <%= it.options.startFrom %>,\n  <%- } -%>\n\n  <%- if (it.addEveryOptions && it.isComment && it.options.output != null) { -%>\n  // Output directory. Default value is same project directory\n  // @mode bundle\n  <%- } -%>\n  <%- if (it.addEveryOptions && it.options.output != null) { -%>\n  \"output\": \"<%= it.options.output %>\",\n  <%- } -%>\n\n  <%- if (it.addEveryOptions && it.isComment && it.options.removeBackup != null) { -%>\n  // remove with backup file\n  // @mode remove\n  // @default false\n  <%- } -%>\n  <%- if (it.addEveryOptions && it.options.removeBackup != null) { -%>\n  \"removeBackup\": <%= it.options.removeBackup %>,\n  <%- } -%>\n\n  <%- if (it.addEveryOptions && it.isComment && it.options.forceYes != null) { -%>\n  // answer `yes` to all questions\n  // @mode remove\n  // @default false\n  <%- } -%>\n  <%- if (it.addEveryOptions && it.options.forceYes != null) { -%>\n  \"forceYes\": <%= it.options.forceYes %>,\n  <%- } -%>\n}\n";

declare const optionDefaultTemplate = "\n{\n  <%- if (it.addEveryOptions && it.isComment && it.spinnerStream != null) { -%>\n  // Stream of cli spinner, you can pass stdout or stderr\n  //\n  // @mode all\n  // @default stdout\n  <%- } -%>\n  <%- if (it.addEveryOptions && it.spinnerStream != null) { -%>\n  \"spinnerStream\": \"<%= it.spinnerStream %>\",\n  <%- } -%>\n\n  <%- if (it.addEveryOptions && it.isComment && it.progressStream) { -%>\n  // Stream of cli progress, you can pass stdout or stderr\n  //\n  // @mode all\n  // @default stdout\n  <%- } -%>\n  <%- if (it.addEveryOptions && it.progressStream != null) { -%>\n  \"progressStream\": \"<%= it.progressStream %>\",\n  <%- } -%>\n\n  <%- if (it.addEveryOptions && it.isComment && it.reasonerStream != null) { -%>\n  // Stream of cli reasoner. Reasoner show name conflict error and already exist index.ts file error.\n  // You can pass stdout or stderr\n  //\n  // @mode all\n  // @default stderr\n  <%- } -%>\n  <%- if (it.addEveryOptions && it.reasonerStream != null) { -%>\n  \"reasonerStream\": \"<%= it.reasonerStream %>\",\n  <%- } -%>\n\n  \"options\": [<%= it.options %>]\n}\n";

declare function getString(buf: Buffer | string): string;

declare function readJson5<T = unknown>(buf: Buffer | string): PassFailEither<Error, T>;

declare function readJsonc<T = unknown>(buf: Buffer | string): PassFailEither<Error, T>;

declare function readJsonConfig<T = unknown>(jsonConfigFilePath: string): Promise<T | undefined>;

declare function readYaml<T = unknown>(buf: Buffer | string): PassFailEither<Error, T>;

declare function safeJsonc<T = unknown>(buf: Buffer | string): T | undefined;

declare function posixJoin(...args: string[]): string;

declare function posixRelative(originPath: string, targetPath: string): string;

declare function posixResolve(targetPath: string): string;

export { CE_AUTO_RENDER_CASE, CE_CTIX_BUILD_MODE, CE_CTIX_COMMAND, CE_CTIX_DEFAULT_VALUE, CE_EXTENSION_PROCESSING, CE_GENERATION_STYLE, CE_INLINE_COMMENT_KEYWORD, CE_INLINE_EXCLUDE_KIND, CE_TEMPLATE_NAME, ExcludeContainer, type IChoiceTypeItem, type ICommandInitOptions, type ICommandRemoveOptions, type ICommonModeOptions, type IDeclarationFile, type IDocumentComment, type IExcludeFile, type IExportInfo, type IExportStatement, type IExtendOptions, type IIdentifierWithNode, type IIndexFileWriteParams, type IIndexRenderData, type IInitQuestionAnswer, type IInlineCommentInfo, type IInlineGenerationStyleInfo, type IModeBundleOptions, type IModeCreateOptions, type IModeGenerateOptions, type IModeModuleOptions, type IModeTsGenerateOptions, type IProjectOptions, type IReason, type ISourceFileComments, type IStatementComments, IncludeContainer, ProgressBar, ProjectContainer, Reasoner, Spinner, StatementTable, SymbolTable, type TBundleOptions, type TCommandBuildArgvOptions, type TCommandBuildOptions, type TCommandInitOptions, type TCommandRemoveOptions, type TCreateOptions, type TModuleOptions, type TStreamType, TemplateContainer, addCurrentDirPrefix, addExt, askInitOptions, askInitOverwrite, askRemoveFiles, buildCommand, building, bundling, castConfig, checkOutputFile, createBuildOptions, createRemoveOptions, createRenderData, creating, declarationFileTemplate, defaultAliasNamedDestructiveDefaultTemplate, defaultAliasNamedStarDefaultTemplate, defaultExclude, defaultNonAliasNamedDestructiveDefaultTemplate, defaultStarNamedDestructiveDefaultTemplate, defaultStarNamedStarDefaultTemplate, dfsWalk, endsEol, extensions, filenamify, getAllParentDir, getAutoRenderCase, getBanner, getCheckedValue, getCommand, getCommentKind, getCommentWorkspace, getCommentWorkspaces, getCommentsWithParent, getConfigFilePath, getConfigObject, getConfigValue, getDefaultInitAnswer, getDepth, getEOL, getExportAssignmentMap, getExportStatement, getExportedKind, getExtendOptions, getExtname, getFileScope, getFunctionName, getGenerationStyle, getGlobFiles, getImportStatementExtname, getImportStatementRemoveExtname, getImportStatementReplaceJs, getInlineCommented, getInlineCommentedFiles, getInlineDeclarationRenderData, getInlineStyle, getJsDocComment, getJsDocTag, getModuleRenderData, getNodeComments, getOutputExcludedFiles, getOutputValue, getParentDir, getRatioNumber, getRelativeDepth, getRemoveFileGlobPattern, getRenderData, getSelectStyle, getSourceFileComments, getSourceFileEol, getStatementAlias, getString, getSummaryStatement, getTsExcludeFiles, getTsIncludeFiles, getTsconfigComparer, getTypeScriptConfig, getTypeScriptProject, indexFileDefaultTemplate, indexWrites, initCommand, initializing, isConfigComment, isDeclaration, isDeclarationFile, loadConfig, moduleIndexFileDefaultTemplate, moduling, nestedOptionDefaultTemplate, optionDefaultTemplate, parseConfig, posixJoin, posixRelative, posixResolve, prettifing, readConfigFromFile, readConfigFromPackageJson, readConfigFromTsconfigJson, readJson5, readJsonConfig, readJsonc, readYaml, removeCommand, removing, safeJsonc, setCommandInitOptions, setCommandRemoveOptions, setModeBundleOptions, setModeCreateOptions, setModeGenerateOptions, setProjectOptions, transformBundleMode, transformCreateMode, transformModuleMode, unlinks };
