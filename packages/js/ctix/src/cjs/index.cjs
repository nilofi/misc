"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  CE_AUTO_RENDER_CASE: () => CE_AUTO_RENDER_CASE,
  CE_CTIX_BUILD_MODE: () => CE_CTIX_BUILD_MODE,
  CE_CTIX_COMMAND: () => CE_CTIX_COMMAND,
  CE_CTIX_DEFAULT_VALUE: () => CE_CTIX_DEFAULT_VALUE,
  CE_EXTENSION_PROCESSING: () => CE_EXTENSION_PROCESSING,
  CE_GENERATION_STYLE: () => CE_GENERATION_STYLE,
  CE_INLINE_COMMENT_KEYWORD: () => CE_INLINE_COMMENT_KEYWORD,
  CE_INLINE_EXCLUDE_KIND: () => CE_INLINE_EXCLUDE_KIND,
  CE_TEMPLATE_NAME: () => CE_TEMPLATE_NAME,
  ExcludeContainer: () => ExcludeContainer,
  IncludeContainer: () => IncludeContainer,
  ProgressBar: () => ProgressBar,
  ProjectContainer: () => ProjectContainer,
  Reasoner: () => Reasoner,
  Spinner: () => Spinner,
  StatementTable: () => StatementTable,
  SymbolTable: () => SymbolTable,
  TemplateContainer: () => TemplateContainer,
  addCurrentDirPrefix: () => addCurrentDirPrefix,
  addExt: () => addExt,
  askInitOptions: () => askInitOptions,
  askInitOverwrite: () => askInitOverwrite,
  askRemoveFiles: () => askRemoveFiles,
  buildCommand: () => buildCommand,
  building: () => building,
  bundling: () => bundling,
  castConfig: () => castConfig,
  checkOutputFile: () => checkOutputFile,
  createBuildOptions: () => createBuildOptions,
  createRemoveOptions: () => createRemoveOptions,
  createRenderData: () => createRenderData,
  creating: () => creating,
  declarationFileTemplate: () => declarationFileTemplate,
  defaultAliasNamedDestructiveDefaultTemplate: () => defaultAliasNamedDestructiveDefaultTemplate,
  defaultAliasNamedStarDefaultTemplate: () => defaultAliasNamedStarDefaultTemplate,
  defaultExclude: () => defaultExclude,
  defaultNonAliasNamedDestructiveDefaultTemplate: () => defaultNonAliasNamedDestructiveDefaultTemplate,
  defaultStarNamedDestructiveDefaultTemplate: () => defaultStarNamedDestructiveDefaultTemplate,
  defaultStarNamedStarDefaultTemplate: () => defaultStarNamedStarDefaultTemplate,
  dfsWalk: () => dfsWalk,
  endsEol: () => endsEol,
  extensions: () => extensions,
  filenamify: () => filenamify,
  getAllParentDir: () => getAllParentDir,
  getAutoRenderCase: () => getAutoRenderCase,
  getBanner: () => getBanner,
  getCheckedValue: () => getCheckedValue,
  getCommand: () => getCommand,
  getCommentKind: () => getCommentKind,
  getCommentWorkspace: () => getCommentWorkspace,
  getCommentWorkspaces: () => getCommentWorkspaces,
  getCommentsWithParent: () => getCommentsWithParent,
  getConfigFilePath: () => getConfigFilePath,
  getConfigObject: () => getConfigObject,
  getConfigValue: () => getConfigValue,
  getDefaultInitAnswer: () => getDefaultInitAnswer,
  getDepth: () => getDepth,
  getEOL: () => getEOL,
  getExportAssignmentMap: () => getExportAssignmentMap,
  getExportStatement: () => getExportStatement,
  getExportedKind: () => getExportedKind,
  getExtendOptions: () => getExtendOptions,
  getExtname: () => getExtname,
  getFileScope: () => getFileScope,
  getFunctionName: () => getFunctionName,
  getGenerationStyle: () => getGenerationStyle,
  getGlobFiles: () => getGlobFiles,
  getImportStatementExtname: () => getImportStatementExtname,
  getImportStatementRemoveExtname: () => getImportStatementRemoveExtname,
  getImportStatementReplaceJs: () => getImportStatementReplaceJs,
  getInlineCommented: () => getInlineCommented,
  getInlineCommentedFiles: () => getInlineCommentedFiles,
  getInlineDeclarationRenderData: () => getInlineDeclarationRenderData,
  getInlineStyle: () => getInlineStyle,
  getJsDocComment: () => getJsDocComment,
  getJsDocTag: () => getJsDocTag,
  getModuleRenderData: () => getModuleRenderData,
  getNodeComments: () => getNodeComments,
  getOutputExcludedFiles: () => getOutputExcludedFiles,
  getOutputValue: () => getOutputValue,
  getParentDir: () => getParentDir,
  getRatioNumber: () => getRatioNumber,
  getRelativeDepth: () => getRelativeDepth,
  getRemoveFileGlobPattern: () => getRemoveFileGlobPattern,
  getRenderData: () => getRenderData,
  getSelectStyle: () => getSelectStyle,
  getSourceFileComments: () => getSourceFileComments,
  getSourceFileEol: () => getSourceFileEol,
  getStatementAlias: () => getStatementAlias,
  getString: () => getString,
  getSummaryStatement: () => getSummaryStatement,
  getTsExcludeFiles: () => getTsExcludeFiles,
  getTsIncludeFiles: () => getTsIncludeFiles,
  getTsconfigComparer: () => getTsconfigComparer,
  getTypeScriptConfig: () => getTypeScriptConfig,
  getTypeScriptProject: () => getTypeScriptProject,
  indexFileDefaultTemplate: () => indexFileDefaultTemplate,
  indexWrites: () => indexWrites,
  initCommand: () => initCommand,
  initializing: () => initializing,
  isConfigComment: () => isConfigComment,
  isDeclaration: () => isDeclaration,
  isDeclarationFile: () => isDeclarationFile,
  loadConfig: () => loadConfig,
  moduleIndexFileDefaultTemplate: () => moduleIndexFileDefaultTemplate,
  moduling: () => moduling,
  nestedOptionDefaultTemplate: () => nestedOptionDefaultTemplate,
  optionDefaultTemplate: () => optionDefaultTemplate,
  parseConfig: () => parseConfig,
  posixJoin: () => posixJoin,
  posixRelative: () => posixRelative,
  posixResolve: () => posixResolve,
  prettifing: () => prettifing,
  readConfigFromFile: () => readConfigFromFile,
  readConfigFromPackageJson: () => readConfigFromPackageJson,
  readConfigFromTsconfigJson: () => readConfigFromTsconfigJson,
  readJson5: () => readJson5,
  readJsonConfig: () => readJsonConfig,
  readJsonc: () => readJsonc,
  readYaml: () => readYaml,
  removeCommand: () => removeCommand,
  removing: () => removing,
  safeJsonc: () => safeJsonc,
  setCommandInitOptions: () => setCommandInitOptions,
  setCommandRemoveOptions: () => setCommandRemoveOptions,
  setModeBundleOptions: () => setModeBundleOptions,
  setModeCreateOptions: () => setModeCreateOptions,
  setModeGenerateOptions: () => setModeGenerateOptions,
  setProjectOptions: () => setProjectOptions,
  transformBundleMode: () => transformBundleMode,
  transformCreateMode: () => transformCreateMode,
  transformModuleMode: () => transformModuleMode,
  unlinks: () => unlinks
});
module.exports = __toCommonJS(src_exports);

// src/comments/getCommentKind.ts
var tsm = __toESM(require("ts-morph"));
function getCommentKind(kind) {
  switch (kind) {
    case tsm.SyntaxKind.MultiLineCommentTrivia:
      return tsm.SyntaxKind.MultiLineCommentTrivia;
    default:
      return tsm.SyntaxKind.SingleLineCommentTrivia;
  }
}

// src/comments/getCommentsWithParent.ts
var tsm2 = __toESM(require("ts-morph"));
function getCommentsWithParent(node) {
  if (node.getKind() === tsm2.SyntaxKind.VariableDeclaration) {
    const parent = node.getParent();
    const grandParent = parent?.getParent();
    const parentComments = parent?.getKind() === tsm2.SyntaxKind.VariableDeclarationList ? parent.getLeadingCommentRanges() : [];
    const grandParentComments = grandParent?.getKind() === tsm2.SyntaxKind.VariableStatement ? grandParent.getLeadingCommentRanges() : [];
    return [...grandParentComments, ...parentComments, ...node.getLeadingCommentRanges()];
  }
  return node.getLeadingCommentRanges();
}

// src/comments/getCommentWorkspace.ts
function getCommentWorkspace(workspace) {
  const workspaceTrimed = workspace.trim();
  if (workspaceTrimed.endsWith(",")) {
    return workspaceTrimed.substring(0, workspaceTrimed.length - 1);
  }
  return workspaceTrimed;
}

// src/comments/getCommentWorkspaces.ts
function getCommentWorkspaces(rawWorkspace) {
  if (rawWorkspace == null || rawWorkspace === "") {
    return [];
  }
  return rawWorkspace.split(/\s/).filter((workspace) => workspace != null && workspace !== "").map((workspace) => getCommentWorkspace(workspace));
}

// src/comments/getJsDocComment.ts
var tsm3 = __toESM(require("ts-morph"));
function getJsDocComment(kind, comment) {
  if (kind === tsm3.SyntaxKind.SingleLineCommentTrivia) {
    return `/**${comment.trim().replace(/(\/\/)(\/|)/, "")} */`;
  }
  if (!/^\/\*\*/.test(comment.trim())) {
    return comment.trim().replace(/\/\*/, "/**");
  }
  return comment;
}

// src/comments/getJsDocTag.ts
function getJsDocTag(tag) {
  if (tag.trim().startsWith("@")) {
    return tag.trim().substring(1);
  }
  return tag.trim();
}

// src/comments/getInlineCommented.ts
var import_comment_parser = require("comment-parser");
function getInlineCommented(params) {
  const content = params.comment.range;
  const refined = getJsDocComment(params.comment.kind, content);
  const blocks = (0, import_comment_parser.parse)(refined);
  const block = blocks.at(0);
  if (block == null) {
    return void 0;
  }
  const tag = block.tags.find((element) => element.tag === getJsDocTag(params.options.keyword));
  if (tag?.tag === params.options.keyword || tag?.tag === params.options.keyword.substring(1)) {
    return {
      commentCode: content,
      filePath: params.comment.filePath,
      pos: params.comment.pos,
      tag: tag.tag,
      workspaces: getCommentWorkspaces([tag.name ?? "", tag.description ?? ""].join(" "))
    };
  }
  return void 0;
}

// src/compilers/getExportAssignmentMap.ts
var tsm4 = __toESM(require("ts-morph"));
function getExportAssignmentMap(sourceFile) {
  const exportAssignments = sourceFile.getExportAssignments();
  const exportAssignmentMap = exportAssignments.map((exportAssignment) => {
    const exportAssignmentName = exportAssignment.getChildren().map((node) => {
      const name = node.getKind() === tsm4.SyntaxKind.Identifier ? node.getText().trim() : void 0;
      return name;
    }).filter((name) => name != null).at(0);
    return { node: exportAssignment, name: exportAssignmentName ?? "__default" };
  }).reduce((aggregation, node) => {
    aggregation.set(node.name, node.node);
    return aggregation;
  }, /* @__PURE__ */ new Map());
  return exportAssignmentMap;
}

// src/comments/getNodeComments.ts
function getNodeComments(node, identifier) {
  const start = node.getStart();
  const lineAndPos = node.getSourceFile().getLineAndColumnAtPos(start);
  const exportAssignmentMap = getExportAssignmentMap(node.getSourceFile());
  const exportAssignment = identifier != null ? exportAssignmentMap.get(identifier) : void 0;
  const leadingComment = exportAssignment != null ? getCommentsWithParent(exportAssignment) : getCommentsWithParent(node);
  if (leadingComment != null && leadingComment.length > 0) {
    return leadingComment.map((range) => {
      const kind = getCommentKind(range.getKind());
      return {
        pos: { start, ...lineAndPos },
        range: range.getText(),
        filePath: node.getSourceFile().getFilePath().toString(),
        kind
      };
    });
  }
  return [];
}

// src/comments/getSourceFileComments.ts
function getSourceFileComments(sourceFile) {
  const comments = [];
  sourceFile.forEachChild((node) => {
    comments.push(...getNodeComments(node));
  });
  return {
    filePath: sourceFile.getFilePath().toString(),
    comments
  };
}

// src/comments/getInlineCommentedFiles.ts
function getInlineCommentedFiles(params) {
  const excluded = params.filePaths.map((filePath) => params.project.getSourceFile(filePath)).filter((sourceFile) => sourceFile != null).map((sourceFile) => {
    const sourceFileComment = getSourceFileComments(sourceFile);
    const fileExcludeComment = sourceFileComment.comments.map((comment) => getInlineCommented({ comment, options: { keyword: params.keyword } })).filter((comment) => comment != null);
    const firstExcludeComment = fileExcludeComment.at(0);
    return {
      filePath: sourceFile.getFilePath().toString(),
      fileExcludeComment,
      firstExcludeComment,
      excluded: firstExcludeComment != null
    };
  }).filter(
    (exclude) => exclude.firstExcludeComment != null && exclude.excluded
  ).map((exclude) => {
    return {
      ...exclude.firstExcludeComment,
      filePath: exclude.filePath
    };
  });
  return excluded;
}

// src/configs/const-enum/CE_GENERATION_STYLE.ts
var CE_GENERATION_STYLE = {
  AUTO: "auto",
  DEFAULT_ALIAS_NAMED_STAR: "default-alias-named-star",
  DEFAULT_ALIAS_NAMED_DESTRUCTIVE: "default-alias-named-destructive",
  DEFAULT_NON_ALIAS_NAMED_DESTRUCTIVE: "default-non-alias-named-destructive",
  DEFAULT_STAR_NAMED_STAR: "default-star-named-star",
  DEFAULT_STAR_NAMED_DESTRUCTIVE: "default-star-named-destructive"
};

// src/templates/modules/getGenerationStyle.ts
function getGenerationStyle(name) {
  switch (name) {
    case CE_GENERATION_STYLE.DEFAULT_ALIAS_NAMED_DESTRUCTIVE:
      return CE_GENERATION_STYLE.DEFAULT_ALIAS_NAMED_DESTRUCTIVE;
    case CE_GENERATION_STYLE.DEFAULT_ALIAS_NAMED_STAR:
      return CE_GENERATION_STYLE.DEFAULT_ALIAS_NAMED_STAR;
    case CE_GENERATION_STYLE.DEFAULT_NON_ALIAS_NAMED_DESTRUCTIVE:
      return CE_GENERATION_STYLE.DEFAULT_NON_ALIAS_NAMED_DESTRUCTIVE;
    case CE_GENERATION_STYLE.DEFAULT_STAR_NAMED_DESTRUCTIVE:
      return CE_GENERATION_STYLE.DEFAULT_STAR_NAMED_DESTRUCTIVE;
    case CE_GENERATION_STYLE.DEFAULT_STAR_NAMED_STAR:
      return CE_GENERATION_STYLE.DEFAULT_STAR_NAMED_STAR;
    default:
      return CE_GENERATION_STYLE.AUTO;
  }
}

// src/comments/getInlineStyle.ts
var import_comment_parser2 = require("comment-parser");
function getInlineStyle(params) {
  const content = params.comment.range;
  const refined = getJsDocComment(params.comment.kind, content);
  const blocks = (0, import_comment_parser2.parse)(refined);
  const block = blocks.at(0);
  if (block == null) {
    return void 0;
  }
  const tag = block.tags.find((element) => element.tag === getJsDocTag(params.options.keyword));
  if (tag?.tag === params.options.keyword || tag?.tag === params.options.keyword.substring(1)) {
    return {
      commentCode: params.comment.range,
      filePath: params.comment.filePath,
      style: getGenerationStyle(tag.name),
      pos: params.comment.pos,
      workspaces: getCommentWorkspaces(tag.description ?? "")
    };
  }
  return void 0;
}

// src/comments/getOutputExcludedFiles.ts
var import_my_easy_fp = require("my-easy-fp");
var import_my_node_fp = require("my-node-fp");
var import_pathe = __toESM(require("pathe"));
async function getOutputExcludedFiles(params) {
  const outputDirPaths = await Promise.all(
    params.filePaths.map((filePath) => params.project.getSourceFile(filePath)).filter((sourceFile) => sourceFile != null).map(async (sourceFile) => {
      const filePath = sourceFile.getFilePath().toString();
      const dirPath = await (0, import_my_node_fp.getDirname)(filePath);
      return dirPath;
    })
  );
  const outputFiles = (0, import_my_easy_fp.settify)(outputDirPaths).map(
    (dirPath) => import_pathe.default.join(dirPath, params.exportFilename)
  );
  return outputFiles;
}

// src/compilers/getFunctionName.ts
var tsm5 = __toESM(require("ts-morph"));
function getFunctionName(kind, name) {
  if (kind === tsm5.SyntaxKind.ArrowFunction) {
    if (name !== "__function" && name != null) {
      return name;
    }
    return void 0;
  }
  if (kind === tsm5.SyntaxKind.FunctionDeclaration) {
    if (name != null) {
      return name;
    }
    return void 0;
  }
  return void 0;
}

// src/compilers/getExportedKind.ts
var tsm6 = __toESM(require("ts-morph"));
var import_ts_pattern = require("ts-pattern");
function getExportedKind(node) {
  const kind = node.getKind();
  return (0, import_ts_pattern.match)(kind).with(tsm6.SyntaxKind.ClassDeclaration, () => {
    return {
      name: node.asKindOrThrow(tsm6.SyntaxKind.ClassDeclaration).getNameOrThrow().toString(),
      kind: tsm6.SyntaxKind.ClassDeclaration,
      isPureType: false
    };
  }).with(tsm6.SyntaxKind.VariableDeclaration, () => {
    const variableDeclarationNode = node.asKindOrThrow(tsm6.SyntaxKind.VariableDeclaration);
    return {
      name: variableDeclarationNode.getName(),
      kind: tsm6.SyntaxKind.VariableDeclaration,
      isPureType: false
    };
  }).with(tsm6.SyntaxKind.ArrowFunction, () => {
    const arrowFunctionNode = node.asKindOrThrow(tsm6.SyntaxKind.ArrowFunction);
    const name = arrowFunctionNode.getSymbolOrThrow().getEscapedName();
    return {
      name: getFunctionName(tsm6.SyntaxKind.ArrowFunction, name),
      kind: tsm6.SyntaxKind.ArrowFunction,
      isPureType: false
    };
  }).with(tsm6.SyntaxKind.FunctionDeclaration, () => {
    const functionDeclarationNode = node.asKindOrThrow(tsm6.SyntaxKind.FunctionDeclaration);
    const name = functionDeclarationNode.getName();
    return {
      name: getFunctionName(tsm6.SyntaxKind.FunctionDeclaration, name),
      kind: tsm6.SyntaxKind.FunctionDeclaration,
      isPureType: false
    };
  }).with(tsm6.SyntaxKind.InterfaceDeclaration, () => {
    const interfaceDeclarationNode = node.asKindOrThrow(tsm6.SyntaxKind.InterfaceDeclaration);
    const name = interfaceDeclarationNode.getName();
    return {
      name,
      kind: tsm6.SyntaxKind.InterfaceDeclaration,
      isPureType: true
    };
  }).with(tsm6.SyntaxKind.TypeAliasDeclaration, () => {
    const typeAliasDeclarationNode = node.asKindOrThrow(tsm6.SyntaxKind.TypeAliasDeclaration);
    const name = typeAliasDeclarationNode.getName();
    return {
      name,
      kind: tsm6.SyntaxKind.TypeAliasDeclaration,
      isPureType: true
    };
  }).with(tsm6.SyntaxKind.EnumDeclaration, () => {
    const enumDeclarationNode = node.asKindOrThrow(tsm6.SyntaxKind.EnumDeclaration);
    const name = enumDeclarationNode.getName();
    return {
      name,
      kind: tsm6.SyntaxKind.EnumDeclaration,
      isPureType: false
    };
  }).with(tsm6.SyntaxKind.ArrayLiteralExpression, () => {
    return {
      name: void 0,
      kind: tsm6.SyntaxKind.ArrayLiteralExpression,
      isPureType: false
    };
  }).with(tsm6.SyntaxKind.ObjectLiteralExpression, () => {
    return {
      name: void 0,
      kind: tsm6.SyntaxKind.ObjectLiteralExpression,
      isPureType: false
    };
  }).with(tsm6.SyntaxKind.BindingElement, () => {
    const bindingElementNode = node.asKindOrThrow(tsm6.SyntaxKind.BindingElement);
    const name = bindingElementNode.getName();
    return {
      name,
      kind: tsm6.SyntaxKind.BindingElement,
      isPureType: false
    };
  }).with(tsm6.SyntaxKind.CallExpression, () => {
    return {
      name: void 0,
      kind: tsm6.SyntaxKind.CallExpression,
      isPureType: false
    };
  }).with(tsm6.SyntaxKind.NewExpression, () => {
    return {
      name: void 0,
      kind: tsm6.SyntaxKind.NewExpression,
      isPureType: false
    };
  }).with(tsm6.SyntaxKind.ModuleDeclaration, () => {
    const moduleDeclarationNode = node.asKindOrThrow(tsm6.SyntaxKind.ModuleDeclaration);
    const name = moduleDeclarationNode.getName();
    return {
      name,
      kind: tsm6.SyntaxKind.ModuleDeclaration,
      isPureType: false
    };
  }).with(tsm6.SyntaxKind.SourceFile, () => {
    return {
      name: void 0,
      kind: tsm6.SyntaxKind.SourceFile,
      isPureType: false
    };
  }).otherwise(() => {
    throw new Error(`Cannot support type: (${node.getKind()}) ${node.getText()}`);
  });
}

// src/comments/const-enum/CE_INLINE_COMMENT_KEYWORD.ts
var CE_INLINE_COMMENT_KEYWORD = {
  FILE_EXCLUDE_KEYWORD: "@ctix-exclude",
  FILE_DECLARATION_KEYWORD: "@ctix-declaration",
  NEXT_STATEMENT_EXCLUDE_KEYWORD: "@ctix-exclude-next",
  FILE_GENERATION_STYLE_KEYWORD: "@ctix-generation-style"
};

// src/compilers/getStatementAlias.ts
function getStatementAlias({
  alias,
  isDefault,
  filenamified,
  kind
}) {
  if (isDefault && kind.name != null) {
    return kind.name;
  }
  if (alias != null) {
    return alias;
  }
  return filenamified;
}

// src/modules/path/extensions.ts
var extensions = [".ts", ".tsx", ".d.ts", ".cts", ".d.cts", ".mts", ".d.mts"];

// src/modules/path/getExtname.ts
var import_node_path = __toESM(require("path"));
function getExtname(filePath) {
  if (extensions.every((extension) => filePath.endsWith(extension) === false)) {
    return import_node_path.default.extname(filePath);
  }
  if (filePath.endsWith(".d.ts")) {
    return ".d.ts";
  }
  if (filePath.endsWith(".d.cts")) {
    return ".d.cts";
  }
  if (filePath.endsWith(".d.mts")) {
    return ".d.mts";
  }
  return import_node_path.default.extname(filePath);
}

// src/modules/path/filenamify.ts
var import_change_case = require("change-case");
var import_filenamify = __toESM(require("filenamify"));
var import_node_path2 = __toESM(require("path"));
function filenamify(filename) {
  const basename2 = import_node_path2.default.basename(filename, getExtname(filename));
  if (/^([A-Z])(.+)/.test(basename2)) {
    const camel = (0, import_change_case.camelCase)(basename2);
    const upperFirstCase = camel.charAt(0).toUpperCase() + camel.slice(1);
    return (0, import_filenamify.default)(upperFirstCase);
  }
  const raw = (0, import_change_case.camelCase)(basename2);
  return (0, import_filenamify.default)(raw);
}

// src/modules/path/modules/posixRelative.ts
var import_my_node_fp2 = require("my-node-fp");
var path3 = __toESM(require("path"));
function posixRelative(originPath, targetPath) {
  return (0, import_my_node_fp2.replaceSepToPosix)(path3.relative(originPath, targetPath));
}

// src/modules/path/getRelativeDepth.ts
var import_node_path3 = __toESM(require("path"));
function getRelativeDepth(basePath, dirPath) {
  if (basePath == null) {
    throw new Error("[getRelativeDepth] basePaths is empty array");
  }
  const relativePath = posixRelative(basePath, dirPath);
  if (relativePath === "") {
    return 0;
  }
  const depth = relativePath.split(import_node_path3.default.posix.sep);
  return depth.length;
}

// src/compilers/getSummaryStatement.ts
function getSummaryStatement(params) {
  const kind = getExportedKind(params.node);
  const filenamified = filenamify(params.path.filename);
  const identifier = params.identifier ?? kind.name ?? filenamified;
  const comments = getNodeComments(params.node, params.identifier).map(
    (comment) => getInlineCommented({
      comment,
      options: {
        keyword: CE_INLINE_COMMENT_KEYWORD.NEXT_STATEMENT_EXCLUDE_KEYWORD
      }
    })
  ).filter((comment) => comment != null);
  const pos = params.node.getSourceFile().getLineAndColumnAtPos(params.node.getStart(false));
  return {
    path: params.path,
    depth: getRelativeDepth(params.project, params.path.dirPath),
    pos,
    identifier: {
      name: identifier,
      alias: getStatementAlias({
        kind,
        filenamified,
        alias: params.alias,
        isDefault: params.isDefault
      })
    },
    isPureType: kind.isPureType,
    isAnonymous: kind.name == null,
    isDefault: params.isDefault ?? false,
    isExcluded: comments.length > 0,
    comments
  };
}

// src/modules/path/modules/posixResolve.ts
var import_my_node_fp3 = require("my-node-fp");
var path5 = __toESM(require("path"));
function posixResolve(targetPath) {
  return (0, import_my_node_fp3.replaceSepToPosix)(path5.resolve(targetPath));
}

// src/compilers/getExportStatement.ts
var import_my_node_fp4 = require("my-node-fp");
var import_node_path4 = __toESM(require("path"));
var tsm7 = __toESM(require("ts-morph"));
async function getExportStatement(sourceFile, option, extendOptions) {
  const dirPath = posixResolve(await (0, import_my_node_fp4.getDirname)(sourceFile.getFilePath().toString()));
  const filename = (0, import_my_node_fp4.startSepRemove)(
    (0, import_my_node_fp4.replaceSepToPosix)(sourceFile.getFilePath().toString().replace(dirPath, "")),
    import_node_path4.default.posix.sep
  );
  const relativePath = posixRelative(await (0, import_my_node_fp4.getDirname)(option.project), dirPath);
  const exportedDeclarationsMap = sourceFile.getExportedDeclarations();
  const defaultExportedDeclarations = exportedDeclarationsMap.get("default")?.at(0);
  const defaultExportedName = defaultExportedDeclarations != null ? [
    getSummaryStatement({
      path: { filename, dirPath, relativePath },
      identifier: "default",
      node: defaultExportedDeclarations,
      eol: extendOptions.eol,
      project: option.project,
      isDefault: true
    })
  ] : [];
  const namedExports = Array.from(exportedDeclarationsMap.entries()).filter(([identifier]) => identifier !== "default").map((exportedDeclarationsWithKey) => {
    const [exportedDeclarationKey, exportedDeclarations] = exportedDeclarationsWithKey;
    const [exportedDeclaration] = exportedDeclarations;
    const kind = getExportedKind(exportedDeclaration);
    if (exportedDeclaration.getKind() === tsm7.SyntaxKind.ModuleDeclaration && kind.name != null) {
      return getSummaryStatement({
        path: { filename, dirPath, relativePath },
        identifier: exportedDeclarationKey,
        node: exportedDeclaration,
        project: option.project,
        eol: extendOptions.eol,
        isDefault: false
      });
    }
    if (exportedDeclaration.getKind() === tsm7.SyntaxKind.SourceFile) {
      return getSummaryStatement({
        path: { filename, dirPath, relativePath },
        identifier: exportedDeclarationKey,
        node: exportedDeclaration,
        project: option.project,
        eol: extendOptions.eol,
        isDefault: false
      });
    }
    return getSummaryStatement({
      path: { filename, dirPath, relativePath },
      node: exportedDeclaration,
      identifier: exportedDeclarationKey,
      alias: kind.name !== exportedDeclarationKey && kind.name != null ? kind.name : void 0,
      project: option.project,
      eol: extendOptions.eol,
      isDefault: false
    });
  });
  return [...defaultExportedName, ...namedExports];
}

// src/compilers/getFileScope.ts
function getFileScope(tsconfig) {
  const getInclude = () => {
    if (typeof tsconfig === "object" && tsconfig != null && "include" in tsconfig && tsconfig.include != null) {
      return tsconfig.include;
    }
    return [];
  };
  const getExclude = () => {
    if (typeof tsconfig === "object" && tsconfig != null && "exclude" in tsconfig && tsconfig.exclude != null) {
      return tsconfig.exclude;
    }
    return [];
  };
  return {
    include: getInclude(),
    exclude: getExclude()
  };
}

// src/compilers/getTypeScriptConfig.ts
var import_node_path5 = __toESM(require("path"));
var tsm8 = __toESM(require("ts-morph"));
function getTypeScriptConfig(project) {
  const resolvedProjectPath = import_node_path5.default.resolve(project);
  const parseConfigHost = {
    fileExists: tsm8.ts.sys.fileExists.bind(tsm8.ts),
    readFile: tsm8.ts.sys.readFile.bind(tsm8.ts),
    readDirectory: tsm8.ts.sys.readDirectory.bind(tsm8.ts),
    useCaseSensitiveFileNames: true
  };
  const configFile = tsm8.ts.readConfigFile(resolvedProjectPath, tsm8.ts.sys.readFile.bind(tsm8.ts));
  const tsconfig = tsm8.ts.parseJsonConfigFileContent(
    configFile.config,
    parseConfigHost,
    import_node_path5.default.dirname(resolvedProjectPath)
  );
  return tsconfig;
}

// src/compilers/getTypeScriptProject.ts
var tsm9 = __toESM(require("ts-morph"));
function getTypeScriptProject(projectOption) {
  const project = new tsm9.Project(projectOption);
  return project;
}

// src/compilers/isDeclaration.ts
var tsm10 = __toESM(require("ts-morph"));
var declarationKindMap = /* @__PURE__ */ new Map([
  [tsm10.SyntaxKind.ModuleDeclaration, true]
]);
function isDeclaration(statement) {
  const result = declarationKindMap.get(statement);
  if (result != null) {
    return result;
  }
  return false;
}

// src/compilers/isDeclarationFile.ts
function isDeclarationFile(sourceFile) {
  const statements = sourceFile.getStatements().map((child) => {
    return {
      kind: child.getKind(),
      kindName: child.getKindName(),
      text: child.getText(),
      isDeclaration: isDeclaration(child.getKind())
    };
  });
  return statements.some((statement) => statement.isDeclaration);
}

// src/compilers/StatementTable.ts
var import_chalk = __toESM(require("chalk"));
var import_pathe2 = __toESM(require("pathe"));
var _table;
var _StatementTable = class _StatementTable {
  constructor() {
    __privateAdd(this, _table, void 0);
    __privateSet(this, _table, /* @__PURE__ */ new Map());
  }
  static key(statement) {
    if (typeof statement === "string") {
      return statement;
    }
    const tableKey = statement.isDefault ? statement.identifier.alias : statement.identifier.name;
    return tableKey;
  }
  select(key) {
    return __privateGet(this, _table).get(_StatementTable.key(key)) ?? [];
  }
  selects() {
    return Array.from(__privateGet(this, _table).values());
  }
  insert(statement) {
    const key = _StatementTable.key(statement);
    const prev = __privateGet(this, _table).get(key);
    if (prev == null) {
      __privateGet(this, _table).set(key, [statement]);
    } else {
      __privateGet(this, _table).set(key, [...prev, statement]);
    }
  }
  inserts(statements) {
    statements.forEach((statement) => this.insert(statement));
  }
  isDuplicate(statement) {
    const prev = __privateGet(this, _table).get(_StatementTable.key(statement));
    if (prev == null) {
      return false;
    }
    return prev.length > 1;
  }
  isDuplicateFromSecond(statement) {
    const prev = __privateGet(this, _table).get(_StatementTable.key(statement));
    const first = prev?.at(0);
    if (prev == null || first == null) {
      return false;
    }
    const prevStatementKey = `${import_pathe2.default.join(first.path.dirPath, first.path.filename)}::${first.identifier.alias}`;
    const nextStatementKey = `${import_pathe2.default.join(statement.path.dirPath, statement.path.filename)}::${statement.identifier.alias}`;
    if (prevStatementKey === nextStatementKey) {
      return false;
    }
    return prev.length > 1;
  }
  getDuplicateReason() {
    const reasons = Array.from(__privateGet(this, _table).entries()).map(([identifier, statements]) => ({
      identifier,
      statements
    })).filter((symbols) => symbols.statements.length > 1).map((symbols) => {
      return symbols.statements.map((statement) => {
        if (statement.isDefault) {
          const reason2 = {
            type: "warn",
            lineAndCharacter: { line: statement.pos.line, character: statement.pos.column },
            filePath: import_pathe2.default.join(statement.path.dirPath, statement.path.filename),
            message: `detect same name of default export statement: "${import_chalk.default.yellow(
              _StatementTable.key(statement)
            )}"`
          };
          return reason2;
        }
        const reason = {
          type: "warn",
          lineAndCharacter: { line: statement.pos.line, character: statement.pos.column },
          filePath: import_pathe2.default.join(statement.path.dirPath, statement.path.filename),
          message: `detect same name of export statement: "${import_chalk.default.yellow(
            _StatementTable.key(statement)
          )}"`
        };
        return reason;
      });
    }).flat();
    return reasons;
  }
};
_table = new WeakMap();
var StatementTable = _StatementTable;

// src/compilers/SymbolTable.ts
var _table2;
var SymbolTable = class {
  constructor(sourceFile) {
    __privateAdd(this, _table2, void 0);
    const nodes = [];
    sourceFile.forEachChild((node) => {
      const pos = node.getStart();
      nodes.push([pos, node]);
    });
    __privateSet(this, _table2, new Map(nodes));
  }
  get table() {
    return __privateGet(this, _table2);
  }
  getByPos(pos) {
    return __privateGet(this, _table2).get(pos);
  }
};
_table2 = new WeakMap();

// src/configs/const-enum/CE_CTIX_COMMAND.ts
var CE_CTIX_COMMAND = {
  BUILD_COMMAND: "build",
  BUILD_COMMAND_ALIAS: "b",
  REMOVE_COMMAND: "remove",
  REMOVE_COMMAND_ALIAS: "r",
  INIT_COMMAND: "init",
  INIT_COMMAND_ALIAS: "i"
};

// src/configs/castConfig.ts
function castConfig(command, config, paths) {
  switch (command) {
    case CE_CTIX_COMMAND.BUILD_COMMAND:
      return {
        ...config,
        from: paths.from,
        p: paths.tsconfig,
        project: paths.tsconfig,
        c: paths.config,
        config: paths.config
      };
    case CE_CTIX_COMMAND.REMOVE_COMMAND:
      return {
        ...config,
        from: paths.from,
        p: paths.tsconfig,
        project: paths.tsconfig,
        c: paths.config,
        config: paths.config
      };
    default:
      return {
        from: paths.from,
        p: paths.tsconfig,
        project: paths.tsconfig,
        c: paths.config,
        config: paths.config,
        exportFilename: "index.ts",
        "export-filename": "index.ts",
        spinnerStream: "stderr",
        "spinner-stream": "stderr",
        progressStream: "stderr",
        "progress-stream": "stderr",
        reasonerStream: "stderr",
        "reasoner-stream": "stderr"
      };
  }
}

// src/configs/getConfigObject.ts
function getConfigObject(argv, ...keywordArgs) {
  const keywords = [...keywordArgs];
  const keys = keywords.filter((keyword) => keyword in argv && argv[keyword] != null);
  if (keys.length <= 0) {
    return void 0;
  }
  const aggregated = keys.reduce((obj, key) => {
    return { ...obj, [key]: argv[key] };
  }, {});
  return aggregated;
}

// src/configs/getConfigValue.ts
var import_my_easy_fp2 = require("my-easy-fp");
function getConfigValue(argv, ...keywordArgs) {
  const keywords = [...keywordArgs];
  if (keywords.length <= 0) {
    return void 0;
  }
  const keys = keywords.find((keyword) => keyword in argv && typeof argv[keyword] === "string");
  const key = (0, import_my_easy_fp2.atOrUndefined)(keys, 0);
  if (key != null && key in argv && argv[key] != null) {
    const value = argv[key];
    return value;
  }
  return void 0;
}

// src/configs/modules/getSourceFileEol.ts
var import_node_fs = __toESM(require("fs"));
var import_node_os = __toESM(require("os"));
function getEOL(text) {
  const eolMatched = text.match(/\r\n|\n/g);
  if (eolMatched == null) {
    return import_node_os.default.EOL;
  }
  const numOfNl = eolMatched.filter((eol) => eol === "\n").length;
  const numOfCr = eolMatched.length - numOfNl;
  if (numOfNl === numOfCr) {
    return import_node_os.default.EOL;
  }
  return numOfNl > numOfCr ? "\n" : "\r\n";
}
async function getSourceFileEol(sourceFiles) {
  const eols = (await Promise.all(
    sourceFiles.map(async (srouceFile) => {
      try {
        const buf = await import_node_fs.default.promises.readFile(srouceFile);
        const eol = getEOL(buf.toString());
        return eol;
      } catch {
        return void 0;
      }
    })
  )).filter((eol) => eol != null);
  const eolRecord = eols.reduce((aggregated, eol) => {
    return { ...aggregated, [eol]: (aggregated[eol] ?? 0) + 1 };
  }, {});
  const eolWithWeight = Object.entries(eolRecord).reduce(
    (max, eolPair) => {
      const [eolCharacter, weight] = eolPair;
      if (max.weight < (weight ?? Number.MIN_SAFE_INTEGER)) {
        return { eol: eolCharacter, weight };
      }
      return max;
    },
    {
      eol: import_node_os.default.EOL,
      weight: Number.MIN_SAFE_INTEGER
    }
  );
  return eolWithWeight.eol;
}

// src/modules/path/getDepth.ts
var import_my_node_fp5 = require("my-node-fp");
var import_node_path6 = __toESM(require("path"));
function getDepth(dirPath) {
  const sepReplaced = (0, import_my_node_fp5.replaceSepToPosix)(dirPath);
  const depth = sepReplaced.split(import_node_path6.default.posix.sep);
  return depth.length;
}

// src/configs/getExtendOptions.ts
var import_my_easy_fp3 = require("my-easy-fp");
var import_my_node_fp6 = require("my-node-fp");
async function getExtendOptions(project) {
  const projectPath = posixResolve(project);
  const tsconfig = getTypeScriptConfig(projectPath);
  const resolvedProjectDirPath = (0, import_my_node_fp6.replaceSepToPosix)(await (0, import_my_node_fp6.getDirname)(projectPath));
  const filePaths = tsconfig.fileNames.filter(
    (filePath) => (0, import_my_node_fp6.isDescendant)(resolvedProjectDirPath, filePath)
  );
  const topDirDepth = (await Promise.all(
    filePaths.map(async (filePath) => {
      const dirPath = (0, import_my_node_fp6.replaceSepToPosix)(posixResolve(await (0, import_my_node_fp6.getDirname)(filePath)));
      return {
        filePaths: [dirPath],
        depth: getDepth(dirPath)
      };
    })
  )).reduce(
    (minDepth, depth) => {
      if (minDepth.depth > depth.depth) {
        return { ...depth, filePaths: (0, import_my_easy_fp3.settify)(minDepth.filePaths.concat(depth.filePaths)) };
      }
      if (minDepth.depth === depth.depth) {
        return { ...minDepth, filePaths: (0, import_my_easy_fp3.settify)(minDepth.filePaths.concat(depth.filePaths)) };
      }
      return minDepth;
    },
    {
      filePaths: [],
      depth: Number.MAX_SAFE_INTEGER
    }
  );
  const eol = await getSourceFileEol([...tsconfig.fileNames].slice(0, 30));
  return {
    eol,
    tsconfig,
    topDir: {
      dirs: topDirDepth.filePaths,
      depth: 0
    },
    resolved: {
      projectDirPath: resolvedProjectDirPath,
      projectFilePath: projectPath
    }
  };
}

// src/configs/const-enum/CE_CTIX_DEFAULT_VALUE.ts
var CE_CTIX_DEFAULT_VALUE = {
  CONFIG_FILENAME: ".ctirc",
  TSCONFIG_FILENAME: "tsconfig.json",
  EXPORT_FILENAME: "index.ts",
  PACKAGE_JSON_FILENAME: "package.json",
  REMOVE_FILE_CHOICE_FUZZY: 50
};

// src/configs/modules/getCommand.ts
var import_my_easy_fp4 = require("my-easy-fp");
function getCommand(raw) {
  const command = (0, import_my_easy_fp4.atOrUndefined)((0, import_my_easy_fp4.toArray)(raw), 0);
  switch (command) {
    case CE_CTIX_COMMAND.BUILD_COMMAND:
    case CE_CTIX_COMMAND.BUILD_COMMAND_ALIAS:
      return CE_CTIX_COMMAND.BUILD_COMMAND;
    case CE_CTIX_COMMAND.REMOVE_COMMAND:
    case CE_CTIX_COMMAND.REMOVE_COMMAND_ALIAS:
      return CE_CTIX_COMMAND.REMOVE_COMMAND;
    case CE_CTIX_COMMAND.INIT_COMMAND:
    case CE_CTIX_COMMAND.INIT_COMMAND_ALIAS:
      return CE_CTIX_COMMAND.INIT_COMMAND;
    default:
      throw new Error();
  }
}

// src/configs/modules/getConfigFilePath.ts
var import_my_node_fp7 = require("my-node-fp");
var import_pathe3 = __toESM(require("pathe"));
async function getConfigFilePath(fileName, configFilePath) {
  if (configFilePath != null) {
    return configFilePath;
  }
  const cwdConfigFilePath = import_pathe3.default.join(process.cwd(), fileName);
  if (await (0, import_my_node_fp7.exists)(cwdConfigFilePath)) {
    return cwdConfigFilePath;
  }
  return void 0;
}

// src/configs/modules/json/getString.ts
function getString(buf) {
  return buf instanceof Buffer ? buf.toString() : buf;
}

// src/configs/modules/json/readJson5.ts
var import_json5 = require("json5");
var import_my_easy_fp5 = require("my-easy-fp");
var import_my_only_either = require("my-only-either");
function readJson5(buf) {
  try {
    const stringified = getString(buf);
    const parsed = (0, import_json5.parse)(stringified);
    return (0, import_my_only_either.pass)(parsed);
  } catch (caught) {
    const err = (0, import_my_easy_fp5.isError)(caught, new Error("unknown error raised"));
    return (0, import_my_only_either.fail)(err);
  }
}

// src/configs/modules/json/readJsonc.ts
var import_jsonc_parser = require("jsonc-parser");
var import_my_easy_fp6 = require("my-easy-fp");
var import_my_only_either2 = require("my-only-either");
function readJsonc(buf) {
  try {
    const stringified = getString(buf);
    const errors = [];
    const parsed = (0, import_jsonc_parser.parse)(stringified, errors);
    if (errors.length > 0) {
      throw new Error(
        `JSONC: [${(0, import_jsonc_parser.printParseErrorCode)((0, import_my_easy_fp6.atOrThrow)(errors, 0).error)}] invalid character ${(0, import_my_easy_fp6.atOrThrow)(errors, 0).length}:${(0, import_my_easy_fp6.atOrThrow)(errors, 0).offset}`
      );
    }
    return (0, import_my_only_either2.pass)(parsed);
  } catch (caught) {
    const err = (0, import_my_easy_fp6.isError)(caught, new Error("unknown error raised"));
    return (0, import_my_only_either2.fail)(err);
  }
}

// src/configs/modules/json/readYml.ts
var import_my_easy_fp7 = require("my-easy-fp");
var import_my_only_either3 = require("my-only-either");
var import_yaml = require("yaml");
function readYaml(buf) {
  try {
    const stringified = getString(buf);
    const parsed = (0, import_yaml.parse)(stringified);
    return (0, import_my_only_either3.pass)(parsed);
  } catch (caught) {
    const err = (0, import_my_easy_fp7.isError)(caught, new Error("unknown error raised"));
    return (0, import_my_only_either3.fail)(err);
  }
}

// src/configs/parseConfig.ts
function parseConfig(buf) {
  const jsonc = readJsonc(buf);
  if (jsonc.type === "pass") {
    return jsonc.pass;
  }
  const json5 = readJson5(buf);
  if (json5.type === "pass") {
    return json5.pass;
  }
  const yaml = readYaml(buf);
  if (yaml.type === "pass") {
    return yaml.pass;
  }
  throw jsonc.fail;
}

// src/configs/modules/readConfigFromFile.ts
var import_fs = __toESM(require("fs"));
var import_my_easy_fp8 = require("my-easy-fp");
var import_my_only_either4 = require("my-only-either");
async function readConfigFromFile(configFilePath) {
  try {
    const buf = await import_fs.default.promises.readFile(configFilePath);
    const parsed = parseConfig(buf);
    if (typeof parsed !== "object") {
      return (0, import_my_only_either4.fail)(new Error(`invalid configuration file format: ${parsed}`));
    }
    return (0, import_my_only_either4.pass)(parsed);
  } catch (caught) {
    const err = (0, import_my_easy_fp8.isError)(caught, new Error("unknown error raised from configuration reading"));
    return (0, import_my_only_either4.fail)(err);
  }
}

// src/configs/modules/readConfigFromPackageJson.ts
var import_fs2 = __toESM(require("fs"));
var import_my_easy_fp9 = require("my-easy-fp");
var import_my_only_either5 = require("my-only-either");
var import_pathe4 = __toESM(require("pathe"));
async function readConfigFromPackageJson() {
  try {
    const packageJsonFilePath = import_pathe4.default.join(process.cwd(), "package.json");
    const buf = await import_fs2.default.promises.readFile(packageJsonFilePath);
    const packageJson = JSON.parse(buf.toString());
    if ("ctix" in packageJson && typeof packageJson.ctix === "object" && packageJson.ctix != null && Object.keys(packageJson.ctix).length > 0) {
      const config = packageJson.ctix;
      return (0, import_my_only_either5.pass)(config);
    }
    return (0, import_my_only_either5.fail)(new Error("cannot read configuration from package.json"));
  } catch (caught) {
    const err = (0, import_my_easy_fp9.isError)(caught, new Error("unknown error raised from configuration reading"));
    return (0, import_my_only_either5.fail)(err);
  }
}

// src/configs/modules/readConfigFromTsconfigJson.ts
var import_fs3 = __toESM(require("fs"));
var import_my_easy_fp10 = require("my-easy-fp");
var import_my_only_either6 = require("my-only-either");
async function readConfigFromTsconfigJson(tsconfigFilePath) {
  try {
    const buf = await import_fs3.default.promises.readFile(tsconfigFilePath);
    const parsed = readJsonc(buf);
    if (parsed.type === "fail") {
      return parsed;
    }
    const tsconfig = parsed.pass;
    if ("ctix" in tsconfig && typeof tsconfig.ctix === "object" && tsconfig.ctix != null && Object.keys(tsconfig.ctix).length > 0) {
      const config = tsconfig.ctix;
      return (0, import_my_only_either6.pass)(config);
    }
    return (0, import_my_only_either6.fail)(new Error(`cannot read configuration from ${tsconfigFilePath}`));
  } catch (caught) {
    const err = (0, import_my_easy_fp10.isError)(caught, new Error("unknown error raised from configuration reading"));
    return (0, import_my_only_either6.fail)(err);
  }
}

// src/modules/values/getCheckedValue.ts
var import_type_check = require("type-check");
function getCheckedValue(types, value) {
  const checked = (0, import_type_check.typeCheck)(types, value);
  if (checked) {
    return value;
  }
  return void 0;
}

// src/configs/loadConfig.ts
var import_consola = __toESM(require("consola"));
var import_minimist = __toESM(require("minimist"));
var import_my_easy_fp11 = require("my-easy-fp");
async function loadConfig() {
  try {
    const configValueKeys = [
      "force-yes",
      "y",
      "remove-backup",
      "export-filename",
      "f",
      "output",
      "o",
      "skip-empty-dir",
      "start-from",
      "project",
      "p",
      "mode",
      "use-semicolon",
      "use-banner",
      "quote",
      "q",
      "directive",
      "file-ext",
      "overwrite",
      "w",
      "backup",
      "generation-style",
      "include-files",
      "exclude-files",
      "config",
      "c",
      "spinner-stream",
      "progress-stream",
      "reasoner-stream"
    ];
    const argv = (0, import_minimist.default)(process.argv.slice(2));
    const command = getCommand(argv._);
    const configFilePath = await getConfigFilePath(
      CE_CTIX_DEFAULT_VALUE.CONFIG_FILENAME,
      getConfigValue(argv, "c", "config")
    );
    const tsconfigFilePath = await getConfigFilePath(
      CE_CTIX_DEFAULT_VALUE.TSCONFIG_FILENAME,
      getConfigValue(argv, "p", "project")
    );
    const configFileEither = configFilePath != null ? await readConfigFromFile(configFilePath) : void 0;
    if (configFileEither != null && configFileEither.type === "pass") {
      const projectFilePath = getCheckedValue("String", getConfigValue(argv, "p", "project")) ?? getCheckedValue("String", configFileEither.pass.p) ?? getCheckedValue("String", configFileEither.pass.project) ?? tsconfigFilePath;
      const config2 = castConfig(
        command,
        {
          ...configFileEither.pass,
          ...getConfigObject(argv, ...configValueKeys)
        },
        {
          from: ".ctirc",
          config: configFilePath,
          tsconfig: projectFilePath
        }
      );
      return config2;
    }
    const tsconfigEither = tsconfigFilePath != null ? await readConfigFromTsconfigJson(tsconfigFilePath) : void 0;
    if (tsconfigEither != null && tsconfigEither.type === "pass") {
      const config2 = castConfig(
        command,
        {
          ...tsconfigEither.pass,
          ...getConfigObject(argv, ...configValueKeys)
        },
        {
          from: "tsconfig.json",
          config: configFilePath,
          tsconfig: tsconfigFilePath
        }
      );
      return config2;
    }
    const packageJsonEither = await readConfigFromPackageJson();
    if (packageJsonEither.type === "pass") {
      const config2 = castConfig(
        command,
        {
          ...packageJsonEither.pass,
          ...getConfigObject(argv, ...configValueKeys)
        },
        {
          from: "package.json",
          config: configFilePath,
          tsconfig: tsconfigFilePath
        }
      );
      return config2;
    }
    const config = castConfig(
      command,
      {
        ...getConfigObject(argv, ...configValueKeys)
      },
      {
        from: "none",
        config: configFilePath,
        tsconfig: tsconfigFilePath
      }
    );
    return config;
  } catch (catched) {
    const err = (0, import_my_easy_fp11.isError)(catched, new Error("unknown error raised"));
    import_consola.default.debug(err);
    return {};
  }
}

// src/cli/builders/setCommandInitOptions.ts
function setCommandInitOptions(args) {
  args.option("force-yes", {
    alias: "y",
    describe: "answer `yes` to all questions",
    type: "boolean",
    default: false
  });
  return args;
}

// src/cli/builders/setCommandRemoveOptions.ts
function setCommandRemoveOptions(args) {
  args.option("remove-backup", {
    describe: "remove with backup file",
    type: "boolean",
    default: false
  }).option("force-yes", {
    alias: "y",
    describe: "answer `yes` to all questions",
    type: "boolean",
    default: false
  }).option("export-filename", {
    alias: "f",
    describe: 'Export filename, if you not pass this field that use "index.ts" or "index.d.ts"',
    type: "string"
  });
  return args;
}

// src/cli/builders/setModeBundleOptions.ts
function setModeBundleOptions(args) {
  args.option("output", {
    alias: "o",
    describe: "output directory",
    type: "string"
  });
  return args;
}

// src/cli/builders/setModeCreateOptions.ts
function setModeCreateOptions(args) {
  args.option("skip-empty-dir", {
    describe: "if `skipEmptyDir` is set to true, an empty directory with no files will not create an `index.ts` file",
    type: "boolean",
    default: true
  }).option("start-from", {
    describe: "specify the starting directory to start creating the `index.ts` file",
    type: "string"
  });
  return args;
}

// src/configs/const-enum/CE_CTIX_BUILD_MODE.ts
var CE_CTIX_BUILD_MODE = {
  CREATE_MODE: "create",
  BUNDLE_MODE: "bundle",
  MODULE_MODE: "module"
};

// src/configs/const-enum/CE_EXTENSION_PROCESSING.ts
var CE_EXTENSION_PROCESSING = {
  NOT_EXTENSION: "none",
  KEEP_EXTENSION: "keep",
  REPLACE_JS: "to-js"
};

// src/cli/builders/setModeGenerateOptions.ts
function setModeGenerateOptions(args) {
  args.option("project", {
    alias: "p",
    describe: 'tsconfig.json path: you must pass path with filename, like this "./tsconfig.json"',
    type: "string"
  }).option("mode", {
    describe: [
      "The mode in which the `index.ts` file is to be generated. There is a create mode that",
      "generates an `index.ts` file per directory, a bundle mode that generates a single `index.ts` file,",
      "and a module mode that generates an `index.ts` file by filename for `vue`, `sevelte`, etc."
    ].join(""),
    type: "string",
    choices: [
      CE_CTIX_BUILD_MODE.BUNDLE_MODE,
      CE_CTIX_BUILD_MODE.CREATE_MODE,
      CE_CTIX_BUILD_MODE.MODULE_MODE
    ]
  }).option("export-filename", {
    alias: "f",
    describe: 'Export filename, if you not pass this field that use "index.ts" or "index.d.ts"',
    type: "string"
  }).option("use-semicolon", {
    describe: "add semicolon on every export statement",
    type: "boolean"
  }).option("use-banner", {
    describe: "add ctix comment at first line of creted index.ts file, that remark created from ctix",
    type: "boolean"
  }).option("quote", {
    alias: "q",
    describe: "change quote character at export syntax",
    type: "string"
  }).option("directive", {
    describe: 'Use to add a literal like `"use strict"` to the top. It will be added before the banner.',
    type: "string"
  }).option("file-ext", {
    describe: "keep file extension in export statement path",
    type: "string",
    choices: [
      CE_EXTENSION_PROCESSING.NOT_EXTENSION,
      CE_EXTENSION_PROCESSING.REPLACE_JS,
      CE_EXTENSION_PROCESSING.KEEP_EXTENSION
    ]
  }).option("overwrite", {
    alias: "w",
    describe: "overwrite each index.ts file",
    type: "boolean"
  }).option("backup", {
    describe: [
      "create a backup file if the `index.ts` file already exists.",
      "This option only works if the `overwrite` option is enabled"
    ].join(" "),
    type: "boolean"
  }).option("generation-style", {
    describe: "When generating the `index.ts` file, decide how you want to generate it",
    type: "string",
    choices: [
      CE_GENERATION_STYLE.AUTO,
      CE_GENERATION_STYLE.DEFAULT_ALIAS_NAMED_DESTRUCTIVE,
      CE_GENERATION_STYLE.DEFAULT_ALIAS_NAMED_STAR,
      CE_GENERATION_STYLE.DEFAULT_NON_ALIAS_NAMED_DESTRUCTIVE,
      CE_GENERATION_STYLE.DEFAULT_STAR_NAMED_DESTRUCTIVE,
      CE_GENERATION_STYLE.DEFAULT_STAR_NAMED_STAR
    ]
  }).option("include-files", {
    describe: [
      "A list of files to exclude when generating the index.ts file. If no value is set,",
      "the value of the exclude setting set in the tsconfig.json file is used"
    ].join(" "),
    type: "string"
  }).option("exclude-files", {
    describe: [
      "A list of files to exclude when generating the index.ts file. If no value is set,",
      "the value of the exclude setting set in the tsconfig.json file is used"
    ].join(" "),
    type: "string"
  });
  return args;
}

// src/cli/builders/setProjectOptions.ts
function setProjectOptions(args) {
  args.option("config", {
    alias: "c",
    describe: "configuration file path",
    type: "string",
    default: void 0
  }).option("spinner-stream", {
    describe: "Stream of cli spinner, you can pass stdout or stderr",
    type: "string",
    choices: ["stdout", "stderr"],
    default: "stdout"
  }).option("progress-stream", {
    describe: "Stream of cli progress, you can pass stdout or stderr",
    type: "string",
    choices: ["stdout", "stderr"],
    default: "stdout"
  }).option("reasoner-stream", {
    describe: [
      "Stream of cli reasoner.",
      "Reasoner show name conflict error and already exist index.ts file error.",
      "You can pass stdout or stderr"
    ].join(""),
    type: "string",
    choices: ["stdout", "stderr"],
    default: "stderr"
  });
  return args;
}

// src/cli/ux/ProgressBar.ts
var import_chalk2 = __toESM(require("chalk"));
var import_cli_progress = require("cli-progress");
var _it, _isBootstrap, _bar, _stream, _enable, _head;
var _ProgressBar = class _ProgressBar {
  constructor(bar, stream, enable) {
    __privateAdd(this, _bar, void 0);
    __privateAdd(this, _stream, void 0);
    __privateAdd(this, _enable, void 0);
    __privateAdd(this, _head, void 0);
    __privateSet(this, _bar, bar);
    __privateSet(this, _stream, stream);
    __privateSet(this, _enable, enable);
    __privateSet(this, _head, "Progress ");
  }
  static get it() {
    return __privateGet(_ProgressBar, _it);
  }
  static get isBootstrap() {
    return __privateGet(_ProgressBar, _isBootstrap);
  }
  static bootstrap() {
    if (__privateGet(_ProgressBar, _isBootstrap)) {
      return;
    }
    const stream = "stdout";
    const isEnable = false;
    const bar = new import_cli_progress.SingleBar({
      format: `Progress [${import_chalk2.default.green("{bar}")}] {percentage}% | {value}/{total}`,
      barCompleteChar: "\u25A0",
      barIncompleteChar: " ",
      stopOnComplete: true,
      barsize: 40,
      stream: process.stdout
    });
    __privateSet(_ProgressBar, _it, new _ProgressBar(bar, stream, isEnable));
    __privateSet(_ProgressBar, _isBootstrap, true);
  }
  set stream(value) {
    if (value !== __privateGet(this, _stream)) {
      __privateGet(this, _bar).stop();
      __privateSet(this, _bar, new import_cli_progress.SingleBar({
        format: `${__privateGet(this, _head)}[${import_chalk2.default.green("{bar}")}] {percentage}% | {value}/{total}`,
        barCompleteChar: "\u25A0",
        barIncompleteChar: " ",
        stopOnComplete: true,
        barsize: 40,
        stream: process[value]
      }));
      __privateSet(this, _stream, value);
    }
  }
  get enable() {
    return __privateGet(this, _enable);
  }
  set enable(value) {
    __privateSet(this, _enable, value);
  }
  get head() {
    return __privateGet(this, _head);
  }
  set head(value) {
    __privateSet(this, _head, value);
    __privateSet(this, _bar, new import_cli_progress.SingleBar({
      format: `${__privateGet(this, _head)}[${import_chalk2.default.green("{bar}")}] {percentage}% | {value}/{total}`,
      barCompleteChar: "\u25A0",
      barIncompleteChar: " ",
      stopOnComplete: true,
      barsize: 40,
      stream: process[__privateGet(this, _stream)]
    }));
  }
  start(max, initial) {
    if (__privateGet(this, _enable)) {
      __privateGet(this, _bar).start(max, initial ?? 0);
    }
  }
  increment() {
    if (__privateGet(this, _enable)) {
      __privateGet(this, _bar).increment();
    }
  }
  update(current) {
    if (__privateGet(this, _enable)) {
      __privateGet(this, _bar).update(current);
    }
  }
  stop() {
    __privateGet(this, _bar).update(__privateGet(this, _bar).getTotal());
    __privateGet(this, _bar).stop();
  }
};
_it = new WeakMap();
_isBootstrap = new WeakMap();
_bar = new WeakMap();
_stream = new WeakMap();
_enable = new WeakMap();
_head = new WeakMap();
__privateAdd(_ProgressBar, _it, void 0);
__privateAdd(_ProgressBar, _isBootstrap, false);
var ProgressBar = _ProgressBar;
ProgressBar.bootstrap();

// src/cli/ux/Reasoner.ts
var import_chalk3 = __toESM(require("chalk"));
var path9 = __toESM(require("path"));
var _it2, _isBootstrap2, _enable2, _stream2, _logger, _streamFunc;
var _Reasoner = class _Reasoner {
  constructor(func, stream, enable) {
    __privateAdd(this, _enable2, void 0);
    __privateAdd(this, _stream2, void 0);
    __privateAdd(this, _logger, void 0);
    __privateAdd(this, _streamFunc, void 0);
    __privateSet(this, _streamFunc, func);
    __privateSet(this, _stream2, stream);
    __privateSet(this, _enable2, enable);
    __privateSet(this, _logger, console.log);
  }
  static get it() {
    return __privateGet(_Reasoner, _it2);
  }
  static get isBootstrap() {
    return __privateGet(_Reasoner, _isBootstrap2);
  }
  static bootstrap() {
    if (__privateGet(_Reasoner, _isBootstrap2)) {
      return;
    }
    const enable = false;
    const stream = "stderr";
    __privateSet(_Reasoner, _it2, new _Reasoner(console.error, stream, enable));
    __privateSet(_Reasoner, _isBootstrap2, true);
  }
  set stream(value) {
    if (value !== __privateGet(this, _stream2)) {
      __privateSet(this, _streamFunc, value === "stderr" ? console.error : console.log);
      __privateSet(this, _stream2, value);
    }
  }
  get enable() {
    return __privateGet(this, _enable2);
  }
  set enable(value) {
    __privateSet(this, _enable2, value);
  }
  static messaging(reason) {
    const messageBlock = [""];
    const typeMessage = reason.type === "error" ? import_chalk3.default.bgRed(`   ${reason.type.toUpperCase()}   `) : import_chalk3.default.bgYellow(`   ${import_chalk3.default.black(reason.type.toUpperCase())}    `);
    const { filePath } = reason;
    const filename = reason.lineAndCharacter == null ? `${path9.basename(filePath)}` : `${path9.basename(filePath)}:${reason.lineAndCharacter.line}:${reason.lineAndCharacter.character}`;
    const chevronRight = reason.type === "error" ? import_chalk3.default.red(">") : import_chalk3.default.yellow(">");
    messageBlock.push(`${typeMessage} ${filename}`);
    if (reason.lineAndCharacter == null) {
      messageBlock.push(`   ${chevronRight} ${import_chalk3.default.gray(`${filePath}`)}`);
    } else {
      messageBlock.push(
        `   ${chevronRight} ${import_chalk3.default.gray(
          `${filePath}:${reason.lineAndCharacter.line}:${reason.lineAndCharacter.character}`
        )}`
      );
    }
    messageBlock.push(
      ...reason.message.split("\n").map((splittedMessage) => {
        return `   ${chevronRight} ${import_chalk3.default.gray(splittedMessage.trim())}`;
      })
    );
    messageBlock.push("");
    return messageBlock.join("\n");
  }
  start(reasons) {
    if (__privateGet(this, _enable2) === false) {
      return;
    }
    const errors = reasons.filter((reason) => reason.type === "error").map((reason) => _Reasoner.messaging(reason));
    const warns = reasons.filter((reason) => reason.type === "warn").map((reason) => _Reasoner.messaging(reason));
    __privateGet(this, _logger).call(this, warns.join(""));
    __privateGet(this, _streamFunc).call(this, errors.join(""));
  }
};
_it2 = new WeakMap();
_isBootstrap2 = new WeakMap();
_enable2 = new WeakMap();
_stream2 = new WeakMap();
_logger = new WeakMap();
_streamFunc = new WeakMap();
__privateAdd(_Reasoner, _it2, void 0);
__privateAdd(_Reasoner, _isBootstrap2, false);
var Reasoner = _Reasoner;
Reasoner.bootstrap();

// src/cli/ux/Spinner.ts
var import_ora = __toESM(require("ora"));
var _it3, _isBootstrap3, _spinner, _stream3, _enable3;
var _Spinner = class _Spinner {
  constructor(spinner, stream, enable) {
    __privateAdd(this, _spinner, void 0);
    __privateAdd(this, _stream3, void 0);
    __privateAdd(this, _enable3, void 0);
    __privateSet(this, _spinner, spinner);
    __privateSet(this, _enable3, enable);
    __privateSet(this, _stream3, stream);
  }
  static get it() {
    return __privateGet(_Spinner, _it3);
  }
  static get isBootstrap() {
    return __privateGet(_Spinner, _isBootstrap3);
  }
  static bootstrap() {
    if (__privateGet(_Spinner, _isBootstrap3)) {
      return;
    }
    const spinner = (0, import_ora.default)({ text: "", stream: process.stdout });
    const enable = false;
    const stream = "stdout";
    __privateSet(_Spinner, _it3, new _Spinner(spinner, stream, enable));
    __privateSet(_Spinner, _isBootstrap3, true);
  }
  set stream(value) {
    if (value !== __privateGet(this, _stream3)) {
      __privateGet(this, _spinner).stop();
      __privateSet(this, _spinner, (0, import_ora.default)({ text: __privateGet(this, _spinner).text, stream: process[value] }));
      __privateSet(this, _stream3, value);
    }
  }
  get enable() {
    return __privateGet(this, _enable3);
  }
  set enable(value) {
    __privateSet(this, _enable3, value);
  }
  start(message) {
    if (__privateGet(this, _enable3) && message != null) {
      __privateGet(this, _spinner).text = message;
      __privateGet(this, _spinner).start();
    } else if (__privateGet(this, _enable3)) {
      __privateGet(this, _spinner).start();
    }
  }
  messaging(kind, message) {
    if (!__privateGet(this, _enable3)) {
      return;
    }
    switch (kind) {
      case "succeed":
        __privateGet(this, _spinner).succeed(message);
        break;
      case "fail":
        __privateGet(this, _spinner).fail(message);
        break;
      default:
        __privateGet(this, _spinner).text = message;
    }
  }
  fail(message) {
    this.messaging("fail", message);
  }
  succeed(message) {
    this.messaging("succeed", message);
  }
  update(message) {
    this.messaging("update", message);
  }
  stop() {
    __privateGet(this, _spinner).stop();
  }
};
_it3 = new WeakMap();
_isBootstrap3 = new WeakMap();
_spinner = new WeakMap();
_stream3 = new WeakMap();
_enable3 = new WeakMap();
__privateAdd(_Spinner, _it3, void 0);
__privateAdd(_Spinner, _isBootstrap3, false);
var Spinner = _Spinner;
Spinner.bootstrap();

// src/configs/transforms/getOutputValue.ts
var import_my_node_fp8 = require("my-node-fp");
function getOutputValue(argv, option) {
  if (argv.output != null) {
    return argv.output;
  }
  if (option.output != null) {
    return option.output;
  }
  return (0, import_my_node_fp8.getDirnameSync)(argv.project);
}

// src/configs/transforms/transformBundleMode.ts
function transformBundleMode(argv, option) {
  const output = getOutputValue(argv, option);
  return {
    mode: CE_CTIX_BUILD_MODE.BUNDLE_MODE,
    project: argv.project,
    exportFilename: argv.exportFilename ?? option.exportFilename ?? CE_CTIX_DEFAULT_VALUE.EXPORT_FILENAME,
    useSemicolon: argv.useSemicolon ?? option.useSemicolon ?? true,
    useBanner: argv.useBanner ?? option.useBanner ?? false,
    useTimestamp: argv.useTimestamp ?? option.useTimestamp ?? false,
    quote: argv.quote ?? option.quote ?? "'",
    directive: argv.directive ?? option.directive ?? "",
    fileExt: argv.fileExt ?? option.fileExt ?? CE_EXTENSION_PROCESSING.NOT_EXTENSION,
    overwrite: argv.overwrite ?? option.overwrite ?? false,
    backup: argv.backup ?? option.backup ?? true,
    generationStyle: argv.generationStyle ?? option.generationStyle ?? CE_GENERATION_STYLE.AUTO,
    include: option.include,
    exclude: option.exclude,
    output
  };
}

// src/configs/transforms/transformCreateMode.ts
var import_my_node_fp9 = require("my-node-fp");
var import_pathe5 = __toESM(require("pathe"));
async function transformCreateMode(argv, option) {
  const startFrom = argv.startFrom ?? option.startFrom ?? import_pathe5.default.resolve(await (0, import_my_node_fp9.getDirname)(argv.project));
  const resolvedStartFrom = import_pathe5.default.isAbsolute(startFrom) ? startFrom : import_pathe5.default.resolve(startFrom);
  return {
    mode: CE_CTIX_BUILD_MODE.CREATE_MODE,
    project: argv.project,
    exportFilename: argv.exportFilename ?? option.exportFilename ?? CE_CTIX_DEFAULT_VALUE.EXPORT_FILENAME,
    useSemicolon: argv.useSemicolon ?? option.useSemicolon ?? true,
    useBanner: argv.useBanner ?? option.useBanner ?? false,
    useTimestamp: argv.useTimestamp ?? option.useTimestamp ?? false,
    quote: argv.quote ?? option.quote ?? "'",
    directive: argv.directive ?? option.directive ?? "",
    fileExt: argv.fileExt ?? option.fileExt ?? CE_EXTENSION_PROCESSING.NOT_EXTENSION,
    overwrite: argv.overwrite ?? option.overwrite ?? false,
    backup: argv.backup ?? option.backup ?? true,
    generationStyle: argv.generationStyle ?? option.generationStyle ?? CE_GENERATION_STYLE.AUTO,
    include: option.include,
    exclude: option.exclude,
    skipEmptyDir: argv.skipEmptyDir ?? option.skipEmptyDir ?? true,
    startFrom: resolvedStartFrom
  };
}

// src/configs/transforms/transformModuleMode.ts
async function transformModuleMode(argv, option) {
  const output = getOutputValue(argv, option);
  return {
    mode: CE_CTIX_BUILD_MODE.MODULE_MODE,
    project: argv.project,
    exportFilename: argv.exportFilename ?? option.exportFilename ?? CE_CTIX_DEFAULT_VALUE.EXPORT_FILENAME,
    useSemicolon: argv.useSemicolon ?? option.useSemicolon ?? true,
    useBanner: argv.useBanner ?? option.useBanner ?? false,
    useTimestamp: argv.useTimestamp ?? option.useTimestamp ?? false,
    quote: argv.quote ?? option.quote ?? "'",
    directive: argv.directive ?? option.directive ?? "",
    overwrite: argv.overwrite ?? option.overwrite ?? false,
    backup: argv.backup ?? option.backup ?? true,
    include: option.include,
    exclude: option.exclude,
    output
  };
}

// src/modules/file/getTsExcludeFiles.ts
function getTsExcludeFiles(config) {
  if (config.config.exclude != null && config.config.exclude.length > 0) {
    return config.config.exclude;
  }
  const { exclude } = getFileScope(config.extend.tsconfig.raw);
  return exclude;
}

// src/modules/file/getTsIncludeFiles.ts
var import_my_node_fp10 = require("my-node-fp");
function getTsIncludeFiles(config) {
  if (config.config.include != null && config.config.include.length > 0) {
    return config.config.include;
  }
  const { include } = getFileScope(config.extend.tsconfig.raw);
  if (include.length > 0) {
    return include;
  }
  const filePaths = config.extend.tsconfig.fileNames.filter(
    (filePath) => (0, import_my_node_fp10.isDescendant)(config.extend.resolved.projectDirPath, filePath)
  );
  return filePaths;
}

// src/configs/transforms/createBuildOptions.ts
var import_my_easy_fp12 = require("my-easy-fp");
var import_node_path7 = __toESM(require("path"));
async function createBuildOptions(argv) {
  const options = {
    $kind: CE_CTIX_COMMAND.BUILD_COMMAND,
    config: argv.config,
    from: argv.from ?? "none",
    spinnerStream: argv.spinnerStream,
    progressStream: argv.progressStream,
    reasonerStream: argv.reasonerStream,
    options: []
  };
  if ("from" in argv && argv.from != null && typeof argv.from === "string") {
    options.from = argv.from;
  }
  Spinner.it.stream = argv.spinnerStream;
  ProgressBar.it.stream = argv.progressStream;
  Reasoner.it.stream = argv.reasonerStream;
  if (argv.options != null) {
    options.options = argv.options;
    options.options = await Promise.all(
      options.options.map(async (option) => {
        if (option.mode === CE_CTIX_BUILD_MODE.MODULE_MODE) {
          const projectPath3 = import_node_path7.default.resolve(option.project);
          const tsconfig3 = getTypeScriptConfig(projectPath3);
          const moduleMode = await transformModuleMode(
            { ...argv, project: projectPath3 },
            {
              ...option,
              include: getTsIncludeFiles({
                config: { include: option.include },
                extend: { tsconfig: tsconfig3, resolved: { projectDirPath: projectPath3 } }
              }),
              exclude: getTsExcludeFiles({
                config: { exclude: option.exclude },
                extend: { tsconfig: tsconfig3 }
              })
            }
          );
          return moduleMode;
        }
        if (option.mode === CE_CTIX_BUILD_MODE.CREATE_MODE) {
          const projectPath3 = import_node_path7.default.resolve(option.project);
          const tsconfig3 = getTypeScriptConfig(projectPath3);
          const createMode = await transformCreateMode(
            { ...argv, project: projectPath3 },
            {
              ...option,
              include: getTsIncludeFiles({
                config: { include: option.include },
                extend: { tsconfig: tsconfig3, resolved: { projectDirPath: projectPath3 } }
              }),
              exclude: getTsExcludeFiles({
                config: { exclude: option.exclude },
                extend: { tsconfig: tsconfig3 }
              })
            }
          );
          return createMode;
        }
        const projectPath2 = import_node_path7.default.resolve(option.project);
        const tsconfig2 = getTypeScriptConfig(projectPath2);
        const bundleMode = transformBundleMode(
          { ...argv, project: projectPath2 },
          {
            ...option,
            include: getTsIncludeFiles({
              config: { include: option.include },
              extend: { tsconfig: tsconfig2, resolved: { projectDirPath: projectPath2 } }
            }),
            exclude: getTsExcludeFiles({
              config: { exclude: option.exclude },
              extend: { tsconfig: tsconfig2 }
            })
          }
        );
        return bundleMode;
      })
    );
    return options;
  }
  const projectPath = import_node_path7.default.resolve(argv.project);
  const tsconfig = getTypeScriptConfig(projectPath);
  const include = argv.include != null ? (0, import_my_easy_fp12.toArray)(argv.include) : getTsIncludeFiles({
    config: { include: [] },
    extend: { tsconfig, resolved: { projectDirPath: projectPath } }
  });
  const exclude = argv.exclude != null ? (0, import_my_easy_fp12.toArray)(argv.exclude) : getTsExcludeFiles({
    config: { exclude: [] },
    extend: { tsconfig }
  });
  const mode = argv.mode ?? CE_CTIX_BUILD_MODE.BUNDLE_MODE;
  if (mode === CE_CTIX_BUILD_MODE.CREATE_MODE) {
    options.options = [
      await transformCreateMode(argv, {
        ...argv,
        mode: CE_CTIX_BUILD_MODE.CREATE_MODE,
        include,
        exclude
      })
    ];
    return options;
  }
  const output = getOutputValue(argv, { output: argv.output });
  if (mode === CE_CTIX_BUILD_MODE.MODULE_MODE) {
    options.options = [
      await transformModuleMode(argv, {
        ...argv,
        mode: CE_CTIX_BUILD_MODE.MODULE_MODE,
        include,
        exclude
      })
    ];
    return options;
  }
  options.options = [
    transformBundleMode(argv, {
      ...argv,
      mode: CE_CTIX_BUILD_MODE.BUNDLE_MODE,
      output,
      include,
      exclude
    })
  ];
  return options;
}

// src/modules/file/ProjectContainer.ts
var import_node_path8 = __toESM(require("path"));
var _it4, _isBootstrap4, _projects;
var _ProjectContainer = class _ProjectContainer {
  constructor() {
    __privateAdd(this, _projects, void 0);
    __privateSet(this, _projects, /* @__PURE__ */ new Map());
  }
  static get it() {
    return __privateGet(_ProjectContainer, _it4);
  }
  static get isBootstrap() {
    return __privateGet(_ProjectContainer, _isBootstrap4);
  }
  static project(projectPath) {
    if (!__privateGet(_ProjectContainer, _isBootstrap4)) {
      throw new Error("NOT_INITIALIZE_ERROR: please, initialize before use");
    }
    return __privateGet(_ProjectContainer, _it4).project(projectPath);
  }
  static addSourceFilesAtPaths(projectPath, filePaths) {
    if (!__privateGet(_ProjectContainer, _isBootstrap4)) {
      throw new Error("NOT_INITIALIZE_ERROR: please, initialize before use");
    }
    return __privateGet(_ProjectContainer, _it4).addSourceFilesAtPaths(projectPath, filePaths);
  }
  static bootstrap() {
    if (__privateGet(_ProjectContainer, _isBootstrap4)) {
      return;
    }
    __privateSet(_ProjectContainer, _it4, new _ProjectContainer());
    __privateSet(_ProjectContainer, _isBootstrap4, true);
  }
  project(projectPath) {
    const project = __privateGet(this, _projects).get(projectPath);
    if (project != null) {
      return project;
    }
    const loadedProject = getTypeScriptProject({
      tsConfigFilePath: import_node_path8.default.resolve(projectPath)
    });
    __privateGet(this, _projects).set(projectPath, loadedProject);
    return loadedProject;
  }
  addSourceFilesAtPaths(projectPath, filePaths) {
    const project = __privateGet(this, _projects).get(projectPath);
    if (project == null) {
      throw new Error(`Cannot found tsconfig.json: ${project}`);
    }
    filePaths.forEach((filePath) => {
      project.addSourceFileAtPath(filePath);
    });
  }
};
_it4 = new WeakMap();
_isBootstrap4 = new WeakMap();
_projects = new WeakMap();
__privateAdd(_ProjectContainer, _it4, void 0);
__privateAdd(_ProjectContainer, _isBootstrap4, false);
var ProjectContainer = _ProjectContainer;
ProjectContainer.bootstrap();

// src/modules/file/checkOutputFile.ts
var import_my_node_fp11 = require("my-node-fp");
async function checkOutputFile(outputMap) {
  const filePaths = Array.from(outputMap.keys());
  const filePathExists = await Promise.all(
    filePaths.map(async (filePath) => {
      return { exists: await (0, import_my_node_fp11.exists)(filePath), filePath };
    })
  );
  const reasons = filePathExists.filter((filePathExist) => filePathExist.exists).map((filePathExist) => {
    const reason = {
      type: "error",
      filePath: filePathExist.filePath,
      message: "already exist `index.ts` file"
    };
    return reason;
  });
  return reasons;
}

// src/modules/path/modules/posixJoin.ts
var import_my_node_fp12 = require("my-node-fp");
var path12 = __toESM(require("path"));
function posixJoin(...args) {
  return (0, import_my_node_fp12.replaceSepToPosix)(args.join(path12.sep));
}

// src/modules/file/getGlobFiles.ts
var import_my_node_fp13 = require("my-node-fp");
var import_node_path9 = __toESM(require("path"));
function getGlobFiles(glob) {
  const filePathSet = /* @__PURE__ */ new Set();
  for (const filePath of glob) {
    filePathSet.add(
      typeof filePath === "string" ? (0, import_my_node_fp13.replaceSepToPosix)(filePath) : (0, import_my_node_fp13.replaceSepToPosix)(import_node_path9.default.join(filePath.path, filePath.name))
    );
  }
  return Array.from(filePathSet);
}

// src/modules/scope/defaultExclude.ts
var defaultExclude = ["node_modules/**", "flow-typed/**", "coverage/**", ".git/**"];

// src/modules/scope/ExcludeContainer.ts
var import_glob = require("glob");
var import_my_node_fp14 = require("my-node-fp");
var import_node_path10 = __toESM(require("path"));
var _globs, _map, _inline;
var ExcludeContainer = class {
  constructor(params) {
    __privateAdd(this, _globs, void 0);
    __privateAdd(this, _map, void 0);
    __privateAdd(this, _inline, void 0);
    const globs = new import_glob.Glob(params.config.exclude, {
      absolute: true,
      ignore: defaultExclude,
      cwd: params.cwd,
      windowsPathsNoEscape: true
    });
    const files = getGlobFiles(globs).map((filePath) => [
      (0, import_my_node_fp14.replaceSepToPosix)(filePath),
      true
    ]);
    __privateSet(this, _map, new Map(files));
    __privateSet(this, _globs, [globs]);
    __privateSet(this, _inline, /* @__PURE__ */ new Map());
    params.inlineExcludeds.forEach((inlineExcluded) => {
      const filePath = import_node_path10.default.isAbsolute(inlineExcluded.filePath) ? (0, import_my_node_fp14.replaceSepToPosix)(inlineExcluded.filePath) : posixResolve(inlineExcluded.filePath);
      __privateGet(this, _inline).set(filePath, inlineExcluded);
    });
  }
  get globs() {
    return __privateGet(this, _globs);
  }
  get map() {
    return __privateGet(this, _map);
  }
  isExclude(filePath) {
    if (__privateGet(this, _map).size <= 0 && __privateGet(this, _inline).size <= 0) {
      return false;
    }
    if (import_node_path10.default.isAbsolute(filePath)) {
      return __privateGet(this, _map).get(filePath) != null || __privateGet(this, _inline).get(filePath) != null;
    }
    return __privateGet(this, _map).get(posixResolve(filePath)) != null || __privateGet(this, _inline).get(posixResolve(filePath)) != null;
  }
};
_globs = new WeakMap();
_map = new WeakMap();
_inline = new WeakMap();

// src/modules/scope/IncludeContainer.ts
var import_glob2 = require("glob");
var import_node_path11 = __toESM(require("path"));
var _globs2, _map2;
var IncludeContainer = class {
  constructor(params) {
    __privateAdd(this, _globs2, void 0);
    __privateAdd(this, _map2, void 0);
    const globs = new import_glob2.Glob(params.config.include, {
      absolute: true,
      ignore: defaultExclude,
      cwd: params.cwd,
      windowsPathsNoEscape: true
    });
    const files = getGlobFiles(globs).map((filePath) => [filePath, true]);
    __privateSet(this, _map2, new Map(files));
    __privateSet(this, _globs2, [globs]);
  }
  get globs() {
    return __privateGet(this, _globs2);
  }
  get map() {
    return __privateGet(this, _map2);
  }
  isInclude(filePath) {
    if (__privateGet(this, _map2).size <= 0) {
      return false;
    }
    if (import_node_path11.default.isAbsolute(filePath)) {
      return __privateGet(this, _map2).get(filePath) != null;
    }
    return __privateGet(this, _map2).get(posixResolve(filePath)) != null;
  }
  files() {
    return __privateGet(this, _globs2).map((glob) => getGlobFiles(glob)).flat();
  }
};
_globs2 = new WeakMap();
_map2 = new WeakMap();

// src/modules/writes/getBanner.ts
var import_dayjs = __toESM(require("dayjs"));
function getBanner(option, todayArgs) {
  const today = todayArgs ?? (0, import_dayjs.default)();
  if (option.useBanner && option.useTimestamp) {
    return `// created from ctix ${today.format("YYYY-MM-DD HH:mm:ss")}`;
  }
  if (option.useBanner) {
    return `// created from ctix`;
  }
  return void 0;
}

// src/modules/writes/prettifing.ts
var import_prettier = __toESM(require("prettier"));
async function prettifing(project, contents, options) {
  try {
    if (options != null) {
      const prettiered = await import_prettier.default.format(contents, options);
      return { apply: true, contents: prettiered };
    }
    const resolved = await import_prettier.default.resolveConfig(project, {
      editorconfig: true
    });
    if (resolved != null) {
      const prettiered = await import_prettier.default.format(contents, resolved);
      return { apply: true, contents: prettiered };
    }
    return { apply: false, contents };
  } catch (catched) {
    return { apply: false, contents };
  }
}

// src/modules/writes/indexWrites.ts
var import_my_node_fp15 = require("my-node-fp");
var import_promises = require("fs/promises");
async function indexWrites(indexFiles, option, extendOptions) {
  await Promise.all(
    indexFiles.map(async (file) => {
      const prettified = await prettifing(
        extendOptions.resolved.projectDirPath,
        `${file.content}${extendOptions.eol}`
      );
      if (option.backup) {
        if (await (0, import_my_node_fp15.exists)(file.path)) {
          await (0, import_promises.writeFile)(`${file.path}.bak`, await (0, import_promises.readFile)(file.path));
        }
        await (0, import_promises.writeFile)(file.path, `${prettified.contents.trim()}${extendOptions.eol}`);
      } else {
        await (0, import_promises.writeFile)(file.path, `${prettified.contents.trim()}${extendOptions.eol}`);
      }
    })
  );
}

// src/templates/const-enum/CE_TEMPLATE_NAME.ts
var CE_TEMPLATE_NAME = {
  INDEX_FILE_TEMPLATE: "index-file-template",
  NESTED_OPTIONS_TEMPLATE: "nested-options-template",
  OPTIONS_TEMPLATE: "options-template",
  MODULE_INDEX_FILE_TEMPLATE: "module-index-file-template",
  DECLARATION_FILE_TEMPLATE: "declaration-file-template"
};

// src/modules/path/addExt.ts
function addExt(filename, ext) {
  if (filename.endsWith(".")) {
    return [filename.trim(), ext.trim()].join("");
  }
  return [filename.trim(), ext.trim()].join(".");
}

// src/templates/templates/declarationFileTemplate.ts
var declarationFileTemplate = `
<%- it.declarations.forEach((declaration) => { -%>
import <%-= it.options.quote %><%= declaration.importPath %><%= declaration.extname.render %><%= it.options.quote -%><%- if (it.options.useSemicolon) { -%><%-= ";" -%><%- } -%><%= "\\n" %>
<%- }) %>
`;

// src/templates/templates/defaultAliasNamedDestructiveDefaultTemplate.ts
var defaultAliasNamedDestructiveDefaultTemplate = `
<%- if (it.statement.default != null && it.statement.named.length > 0) { -%>

  export { <%= it.statement.default.isPureType ? 'type ' : '' %>default as <%= it.statement.default.identifier.alias %>, <%= it.statement.named.map((named) => (named.isPureType ? 'type ' + named.identifier.name : named.identifier.name)).join(', ') %> } from<%= " " %>
  <%-= it.options.quote %><%= it.statement.importPath %><%= it.statement.extname.render %><%= it.options.quote -%>
  <%- if (it.options.useSemicolon) { -%><%-= ";" -%><%- } -%>

<%- } else if (it.statement.default != null) { -%>

  export { <%= it.statement.default.isPureType ? 'type ' : '' %>default as <%= it.statement.default.identifier.alias %> } from<%= " " %>
  <%-= it.options.quote %><%= it.statement.importPath %><%= it.statement.extname.render %><%= it.options.quote %>
  <%- if (it.options.useSemicolon) { -%><%-= ";" -%><%- } -%>

<% } else if (it.statement.named.length > 0) { -%>

  export { <%= it.statement.named.map((named) => (named.isPureType ? 'type ' + named.identifier.name : named.identifier.name)).join(', ') %> } from<%= " " %>
  <%-= it.options.quote %><%= it.statement.importPath %><%= it.statement.extname.render %><%= it.options.quote %>
  <%- if (it.options.useSemicolon) { -%><%-= ";" -%><%- } -%>

<% } else { %>
<% } -%>
`;

// src/templates/templates/defaultAliasNamedStarDefaultTemplate.ts
var defaultAliasNamedStarDefaultTemplate = `
<%- if (it.statement.default != null && it.statement.named.length > 0) { -%>

  export { <%= it.statement.default.isPureType ? 'type ' : '' %>default as <%= it.statement.default.identifier.alias %> } from<%= " " %>
  <%-= it.options.quote %><%= it.statement.importPath %><%= it.statement.extname.render %><%= it.options.quote %>
  <%- if (it.options.useSemicolon) { -%><%-= ";\\n" -%><%- } else { -%><%-= "\\n" -%><%- } -%>
  export * from <%= it.options.quote %><%= it.statement.importPath %><%= it.statement.extname.render %><%= it.options.quote %>
  <%- if (it.options.useSemicolon) { -%><%-= ";" -%><%- } -%>

<%- } else if (it.statement.default != null) { -%>

  export { <%= it.statement.default.isPureType ? 'type ' : '' %>default as <%= it.statement.default.identifier.alias %> } from<%= " " %>
  <%-= it.options.quote %><%= it.statement.importPath %><%= it.statement.extname.render %><%= it.options.quote %>
  <%- if (it.options.useSemicolon) { -%><%-= ";" -%><%- } -%>

<% } else if (it.statement.named.length > 0) { -%>

  export * from <%-= it.options.quote %><%= it.statement.importPath %><%= it.statement.extname.render %><%= it.options.quote %>
  <%- if (it.options.useSemicolon) { -%><%-= ";" -%><%- } -%>

<% } else { %>
<% } -%>
`;

// src/templates/templates/defaultNonAliasNamedDestructiveDefaultTemplate.ts
var defaultNonAliasNamedDestructiveDefaultTemplate = `
<%- if (it.statement.default != null && it.statement.named.length > 0) { -%>

  export { default, <%= it.statement.named.map((named) => (named.isPureType ? 'type ' + named.identifier.name : named.identifier.name)).join(', ') %> } from<%= " " %>
  <%-= it.options.quote %><%= it.statement.importPath %><%= it.statement.extname.render %><%= it.options.quote %>
  <%- if (it.options.useSemicolon) { -%><%-= ";" -%><%- } -%>

<%- } else if (it.statement.default != null) { -%>

  export { default } from<%= " " %>
  <%-= it.options.quote %><%= it.statement.importPath %><%= it.statement.extname.render %><%= it.options.quote %>
  <%- if (it.options.useSemicolon) { -%><%-= ";" -%><%- } -%>

<% } else if (it.statement.named.length > 0) { -%>

  export { <%= it.statement.named.map((named) => (named.isPureType ? 'type ' + named.identifier.name : named.identifier.name)).join(', ') %> } from<%= " " %>
  <%-= it.options.quote %><%= it.statement.importPath %><%= it.statement.extname.render %><%= it.options.quote %>
  <%- if (it.options.useSemicolon) { -%><%-= ";" -%><%- } -%>

<% } else { %>
<% } -%>
`;

// src/templates/templates/defaultStarNamedDestructiveDefaultTemplate.ts
var defaultStarNamedDestructiveDefaultTemplate = `
<%- if (it.statement.default != null && it.statement.named.length > 0) { -%>

  export * from <%-= it.options.quote %><%= it.statement.importPath %><%= it.statement.extname.render %><%= it.options.quote %>
  <%- if (it.options.useSemicolon) { -%><%-= ";" -%><%- } -%>
  export { <%= it.statement.named.map((named) => (named.isPureType ? 'type ' + named.identifier.name : named.identifier.name)).join(', ') %> } from<%= " " %>
  <%-= it.options.quote %><%= it.statement.importPath %><%= it.statement.extname.render %><%= it.options.quote %>
  <%- if (it.options.useSemicolon) { -%><%-= ";" -%><%- } -%>

<%- } else if (it.statement.default != null) { -%>

  export * from <%-= it.options.quote %><%= it.statement.importPath %><%= it.statement.extname.render %><%= it.options.quote %>
  <%- if (it.options.useSemicolon) { -%><%-= ";" -%><%- } -%>

<% } else if (it.statement.named.length > 0) { -%>

  export { <%= it.statement.named.map((named) => (named.isPureType ? 'type ' + named.identifier.name : named.identifier.name)).join(', ') %> } from<%= " " %>
  <%-= it.options.quote %><%= it.statement.importPath %><%= it.statement.extname.render %><%= it.options.quote %>
  <%- if (it.options.useSemicolon) { -%><%-= ";" -%><%- } -%>

<% } else { %>
<% } -%>
`;

// src/templates/templates/defaultStarNamedStarDefaultTemplate.ts
var defaultStarNamedStarDefaultTemplate = `
export * from <%-= it.options.quote %><%= it.statement.importPath %><%= it.statement.extname.render %><%= it.options.quote %>
<%- if (it.options.useSemicolon) { -%><%-= ";" -%><%- } -%>
`;

// src/templates/templates/indexFileDefaultTemplate.ts
var indexFileDefaultTemplate = `
<%- if (it.directive != null && it.directive !== '' && it.banner != null) { -%>
  <%-= it.directive -%>
  <%-= it.eol -%>
<%- } else if (it.directive != null && it.directive !== '') { -%>
  <%-= it.directive -%>
  <%-= it.eol -%><%-= it.eol -%>
<%- } -%>

<%- if (it.directive != null && it.directive !== '' && it.banner != null) { -%>
  <%-= it.banner -%>
  <%-= it.eol -%><%-= it.eol -%>
<%- } else if (it.banner != null) { -%>
  <%-= it.banner -%>
  <%-= it.eol -%><%-= it.eol -%>
<%- } -%>

<%-= it.content -%>
`;

// src/templates/templates/moduleIndexFileDefaultTemplate.ts
var moduleIndexFileDefaultTemplate = `
<% it.datas.forEach((data) => { %>
  import <%= data.statement.default.identifier.name %> from<%= " " %>
  <%-= it.options.quote %><%= data.statement.importPath %><%-= data.statement.default.identifier.name -%>
  <%-= data.statement.extname.render %><%-= it.options.quote %>
  <%- if (it.options.useSemicolon) { -%><%-= ";" -%><%- } -%>
<% }); %>

<%= "\\n" %>
<%= "\\n" %>

export {
  <% it.datas.forEach((data, index) => { %>
    <%= data.statement.default.identifier.name %><%- if (it.datas.length !== 1 && it.datas.length > index) { -%><%-= "," %><% } %>
  <% }); %>
}<%- if (it.options.useSemicolon) { -%><%-= ";" -%><%- } -%>
`;

// src/templates/templates/nestedOptionDefaultTemplate.ts
var nestedOptionDefaultTemplate = `
{
  <%- if (it.isComment && it.options.mode != null) { -%>
  // build mode
  // - create: create an \`index.ts\` file in each directory
  // - bundle: bundle all export information in one \`index.ts\` file
  <%- } -%>
  <%- if (it.options.mode != null) { -%>
  "mode": "<%= it.options.mode %>",
  <%- } -%>
  
  <%- if (it.isComment && it.options.project != null) { -%>
  // tsconfig.json path: you must pass path with filename, like this "./tsconfig.json"
  // only work root directory or cli parameter
  // 
  // @mode all
  <%- } -%>
  <%- if (it.options.project != null) { -%>
  "project": "<%= it.options.project %>",
  <%- } -%>
  
  <%- if (it.isComment && it.options.exportFilename != null) { -%>
  // Export filename, if you not pass this field that use "index.ts" or "index.d.ts"
  // 
  // @mode create, bundle, remove
  // @default index.ts
  <%- } -%>
  <%- if (it.options.exportFilename != null) { -%>
  "exportFilename": "<%= it.options.exportFilename %>",
  <%- } -%>
  
  <%- if (it.addEveryOptions && it.isComment && it.options.useSemicolon != null) { -%>
  // add ctix comment at first line of creted index.ts file, that remark created from ctix
  //
  // @mode create, bundle
  // @default false
  <%- } -%>
  <%- if (it.addEveryOptions && it.options.useSemicolon != null) { -%>
  "useSemicolon": <%= it.options.useSemicolon %>,
  <%- } -%>
  
  <%- if (it.addEveryOptions && it.isComment && it.options.useBanner != null) { -%>
  // add ctix comment at first line of creted index.ts file, that remark created from ctix
  //
  // @mode create, bundle
  // @default false
  <%- } -%>
  <%- if (it.addEveryOptions && it.options.useBanner != null) { -%>
  "useBanner": <%= it.options.useBanner %>,
  <%- } -%>
  
  <%- if (it.addEveryOptions && it.isComment && it.options.useTimestamp != null) { -%>
  // If specified as true, adds the created date to the top of the \`index.ts\` file,
  // this option only works if the \`useBanner\` option is enabled
  //
  // @mode create, bundle
  // @default false
  <%- } -%>
  <%- if (it.addEveryOptions && it.options.useTimestamp != null) { -%>
  "useTimestamp": <%= it.options.useTimestamp %>,
  <%- } -%>
  
  <%- if (it.addEveryOptions && it.isComment && it.options.quote != null) { -%>
  // quote mark " or '
  // @mode create, bundle
  // 
  // @default '
  <%- } -%>
  <%- if (it.addEveryOptions && it.options.quote != null) { -%>
  "quote": "<%= it.options.quote %>",
  <%- } -%>

  <%- if (it.addEveryOptions && it.isComment && it.options.directive != null) { -%>
  // Use to add a literal like \`"use strict"\` to the top. It will be added before the banner.
  //
  // @mode create, bundle
  <%- } -%>
  <%- if (it.addEveryOptions && it.options.directive != null) { -%>
  "directive": "<%= it.options.directive %>",
  <%- } -%>

  <%- if (it.addEveryOptions && it.isComment && it.options.fileExt != null) { -%>
  // keep file extension in export statement path
  //
  // if this option set true that see below
  // export * from './test.ts'
  //
  // @mode create, bundle
  // @default none
  <%- } -%>
  <%- if (it.addEveryOptions && it.options.fileExt != null) { -%>
  "fileExt": "<%= it.options.fileExt %>",
  <%- } -%>

  <%- if (it.addEveryOptions && it.isComment && it.options.overwrite != null) { -%>
  // overwrite each index.ts file
  // @mode create, bundle
  // @default false
  <%- } -%>
  <%- if (it.addEveryOptions && it.options.overwrite != null) { -%>
  "overwrite": <%= it.options.overwrite %>,
  <%- } -%>

  <%- if (it.addEveryOptions && it.isComment && it.options.backup != null) { -%>
  // Create a backup file if the \`index.ts\` file already exists. 
  // This option only works if the \`overwrite\` option is enabled.
  //
  // @mode create, bundle
  // @defulat true
  <%- } -%>
  <%- if (it.addEveryOptions && it.options.backup != null) { -%>
  "backup": <%= it.options.backup %>,
  <%- } -%>

  <%- if (it.addEveryOptions && it.isComment && it.options.generationStyle != null) { -%>
  // When generating the \`index.ts\` file, decide how you want to generate it
  //
  // @mode create, bundle
  // @default auto
  <%- } -%>
  <%- if (it.addEveryOptions && it.options.generationStyle != null) { -%>
  "generationStyle": "<%= it.options.generationStyle %>",
  <%- } -%>

  <%- if (it.isComment && it.options.include != null) { -%>
  // A list of files to use when generating the index.ts file. If no value is set,
  // the value of the include setting set in the tsconfig.json file will be used
  //
  // @mode create, bundle
  <%- } -%>
  <%- if (it.options.include != null) { -%>
  "include": <%= it.options.include %>,
  <%- } -%>

  <%- if (it.isComment && it.options.exclude != null) { -%>
  // A list of files to exclude when generating the index.ts file. If no value is set,
  // the value of the exclude setting set in the tsconfig.json file is used
  //
  // @mode create, bundle
  <%- } -%>
  <%- if (it.options.exclude != null) { -%>
  "exclude": <%= it.options.exclude %>,
  <%- } -%>

  <%- if (it.addEveryOptions && it.isComment && it.options.skipEmptyDir != null) { -%>
  // If \`skipEmptyDir\` is set to true, an empty directory with no files will not create an \`index.ts\` file
  //
  // @mode create
  // @default true
  <%- } -%>
  <%- if (it.addEveryOptions && it.options.skipEmptyDir != null) { -%>
  "skipEmptyDir": <%= it.options.skipEmptyDir %>,
  <%- } -%>

  <%- if (it.addEveryOptions && it.isComment && it.options.startFrom != null) { -%>
  // Specify the starting directory to start creating the \`index.ts\` file
  //
  // @mode create
  // @default tsconfig.json file directory
  <%- } -%>
  <%- if (it.addEveryOptions && it.options.startFrom != null) { -%>
  "startFrom": <%= it.options.startFrom %>,
  <%- } -%>

  <%- if (it.addEveryOptions && it.isComment && it.options.output != null) { -%>
  // Output directory. Default value is same project directory
  // @mode bundle
  <%- } -%>
  <%- if (it.addEveryOptions && it.options.output != null) { -%>
  "output": "<%= it.options.output %>",
  <%- } -%>

  <%- if (it.addEveryOptions && it.isComment && it.options.removeBackup != null) { -%>
  // remove with backup file
  // @mode remove
  // @default false
  <%- } -%>
  <%- if (it.addEveryOptions && it.options.removeBackup != null) { -%>
  "removeBackup": <%= it.options.removeBackup %>,
  <%- } -%>

  <%- if (it.addEveryOptions && it.isComment && it.options.forceYes != null) { -%>
  // answer \`yes\` to all questions
  // @mode remove
  // @default false
  <%- } -%>
  <%- if (it.addEveryOptions && it.options.forceYes != null) { -%>
  "forceYes": <%= it.options.forceYes %>,
  <%- } -%>
}
`;

// src/templates/templates/optionDefaultTemplate.ts
var optionDefaultTemplate = `
{
  <%- if (it.addEveryOptions && it.isComment && it.spinnerStream != null) { -%>
  // Stream of cli spinner, you can pass stdout or stderr
  //
  // @mode all
  // @default stdout
  <%- } -%>
  <%- if (it.addEveryOptions && it.spinnerStream != null) { -%>
  "spinnerStream": "<%= it.spinnerStream %>",
  <%- } -%>

  <%- if (it.addEveryOptions && it.isComment && it.progressStream) { -%>
  // Stream of cli progress, you can pass stdout or stderr
  //
  // @mode all
  // @default stdout
  <%- } -%>
  <%- if (it.addEveryOptions && it.progressStream != null) { -%>
  "progressStream": "<%= it.progressStream %>",
  <%- } -%>

  <%- if (it.addEveryOptions && it.isComment && it.reasonerStream != null) { -%>
  // Stream of cli reasoner. Reasoner show name conflict error and already exist index.ts file error.
  // You can pass stdout or stderr
  //
  // @mode all
  // @default stderr
  <%- } -%>
  <%- if (it.addEveryOptions && it.reasonerStream != null) { -%>
  "reasonerStream": "<%= it.reasonerStream %>",
  <%- } -%>

  "options": [<%= it.options %>]
}
`;

// src/templates/modules/TemplateContainer.ts
var import_consola2 = __toESM(require("consola"));
var import_eta = require("eta");
var import_my_easy_fp13 = require("my-easy-fp");
var import_node_fs2 = __toESM(require("fs"));
var _it5, _isBootstrap5, _templatePath, _templates, _eta;
var _TemplateContainer = class _TemplateContainer {
  constructor(args) {
    __privateAdd(this, _templatePath, void 0);
    __privateAdd(this, _templates, void 0);
    __privateAdd(this, _eta, void 0);
    __privateSet(this, _templatePath, args.templatePath);
    __privateSet(this, _templates, args.templates);
    __privateSet(this, _eta, new import_eta.Eta({ views: "ctix", autoEscape: false, rmWhitespace: true }));
    __privateGet(this, _eta).resolvePath = this.etaResolvePath.bind(this);
    __privateGet(this, _eta).readFile = this.etaReadFile.bind(this);
  }
  static get it() {
    return __privateGet(_TemplateContainer, _it5);
  }
  static get isBootstrap() {
    return __privateGet(_TemplateContainer, _isBootstrap5);
  }
  static getDefaultTemplate() {
    return /* @__PURE__ */ new Map([
      [CE_TEMPLATE_NAME.DECLARATION_FILE_TEMPLATE, declarationFileTemplate.trim()],
      [CE_TEMPLATE_NAME.MODULE_INDEX_FILE_TEMPLATE, moduleIndexFileDefaultTemplate.trim()],
      [CE_TEMPLATE_NAME.INDEX_FILE_TEMPLATE, indexFileDefaultTemplate.trim()],
      [CE_TEMPLATE_NAME.OPTIONS_TEMPLATE, optionDefaultTemplate.trim()],
      [CE_TEMPLATE_NAME.NESTED_OPTIONS_TEMPLATE, nestedOptionDefaultTemplate.trim()],
      [CE_GENERATION_STYLE.DEFAULT_ALIAS_NAMED_STAR, defaultAliasNamedStarDefaultTemplate.trim()],
      [
        CE_GENERATION_STYLE.DEFAULT_ALIAS_NAMED_DESTRUCTIVE,
        defaultAliasNamedDestructiveDefaultTemplate.trim()
      ],
      [
        CE_GENERATION_STYLE.DEFAULT_NON_ALIAS_NAMED_DESTRUCTIVE,
        defaultNonAliasNamedDestructiveDefaultTemplate.trim()
      ],
      [CE_GENERATION_STYLE.DEFAULT_STAR_NAMED_STAR, defaultStarNamedStarDefaultTemplate.trim()],
      [
        CE_GENERATION_STYLE.DEFAULT_STAR_NAMED_DESTRUCTIVE,
        defaultStarNamedDestructiveDefaultTemplate.trim()
      ]
    ]);
  }
  static async load(templatePath) {
    if (templatePath == null) {
      return _TemplateContainer.getDefaultTemplate();
    }
    const resolvedTemplateFilePath = posixResolve(templatePath);
    const templates = await _TemplateContainer.readFiles(resolvedTemplateFilePath);
    return /* @__PURE__ */ new Map([
      [CE_TEMPLATE_NAME.INDEX_FILE_TEMPLATE, templates.indexFile],
      [CE_TEMPLATE_NAME.OPTIONS_TEMPLATE, templates.options],
      [CE_TEMPLATE_NAME.NESTED_OPTIONS_TEMPLATE, templates.nestedOptions],
      [CE_TEMPLATE_NAME.MODULE_INDEX_FILE_TEMPLATE, templates.moduleIndexFile],
      [CE_TEMPLATE_NAME.DECLARATION_FILE_TEMPLATE, templates.declarationFile],
      [CE_GENERATION_STYLE.DEFAULT_ALIAS_NAMED_DESTRUCTIVE, templates.defaultAliasNamedDestructive],
      [
        CE_GENERATION_STYLE.DEFAULT_NON_ALIAS_NAMED_DESTRUCTIVE,
        templates.defaultNonAliasNamedDestructive
      ],
      [CE_GENERATION_STYLE.DEFAULT_STAR_NAMED_STAR, templates.defaultStarNamedStar],
      [CE_GENERATION_STYLE.DEFAULT_ALIAS_NAMED_STAR, templates.defaultAliasNamedStar],
      [CE_GENERATION_STYLE.DEFAULT_STAR_NAMED_DESTRUCTIVE, templates.defaultStarNamedDestructive]
    ]);
  }
  static async bootstrap(templatePath) {
    if (__privateGet(_TemplateContainer, _isBootstrap5)) {
      return;
    }
    const templates = await _TemplateContainer.load(templatePath);
    __privateSet(_TemplateContainer, _it5, new _TemplateContainer({ templatePath, templates }));
    __privateSet(_TemplateContainer, _isBootstrap5, true);
  }
  static getTemplateFileNames(basePath, templateName) {
    return posixJoin(basePath, addExt(templateName, "eta"));
  }
  static async readFiles(basePath) {
    const n = (t) => _TemplateContainer.getTemplateFileNames(basePath, t);
    const buffers = await Promise.all([
      import_node_fs2.default.promises.readFile(n(CE_TEMPLATE_NAME.INDEX_FILE_TEMPLATE)),
      import_node_fs2.default.promises.readFile(n(CE_TEMPLATE_NAME.OPTIONS_TEMPLATE)),
      import_node_fs2.default.promises.readFile(n(CE_TEMPLATE_NAME.NESTED_OPTIONS_TEMPLATE)),
      import_node_fs2.default.promises.readFile(n(CE_TEMPLATE_NAME.MODULE_INDEX_FILE_TEMPLATE)),
      import_node_fs2.default.promises.readFile(n(CE_TEMPLATE_NAME.DECLARATION_FILE_TEMPLATE)),
      import_node_fs2.default.promises.readFile(n(CE_GENERATION_STYLE.DEFAULT_ALIAS_NAMED_STAR)),
      import_node_fs2.default.promises.readFile(n(CE_GENERATION_STYLE.DEFAULT_ALIAS_NAMED_DESTRUCTIVE)),
      import_node_fs2.default.promises.readFile(n(CE_GENERATION_STYLE.DEFAULT_NON_ALIAS_NAMED_DESTRUCTIVE)),
      import_node_fs2.default.promises.readFile(n(CE_GENERATION_STYLE.DEFAULT_STAR_NAMED_STAR)),
      import_node_fs2.default.promises.readFile(n(CE_GENERATION_STYLE.DEFAULT_STAR_NAMED_DESTRUCTIVE))
    ]);
    const [
      indexFile,
      options,
      nestedOptions,
      moduleIndexFile,
      declarationFile,
      defaultAliasNamedStar,
      defaultAliasNamedDestructive,
      defaultNonAliasNamedDestructive,
      defaultStarNamedStar,
      defaultStarNamedDestructive
    ] = buffers.map((buffer) => buffer.toString().trim());
    return {
      indexFile,
      options,
      nestedOptions,
      moduleIndexFile,
      declarationFile,
      defaultAliasNamedStar,
      defaultAliasNamedDestructive,
      defaultNonAliasNamedDestructive,
      defaultStarNamedStar,
      defaultStarNamedDestructive
    };
  }
  static async evaluate(name, data, option) {
    try {
      if (!__privateGet(_TemplateContainer, _isBootstrap5)) {
        throw new Error("NOT_INITIALIZE_ERROR: please, initialize before use");
      }
      const rendered = await _TemplateContainer.it.evaluate(name, data, option);
      return rendered;
    } catch (caught) {
      const err = (0, import_my_easy_fp13.isError)(caught, new Error("raise error from evaluateTemplate"));
      import_consola2.default.error(`template: ${name}`, data);
      import_consola2.default.error(err);
      throw err;
    }
  }
  get templatePath() {
    return __privateGet(this, _templatePath);
  }
  // eslint-disable-next-line class-methods-use-this
  etaResolvePath(templatePath) {
    return templatePath;
  }
  etaReadFile(templatePath) {
    return __privateGet(this, _templates).get(templatePath) ?? defaultStarNamedStarDefaultTemplate.trim();
  }
  async evaluate(name, data, option) {
    try {
      if (__privateGet(this, _templates).get(name) == null) {
        throw new Error(`cannot found template: ${name}`);
      }
      if (option != null) {
        const rendered2 = __privateGet(this, _eta).withConfig(option).render(name, data);
        return rendered2;
      }
      const rendered = __privateGet(this, _eta).render(name, data);
      return rendered;
    } catch (caught) {
      const err = (0, import_my_easy_fp13.isError)(caught, new Error("raise error from evaluateTemplate"));
      import_consola2.default.error(`template: ${name}`, data);
      import_consola2.default.error(err);
      throw err;
    }
  }
};
_it5 = new WeakMap();
_isBootstrap5 = new WeakMap();
_templatePath = new WeakMap();
_templates = new WeakMap();
_eta = new WeakMap();
__privateAdd(_TemplateContainer, _it5, void 0);
__privateAdd(_TemplateContainer, _isBootstrap5, false);
var TemplateContainer = _TemplateContainer;

// src/modules/path/addCurrentDirPrefix.ts
var import_node_path12 = __toESM(require("path"));
function addCurrentDirPrefix(filePath, sep2) {
  const pathSep = sep2 ?? import_node_path12.default.posix.sep;
  if (filePath.startsWith(".")) {
    return filePath;
  }
  if (filePath === "") {
    return `.${pathSep}`;
  }
  return `.${pathSep}${filePath}`;
}

// src/modules/path/getImportStatementRemoveExtname.ts
function getImportStatementRemoveExtname(extname) {
  switch (extname) {
    case ".ts":
      return "";
    case ".tsx":
    case ".jsx":
      return "";
    case ".d.ts":
    case ".d.cts":
    case ".d.mts":
      return extname;
    case ".cts":
    case ".cjs":
      return "";
    case ".mts":
    case ".mjs":
      return "";
    default:
      return "";
  }
}

// src/modules/path/getImportStatementReplaceJs.ts
function getImportStatementReplaceJs(extname) {
  switch (extname) {
    case ".ts":
      return ".js";
    case ".tsx":
    case ".jsx":
      return ".jsx";
    case ".d.ts":
    case ".d.cts":
    case ".d.mts":
      return extname;
    case ".cts":
    case ".cjs":
      return ".cjs";
    case ".mts":
    case ".mjs":
      return ".mjs";
    default:
      return extname;
  }
}

// src/modules/path/getImportStatementExtname.ts
function getImportStatementExtname(option, extname) {
  switch (option) {
    case CE_EXTENSION_PROCESSING.KEEP_EXTENSION:
      return extname;
    case CE_EXTENSION_PROCESSING.REPLACE_JS:
      return getImportStatementReplaceJs(extname);
    default:
      return getImportStatementRemoveExtname(extname);
  }
}

// src/templates/modules/getInlineDeclarationRenderData.ts
var import_my_node_fp16 = require("my-node-fp");
var import_path = __toESM(require("path"));
var import_pathe6 = __toESM(require("pathe"));
function getInlineDeclarationRenderData(declarations, options) {
  const renderDatas = declarations.map((declaration) => {
    const extname = getExtname(declaration.filePath);
    const renderExtname = getImportStatementExtname(options.fileExt, extname);
    const dirname = import_pathe6.default.dirname(declaration.filePath);
    const basename2 = import_pathe6.default.basename(declaration.filePath, extname);
    const importPath = options.output != null ? addCurrentDirPrefix(posixRelative(options.output, import_pathe6.default.join(dirname, basename2))) : (0, import_my_node_fp16.replaceSepToPosix)(`.${import_path.default.posix.sep}${import_pathe6.default.join(dirname, basename2)}`);
    return {
      ...declaration,
      importPath,
      extname: {
        origin: extname,
        render: renderExtname
      }
    };
  });
  return renderDatas;
}

// src/templates/modules/getRenderData.ts
var import_my_node_fp17 = require("my-node-fp");
var import_node_path13 = __toESM(require("path"));
function getRenderData(option, filePath, statements, output) {
  const included = statements.filter((statement) => !statement.isExcluded);
  if (included.length <= 0) {
    return void 0;
  }
  const isHasPartialExclude = statements.length !== included.length;
  const defaultExport = included.find((statement) => !statement.isExcluded && statement.isDefault);
  const extname = getExtname(filePath);
  const renderExtname = getImportStatementExtname(option.fileExt, extname);
  const filename = filePath.replace(new RegExp(`${extname}$`), "");
  const relativePath = output != null ? addCurrentDirPrefix(posixRelative(output, filename)) : (0, import_my_node_fp17.replaceSepToPosix)(`.${import_node_path13.default.posix.sep}${(0, import_my_node_fp17.basenames)(filename, getExtname(filePath))}`);
  return {
    options: {
      quote: option.quote,
      useSemicolon: option.useSemicolon
    },
    filePath,
    statement: {
      extname: {
        origin: extname,
        render: renderExtname
      },
      importPath: relativePath,
      isHasDefault: defaultExport != null,
      isHasPartialExclude,
      default: defaultExport,
      named: statements.filter((statement) => !statement.isExcluded && !statement.isDefault)
    }
  };
}

// src/templates/const-enum/CE_AUTO_RENDER_CASE.ts
var CE_AUTO_RENDER_CASE = {
  // case 01.
  // default export (o)
  // named export   (o)
  // partial exclude (x)
  DEFAULT_NAMED: 1,
  // case 02.
  // default export (o)
  // named export   (x)
  // partial exclude (x)
  DEFAULT: 2,
  // case 03.
  // default export (x)
  // named export   (o)
  // partial exclude (x)
  NAMED: 3,
  // case 04.
  // default export (x)
  // named export   (o)
  // partial exclude (o)
  //
  // - partial exclude apply on default export
  // - partial exclude apply on named export and dosen't have a default export
  NAMED_PARTAL: 4,
  // case 05.
  // default export (o)
  // named export   (x)
  // partial exclude (o)
  //
  // - partial exclude apply on named export
  // - named export item only one
  DEFAULT_PARTIAL: 5,
  // case 06.
  // default export (o)
  // named export   (o)
  // partial exclude (o)
  //
  // - partial exclude apply on named export
  // - named export item more then one
  DEFAULT_NAMED_PARTIAL: 6,
  // unknown
  UNKNOWN: Number.MAX_SAFE_INTEGER
};

// src/templates/modules/getAutoRenderCase.ts
function getAutoRenderCase(renderData) {
  if (renderData.statement.isHasDefault && renderData.statement.named.length > 0 && !renderData.statement.isHasPartialExclude) {
    return {
      case: CE_AUTO_RENDER_CASE.DEFAULT_NAMED,
      style: CE_GENERATION_STYLE.DEFAULT_STAR_NAMED_STAR
    };
  }
  if (renderData.statement.isHasDefault && renderData.statement.named.length <= 0 && !renderData.statement.isHasPartialExclude) {
    return {
      case: CE_AUTO_RENDER_CASE.DEFAULT,
      style: CE_GENERATION_STYLE.DEFAULT_STAR_NAMED_STAR
    };
  }
  if (!renderData.statement.isHasDefault && renderData.statement.named.length > 0 && !renderData.statement.isHasPartialExclude) {
    return {
      case: CE_AUTO_RENDER_CASE.NAMED,
      style: CE_GENERATION_STYLE.DEFAULT_STAR_NAMED_STAR
    };
  }
  if (!renderData.statement.isHasDefault && renderData.statement.named.length > 0 && renderData.statement.isHasPartialExclude) {
    return {
      case: CE_AUTO_RENDER_CASE.NAMED_PARTAL,
      style: CE_GENERATION_STYLE.DEFAULT_ALIAS_NAMED_DESTRUCTIVE
    };
  }
  if (renderData.statement.isHasDefault && renderData.statement.named.length <= 0 && renderData.statement.isHasPartialExclude) {
    return {
      case: CE_AUTO_RENDER_CASE.DEFAULT_PARTIAL,
      style: CE_GENERATION_STYLE.DEFAULT_ALIAS_NAMED_STAR
    };
  }
  if (renderData.statement.isHasDefault && renderData.statement.named.length > 0 && renderData.statement.isHasPartialExclude) {
    return {
      case: CE_AUTO_RENDER_CASE.DEFAULT_PARTIAL,
      style: CE_GENERATION_STYLE.DEFAULT_ALIAS_NAMED_DESTRUCTIVE
    };
  }
  return {
    case: CE_AUTO_RENDER_CASE.UNKNOWN,
    style: CE_GENERATION_STYLE.DEFAULT_STAR_NAMED_STAR
  };
}

// src/templates/modules/getSelectStyle.ts
function getSelectStyle(params) {
  if (params.comment != null) {
    const style = getInlineStyle({
      comment: params.comment,
      options: {
        keyword: CE_INLINE_COMMENT_KEYWORD.FILE_GENERATION_STYLE_KEYWORD
      }
    });
    if (style != null) {
      return {
        case: CE_AUTO_RENDER_CASE.UNKNOWN,
        style: style?.style
      };
    }
  }
  if (params.options.style === CE_GENERATION_STYLE.AUTO) {
    return getAutoRenderCase(params.renderData);
  }
  return {
    case: CE_AUTO_RENDER_CASE.UNKNOWN,
    style: params.options.style
  };
}

// src/modules/commands/bundling.ts
var import_chalk4 = __toESM(require("chalk"));
var import_dayjs2 = __toESM(require("dayjs"));
async function bundling(buildOptions, bundleOption) {
  Spinner.it.start("ctix 'bundle' mode start, ...");
  if ("from" in buildOptions && buildOptions.from && typeof buildOptions.from === "string" && buildOptions.from !== "none") {
    Spinner.it.succeed(`ctix 'bundle' mode configuration reading from '${buildOptions.from}'`);
  }
  await TemplateContainer.bootstrap();
  const extendOptions = await getExtendOptions(bundleOption.project);
  const project = ProjectContainer.project(bundleOption.project);
  Spinner.it.succeed(`[${bundleOption.project}] loading compelete!`);
  Spinner.it.update("include, exclude config");
  const output = posixResolve(posixJoin(bundleOption.output, bundleOption.exportFilename));
  const filePaths = project.getSourceFiles().map((sourceFile) => sourceFile.getFilePath().toString());
  const include = new IncludeContainer({
    config: { include: getTsIncludeFiles({ config: bundleOption, extend: extendOptions }) },
    cwd: extendOptions.resolved.projectDirPath
  });
  const inlineExcludeds = getInlineCommentedFiles({
    project,
    filePaths,
    keyword: CE_INLINE_COMMENT_KEYWORD.FILE_EXCLUDE_KEYWORD
  });
  const exclude = new ExcludeContainer({
    config: {
      exclude: [...getTsExcludeFiles({ config: bundleOption, extend: extendOptions }), ...[output]]
    },
    inlineExcludeds,
    cwd: extendOptions.resolved.projectDirPath
  });
  const inlineDeclarations = getInlineCommentedFiles({
    project,
    filePaths,
    keyword: CE_INLINE_COMMENT_KEYWORD.FILE_DECLARATION_KEYWORD
  }).filter((declaration) => !exclude.isExclude(declaration.filePath)).filter((declaration) => {
    const sourceFile = project.getSourceFile(declaration.filePath);
    if (sourceFile == null) {
      return false;
    }
    return isDeclarationFile(sourceFile);
  });
  const filenames = filePaths.filter((filename) => include.isInclude(filename)).filter((filename) => !exclude.isExclude(filename));
  Spinner.it.succeed("analysis export statements completed!");
  Spinner.it.stop();
  if (filenames.length <= 0) {
    Spinner.it.fail(
      "Cannot find target files. Please add --include option or add include section in .ctirc file"
    );
    Spinner.it.stop();
    return;
  }
  ProgressBar.it.head = "    file ";
  ProgressBar.it.start(filenames.length, 0);
  const statements = (await Promise.all(
    filenames.map((filename) => project.getSourceFile(filename)).filter((sourceFile) => sourceFile != null).map(async (sourceFile) => {
      const exportStatement = getExportStatement(sourceFile, bundleOption, extendOptions);
      ProgressBar.it.increment();
      return exportStatement;
    })
  )).flat();
  ProgressBar.it.stop();
  const statementMap = /* @__PURE__ */ new Map();
  const statementTable = new StatementTable();
  statementTable.inserts(statements);
  Spinner.it.start(`build ${`"${import_chalk4.default.green(bundleOption.exportFilename)}"`} file start`);
  statements.filter((statement) => !statementTable.isDuplicate(statement)).forEach((statement) => {
    const filePath = posixJoin(statement.path.dirPath, statement.path.filename);
    const accessed = statementMap.get(filePath);
    if (accessed == null) {
      statementMap.set(filePath, [statement]);
    } else {
      accessed.push(statement);
      statementMap.set(filePath, accessed);
    }
  });
  const commentMap = new Map(
    Array.from(statementMap.keys()).map((filePath) => {
      const sourceFile = project.getSourceFile(filePath);
      if (sourceFile != null) {
        const comments = getSourceFileComments(sourceFile);
        return [filePath, comments];
      }
      return void 0;
    }).filter((comment) => comment != null)
  );
  Spinner.it.stop();
  ProgressBar.it.head = "  export ";
  ProgressBar.it.start(statements.length, 0);
  const datas = Array.from(statementMap.entries()).map(([filePath, exportStatements]) => {
    const data = getRenderData(bundleOption, filePath, exportStatements, bundleOption.output);
    return data;
  }).filter((renderData) => renderData != null).map((renderData) => {
    const comment = commentMap.get(renderData.filePath)?.comments.at(0);
    const style = getSelectStyle({
      comment,
      options: { style: bundleOption.generationStyle },
      renderData
    });
    ProgressBar.it.increment();
    return { renderData, ...style };
  });
  const inlineDeclarationsRendered = await TemplateContainer.evaluate(
    CE_TEMPLATE_NAME.DECLARATION_FILE_TEMPLATE,
    {
      options: { quote: bundleOption.quote, useSemicolon: bundleOption.useSemicolon },
      declarations: getInlineDeclarationRenderData(inlineDeclarations, bundleOption)
    }
  );
  const exportsRendered = (await Promise.all(
    datas.map(async (data) => {
      const evaluated = await TemplateContainer.evaluate(data.style, data.renderData);
      return evaluated;
    })
  )).filter((line) => line != null);
  ProgressBar.it.stop();
  Spinner.it.start("output file exists check, ...");
  const outputMap = /* @__PURE__ */ new Map();
  outputMap.set(output, [inlineDeclarationsRendered, ...exportsRendered].join("\n"));
  const fileExistReason = await checkOutputFile(outputMap);
  if (!bundleOption.overwrite && !bundleOption.backup && fileExistReason.length > 0) {
    Spinner.it.fail("ctix 'bundle' mode incomplete ...");
    Reasoner.it.start([...fileExistReason, ...statementTable.getDuplicateReason()]);
    return;
  }
  const indexFiles = await Promise.all(
    Array.from(outputMap.entries()).map(([filePath, fileContent]) => ({ filePath, fileContent })).map(async (file) => {
      return {
        path: file.filePath,
        content: await TemplateContainer.evaluate(CE_TEMPLATE_NAME.INDEX_FILE_TEMPLATE, {
          directive: bundleOption.directive,
          banner: getBanner(bundleOption, (0, import_dayjs2.default)()),
          eol: extendOptions.eol,
          content: file.fileContent
        })
      };
    })
  );
  await indexWrites(indexFiles, bundleOption, extendOptions);
  ProjectContainer.addSourceFilesAtPaths(bundleOption.project, Array.from(outputMap.keys()));
  Spinner.it.succeed(`${output} file build completed!`);
  Spinner.it.succeed("ctix 'bundle' mode completed!");
  Reasoner.it.start(statementTable.getDuplicateReason());
}

// src/modules/path/getAllParentDir.ts
var import_my_easy_fp14 = require("my-easy-fp");
var import_my_node_fp18 = require("my-node-fp");
var import_node_path14 = __toESM(require("path"));
function getAllParentDir(parentDir, childDir) {
  const parent = (0, import_my_node_fp18.startSepAppend)(parentDir, import_node_path14.default.posix.sep);
  const child = (0, import_my_node_fp18.startSepAppend)(childDir, import_node_path14.default.posix.sep);
  const elements = (0, import_my_node_fp18.startSepRemove)(child.replace(parent, ""), import_node_path14.default.posix.sep).split(import_node_path14.default.posix.sep).slice(0, -1);
  return [
    parentDir,
    ...(0, import_my_easy_fp14.populate)(elements.length, true).map((index) => {
      return posixJoin(parent, ...elements.slice(0, index));
    })
  ];
}

// src/modules/file/walk.ts
var import_my_node_fp19 = require("my-node-fp");
var import_node_fs3 = __toESM(require("fs"));
var import_types = require("util/types");
async function dfsWalk(currentDirPath, callback) {
  const resolved = posixResolve(currentDirPath);
  const readed = await import_node_fs3.default.promises.readdir(resolved);
  const dirPaths = (await Promise.all(
    readed.map(async (filePath) => {
      if (await (0, import_my_node_fp19.isDirectory)(posixJoin(resolved, filePath))) {
        return filePath;
      }
      return void 0;
    })
  )).filter((dirPath) => dirPath != null);
  const filePaths = readed.filter((filePath) => !dirPaths.includes(filePath));
  const callbacked = callback({ dirPath: currentDirPath, filePaths });
  if ((0, import_types.isPromise)(callbacked)) {
    await callbacked;
  }
  await dirPaths.reduce(async (prevHandle, dirPath) => {
    const handle = async () => {
      await dfsWalk(posixJoin(resolved, dirPath), callback);
    };
    await prevHandle;
    return handle();
  }, Promise.resolve());
}

// src/modules/path/getParentDir.ts
var import_my_node_fp20 = require("my-node-fp");
var import_node_path15 = __toESM(require("path"));
function getParentDir(rawDirPath) {
  const dirPath = (0, import_my_node_fp20.replaceSepToPosix)(rawDirPath);
  const elements = dirPath.split(import_node_path15.default.posix.sep);
  const parentElements = elements.slice(0, -1);
  if (parentElements.length === 1 && parentElements.at(0) === "") {
    return "/";
  }
  if (parentElements.length <= 0) {
    return void 0;
  }
  return parentElements.join(import_node_path15.default.posix.sep);
}

// src/templates/modules/createRenderData.ts
function createRenderData(renderCase, style, option, filePath, statement) {
  const renderData = {
    options: {
      quote: option.quote,
      useSemicolon: option.useSemicolon
    },
    filePath,
    statement
  };
  const data = {
    case: renderCase,
    style,
    renderData
  };
  return data;
}

// src/modules/commands/creating.ts
var import_chalk5 = __toESM(require("chalk"));
var import_dayjs3 = __toESM(require("dayjs"));
var import_my_node_fp21 = require("my-node-fp");
async function creating(_buildOptions, createOption) {
  Spinner.it.start("ctix 'create' mode start, ...");
  await TemplateContainer.bootstrap();
  const extendOptions = await getExtendOptions(createOption.project);
  const project = ProjectContainer.project(createOption.project);
  Spinner.it.succeed(`${createOption.project} loading complete!`);
  Spinner.it.update("include, exclude config");
  const filePaths = project.getSourceFiles().map((sourceFile) => sourceFile.getFilePath().toString());
  const include = new IncludeContainer({
    config: { include: getTsIncludeFiles({ config: createOption, extend: extendOptions }) },
    cwd: extendOptions.resolved.projectDirPath
  });
  const inlineExcludeds = getInlineCommentedFiles({
    project,
    filePaths,
    keyword: CE_INLINE_COMMENT_KEYWORD.FILE_EXCLUDE_KEYWORD
  });
  const outputExcludeds = await getOutputExcludedFiles({
    project,
    filePaths,
    extendOptions,
    exportFilename: createOption.exportFilename
  });
  const exclude = new ExcludeContainer({
    config: {
      exclude: [
        ...getTsExcludeFiles({ config: createOption, extend: extendOptions }),
        ...outputExcludeds
      ]
    },
    cwd: extendOptions.resolved.projectDirPath,
    inlineExcludeds
  });
  const filenames = filePaths.filter((filename) => include.isInclude(filename)).filter((filename) => !exclude.isExclude(filename));
  Spinner.it.succeed("analysis export statements completed!");
  Spinner.it.stop();
  if (filenames.length <= 0) {
    Spinner.it.fail(
      "Cannot find target files. Please add --include option or add include section in .ctirc file"
    );
    Spinner.it.stop();
    return;
  }
  ProgressBar.it.head = "    file ";
  ProgressBar.it.start(filenames.length, 0);
  const statements = (await Promise.all(
    filenames.map((filename) => project.getSourceFile(filename)).filter((sourceFile) => sourceFile != null).map(async (sourceFile) => {
      const statement = await getExportStatement(sourceFile, createOption, extendOptions);
      return statement;
    })
  )).flat();
  ProgressBar.it.stop();
  const filePathMap = /* @__PURE__ */ new Map();
  const dirPathMap = /* @__PURE__ */ new Map();
  const statementTable = new StatementTable();
  statementTable.inserts(statements);
  Spinner.it.start(`build ${`"${import_chalk5.default.green(createOption.exportFilename)}"`} file start`);
  statements.filter((statement) => !statementTable.isDuplicate(statement)).forEach((statement) => {
    const filePath = posixJoin(statement.path.dirPath, statement.path.filename);
    const filePathAccessed = filePathMap.get(filePath);
    if (filePathAccessed == null) {
      filePathMap.set(filePath, [statement]);
    } else {
      filePathAccessed.push(statement);
      filePathMap.set(filePath, filePathAccessed);
    }
    const dirPathAccessed = dirPathMap.get(statement.path.dirPath);
    if (dirPathAccessed == null) {
      dirPathMap.set(statement.path.dirPath, [statement]);
    } else {
      dirPathAccessed.push(statement);
      dirPathMap.set(statement.path.dirPath, dirPathAccessed);
    }
  });
  const commentMap = new Map(
    Array.from(filePathMap.keys()).map((filePath) => {
      const sourceFile = project.getSourceFile(filePath);
      if (sourceFile != null) {
        const comments = getSourceFileComments(sourceFile);
        return [filePath, comments];
      }
      return void 0;
    }).filter((comment) => comment != null)
  );
  Spinner.it.stop();
  ProgressBar.it.head = "  export ";
  ProgressBar.it.start(statements.length, 0);
  const renderDataMap = /* @__PURE__ */ new Map();
  Array.from(filePathMap.entries()).map(([filePath, exportStatements]) => getRenderData(createOption, filePath, exportStatements)).filter((renderData) => renderData != null).map((renderData) => {
    const comment = commentMap.get(renderData.filePath)?.comments.at(0);
    const styleInfo = comment != null ? getInlineStyle({
      comment,
      options: {
        keyword: CE_INLINE_COMMENT_KEYWORD.FILE_GENERATION_STYLE_KEYWORD
      }
    }) : void 0;
    const style = styleInfo?.style ?? createOption.generationStyle === CE_GENERATION_STYLE.AUTO ? getAutoRenderCase(renderData) : {
      case: CE_AUTO_RENDER_CASE.UNKNOWN,
      style: createOption.generationStyle
    };
    return { renderData, ...style };
  }).forEach((data) => {
    const key = (0, import_my_node_fp21.getDirnameSync)(data.renderData.filePath);
    const prev = renderDataMap.get(key);
    if (prev == null) {
      renderDataMap.set(key, [data]);
    } else {
      renderDataMap.set(key, [...prev, data]);
    }
    ProgressBar.it.increment();
  });
  await dfsWalk(createOption.startFrom, (params) => {
    if (createOption.startFrom === params.dirPath) {
      return;
    }
    const parentDir = getParentDir(params.dirPath);
    if (parentDir == null) {
      return;
    }
    if (createOption.skipEmptyDir) {
      if ((dirPathMap.get(params.dirPath) ?? []).length <= 0) {
        return;
      }
      const parentDirs = getAllParentDir(createOption.startFrom, params.dirPath);
      const firstExistDir = parentDirs.sort((l, r) => getDepth(r) - getDepth(l)).find((dir) => {
        if ((dirPathMap.get(dir) ?? []).length > 0) {
          return true;
        }
        if (dir === createOption.startFrom) {
          return true;
        }
        return false;
      });
      if (firstExistDir == null) {
        throw new Error("Cannot find the parent directory where the export statement is existed");
      }
      const indexRednerData = createRenderData(
        CE_AUTO_RENDER_CASE.DEFAULT_NAMED,
        CE_GENERATION_STYLE.DEFAULT_STAR_NAMED_STAR,
        createOption,
        posixJoin(firstExistDir, createOption.exportFilename),
        {
          importPath: addCurrentDirPrefix(posixRelative(firstExistDir, params.dirPath)),
          extname: {
            origin: ".ts",
            render: getImportStatementExtname(createOption.fileExt, ".ts")
          },
          isHasDefault: false,
          isHasPartialExclude: false,
          default: void 0,
          named: dirPathMap.get(params.dirPath) ?? []
        }
      );
      const prev = renderDataMap.get(firstExistDir);
      if (prev == null) {
        renderDataMap.set(firstExistDir, [indexRednerData]);
      } else {
        renderDataMap.set(firstExistDir, [...prev, indexRednerData]);
      }
    } else {
      const currentDirStatements = dirPathMap.get(params.dirPath) ?? [];
      const indexRednerData = createRenderData(
        CE_AUTO_RENDER_CASE.DEFAULT_NAMED,
        CE_GENERATION_STYLE.DEFAULT_STAR_NAMED_STAR,
        createOption,
        posixJoin(params.dirPath, createOption.exportFilename),
        {
          importPath: addCurrentDirPrefix(posixRelative(parentDir, params.dirPath)),
          extname: {
            origin: ".ts",
            render: getImportStatementExtname(createOption.fileExt, ".ts")
          },
          isHasDefault: false,
          isHasPartialExclude: false,
          default: void 0,
          named: currentDirStatements
        }
      );
      const prev = renderDataMap.get(parentDir);
      if (prev == null) {
        renderDataMap.set(parentDir, [indexRednerData]);
      } else {
        renderDataMap.set(parentDir, [...prev, indexRednerData]);
      }
    }
  });
  const rendereds = await Promise.all(
    Array.from(renderDataMap.entries()).map(async ([dirPath, datas]) => {
      const indexFilePath = posixJoin(dirPath, createOption.exportFilename);
      const rendered = await Promise.all(
        datas.map(async (data) => {
          const evaluated = await TemplateContainer.evaluate(data.style, data.renderData);
          return evaluated;
        })
      );
      return {
        filePath: indexFilePath,
        rendered: rendered.filter((line) => line != null && line !== "")
      };
    })
  );
  ProgressBar.it.stop();
  Spinner.it.start("output file exists check, ...");
  const outputMap = new Map(
    rendereds.map((render) => {
      return [render.filePath, render.rendered.join("\n")];
    })
  );
  const fileExistReason = await checkOutputFile(outputMap);
  if (!createOption.overwrite && !createOption.backup && fileExistReason.length > 0) {
    Spinner.it.fail("ctix 'create' mode incomplete ...");
    Reasoner.it.start([...fileExistReason, ...statementTable.getDuplicateReason()]);
    return;
  }
  const indexFiles = await Promise.all(
    Array.from(outputMap.entries()).map(([filePath, fileContent]) => ({ filePath, fileContent })).map(async (file) => {
      return {
        path: file.filePath,
        content: await TemplateContainer.evaluate(CE_TEMPLATE_NAME.INDEX_FILE_TEMPLATE, {
          directive: createOption.directive,
          banner: getBanner(createOption, (0, import_dayjs3.default)()),
          eol: extendOptions.eol,
          content: file.fileContent
        })
      };
    })
  );
  await indexWrites(indexFiles, createOption, extendOptions);
  ProjectContainer.addSourceFilesAtPaths(createOption.project, Array.from(outputMap.keys()));
  Reasoner.it.start(statementTable.getDuplicateReason());
  Spinner.it.succeed("ctix 'create' mode complete!");
}

// src/templates/modules/getModuleRenderData.ts
var import_my_node_fp22 = require("my-node-fp");
var import_node_path16 = __toESM(require("path"));
async function getModuleRenderData(option, filePath, output) {
  const extname = getExtname(filePath);
  const renderExtname = extname;
  const filename = import_node_path16.default.basename(filePath).replace(new RegExp(`${extname}$`), "");
  const dirPath = await (0, import_my_node_fp22.getDirname)(filePath);
  const relativePath = addCurrentDirPrefix(
    posixRelative(await (0, import_my_node_fp22.getDirname)(output), await (0, import_my_node_fp22.getDirname)(filePath))
  );
  const defaultExport = {
    path: {
      filename,
      dirPath,
      relativePath
    },
    pos: {
      line: 1,
      column: 1
    },
    depth: getRelativeDepth(option.project, dirPath),
    isDefault: true,
    identifier: {
      name: filename,
      alias: filename
    },
    isPureType: false,
    isAnonymous: false,
    isExcluded: false,
    comments: []
  };
  return {
    options: {
      quote: option.quote,
      useSemicolon: option.useSemicolon
    },
    filePath,
    statement: {
      extname: {
        origin: extname,
        render: renderExtname
      },
      importPath: relativePath,
      isHasDefault: true,
      isHasPartialExclude: false,
      default: defaultExport,
      named: []
    }
  };
}

// src/modules/commands/moduling.ts
var import_dayjs4 = __toESM(require("dayjs"));
async function moduling(_buildOptions, moduleOption) {
  Spinner.it.start("ctix 'module' mode start, ...");
  await TemplateContainer.bootstrap();
  const extendOptions = await getExtendOptions(moduleOption.project);
  const project = ProjectContainer.project(moduleOption.project);
  Spinner.it.succeed(`[${moduleOption.project}] loading compelete!`);
  Spinner.it.update("include, exclude config");
  const output = posixResolve(posixJoin(moduleOption.output, moduleOption.exportFilename));
  const include = new IncludeContainer({
    config: { include: getTsIncludeFiles({ config: moduleOption, extend: extendOptions }) },
    cwd: extendOptions.resolved.projectDirPath
  });
  const inlineExcludeds = getInlineCommentedFiles({
    project,
    filePaths: extendOptions.tsconfig.fileNames,
    keyword: CE_INLINE_COMMENT_KEYWORD.FILE_EXCLUDE_KEYWORD
  });
  const exclude = new ExcludeContainer({
    config: {
      exclude: [...getTsExcludeFiles({ config: moduleOption, extend: extendOptions }), ...[output]]
    },
    inlineExcludeds,
    cwd: extendOptions.resolved.projectDirPath
  });
  const filenames = include.files().filter((filename) => !exclude.isExclude(filename));
  Spinner.it.succeed("analysis export statements completed!");
  Spinner.it.stop();
  if (filenames.length <= 0) {
    Spinner.it.fail(
      "Cannot find target files. Please add --include option or add include section in .ctirc file"
    );
    Spinner.it.stop();
    return;
  }
  ProgressBar.it.head = "    file ";
  ProgressBar.it.start(filenames.length, 0);
  const datas = (await Promise.all(
    filenames.map(async (filename) => {
      const renderData = await getModuleRenderData(moduleOption, filename, moduleOption.output);
      ProgressBar.it.increment();
      return renderData;
    })
  )).filter((data) => data != null);
  const rendered = await TemplateContainer.evaluate(CE_TEMPLATE_NAME.MODULE_INDEX_FILE_TEMPLATE, {
    datas,
    options: moduleOption
  });
  ProgressBar.it.stop();
  Spinner.it.start("output file exists check, ...");
  const outputMap = /* @__PURE__ */ new Map();
  outputMap.set(output, rendered);
  const fileExistReason = await checkOutputFile(outputMap);
  if (!moduleOption.overwrite && !moduleOption.backup && fileExistReason.length > 0) {
    Spinner.it.fail("ctix 'bundle' mode incomplete ...");
    Reasoner.it.start(fileExistReason);
    return;
  }
  const indexFiles = await Promise.all(
    Array.from(outputMap.entries()).map(([filePath, fileContent]) => ({ filePath, fileContent })).map(async (file) => {
      return {
        path: file.filePath,
        content: await TemplateContainer.evaluate(CE_TEMPLATE_NAME.INDEX_FILE_TEMPLATE, {
          directive: moduleOption.directive,
          banner: getBanner(moduleOption, (0, import_dayjs4.default)()),
          eol: extendOptions.eol,
          content: file.fileContent
        })
      };
    })
  );
  await indexWrites(indexFiles, moduleOption, extendOptions);
  ProjectContainer.addSourceFilesAtPaths(moduleOption.project, Array.from(outputMap.keys()));
  Spinner.it.succeed(`${output} file build completed!`);
  Spinner.it.succeed("ctix 'bundle' mode completed!");
}

// src/modules/commands/building.ts
async function building(options) {
  await options.options.reduce(async (prevHandle, modeOption) => {
    const handle = () => {
      switch (modeOption.mode) {
        case CE_CTIX_BUILD_MODE.MODULE_MODE:
          return moduling(options, modeOption);
        case CE_CTIX_BUILD_MODE.CREATE_MODE:
          return creating(options, modeOption);
        default:
          return bundling(options, modeOption);
      }
    };
    await prevHandle;
    return handle();
  }, Promise.resolve());
}

// src/cli/commands/buildCommand.ts
var import_consola3 = __toESM(require("consola"));
async function buildCommandCode(argv) {
  const options = await createBuildOptions(argv);
  await building(options);
}
async function buildCommand(argv) {
  ProgressBar.it.enable = true;
  Spinner.it.enable = true;
  Reasoner.it.enable = true;
  try {
    await buildCommandCode(argv);
  } catch (err) {
    import_consola3.default.error(err);
  } finally {
    ProgressBar.it.stop();
    Spinner.it.stop();
  }
}

// src/configs/modules/getTsconfigComparer.ts
var import_node_path17 = __toESM(require("path"));
function getTsconfigComparer(cwd) {
  const comparer = (left, right) => {
    const leftDepth = getRelativeDepth(cwd, left);
    const rightDepth = getRelativeDepth(cwd, right);
    const depthDiff = leftDepth - rightDepth;
    if (depthDiff !== 0) {
      return depthDiff;
    }
    const leftBasename = import_node_path17.default.basename(left);
    const rightBasename = import_node_path17.default.basename(right);
    if (leftBasename === CE_CTIX_DEFAULT_VALUE.TSCONFIG_FILENAME) {
      return -1;
    }
    if (rightBasename === CE_CTIX_DEFAULT_VALUE.TSCONFIG_FILENAME) {
      return 1;
    }
    return left.localeCompare(right);
  };
  return comparer;
}

// src/cli/questions/askInitOptions.ts
var import_chalk6 = __toESM(require("chalk"));
var import_find_up = require("find-up");
var import_glob3 = require("glob");
var import_inquirer = __toESM(require("inquirer"));
var import_pathe7 = __toESM(require("pathe"));
async function askInitOptions() {
  const cwd = process.cwd();
  const cwdAnswer = await import_inquirer.default.prompt([
    {
      type: "input",
      name: "cwd",
      default: cwd,
      message: "Enter the working directory"
    }
  ]);
  const optionFilePath = import_pathe7.default.join(cwdAnswer.cwd, CE_CTIX_DEFAULT_VALUE.CONFIG_FILENAME);
  const optionFileExist = await (0, import_find_up.exists)(optionFilePath);
  const tsconfigGlob = new import_glob3.Glob(["**/tsconfig.json", "**/tsconfig.*.json"], {
    cwd: cwdAnswer.cwd,
    ignore: defaultExclude
  });
  const tsconfigFiles = getGlobFiles(tsconfigGlob);
  const packageJsonGlob = new import_glob3.Glob(["**/package.json"], {
    cwd: cwdAnswer.cwd,
    ignore: defaultExclude
  });
  const packageJsonFiles = getGlobFiles(packageJsonGlob);
  const sortedTsconfigFiles = tsconfigFiles.sort(getTsconfigComparer(cwdAnswer.cwd));
  const sortedPackageJsonFiles = packageJsonFiles.sort(getTsconfigComparer(cwdAnswer.cwd));
  const userSelectedAnswer = await import_inquirer.default.prompt([
    {
      type: "checkbox",
      name: "tsconfig",
      message: "Select your tsconfig files",
      default: sortedTsconfigFiles,
      choices: sortedTsconfigFiles
    },
    {
      type: "list",
      name: "mode",
      message: "Select index.ts file build mode",
      default: CE_CTIX_BUILD_MODE.BUNDLE_MODE,
      choices: [CE_CTIX_BUILD_MODE.BUNDLE_MODE, CE_CTIX_BUILD_MODE.CREATE_MODE]
    },
    {
      type: "confirm",
      name: "addEveryOptions",
      message: "Do you want to include all available options in the configuration file?",
      default: false
    },
    {
      type: "list",
      name: "configPosition",
      message: "Where do you want to add the configuration?",
      default: ".ctirc",
      choices: [".ctirc", "tsconfig.json", "package.json"]
    },
    {
      type: "list",
      name: "packageJson",
      message: "Select your package.json files",
      default: sortedPackageJsonFiles,
      choices: sortedPackageJsonFiles,
      when: (answer2) => {
        return answer2.configPosition === "package.json";
      }
    },
    {
      type: "confirm",
      name: "configComment",
      message: "Do you want to add a comment to the configuration?",
      default: true,
      when: (answer2) => {
        return answer2.configPosition !== "package.json";
      }
    },
    {
      type: "confirm",
      name: "confirmBackupPackageTsconfig",
      message: (answer2) => `Do you want to create a backup file from ${answer2.configPosition}?`,
      default: true,
      when: (answer2) => {
        return answer2.configPosition === "tsconfig.json";
      }
    },
    {
      type: "input",
      name: "exportFilename",
      default: CE_CTIX_DEFAULT_VALUE.EXPORT_FILENAME,
      message: "Enter the bundle file name"
    }
  ]);
  if (userSelectedAnswer.configPosition === ".ctirc" && optionFileExist) {
    const overwriteAnswer = await import_inquirer.default.prompt([
      {
        type: "confirm",
        name: "overwirte",
        message: `Already exists ${import_chalk6.default.redBright(optionFilePath)}, overwrite it?`,
        default: false
      }
    ]);
    if (!overwriteAnswer.overwirte) {
      return {
        cwd: cwdAnswer.cwd,
        overwirte: overwriteAnswer.overwirte,
        tsconfig: [],
        addEveryOptions: false,
        packageJson: import_pathe7.default.join(process.cwd(), CE_CTIX_DEFAULT_VALUE.PACKAGE_JSON_FILENAME),
        mode: CE_CTIX_BUILD_MODE.BUNDLE_MODE,
        configPosition: ".ctirc",
        configComment: true,
        confirmBackupPackageTsconfig: true,
        exportFilename: CE_CTIX_DEFAULT_VALUE.EXPORT_FILENAME
      };
    }
  }
  const answer = {
    ...cwdAnswer,
    ...userSelectedAnswer,
    overwirte: true
  };
  return answer;
}

// src/configs/modules/getDefaultInitAnswer.ts
var import_glob4 = require("glob");
var import_pathe8 = __toESM(require("pathe"));
async function getDefaultInitAnswer() {
  const cwd = process.cwd();
  const glob = new import_glob4.Glob(["**/tsconfig.json", "**/tsconfig.*.json"], {
    cwd,
    ignore: defaultExclude
  });
  const tsconfigFiles = getGlobFiles(glob);
  const sortedTsconfigFiles = tsconfigFiles.sort(getTsconfigComparer(cwd));
  const tsconfigPath = sortedTsconfigFiles.at(0);
  if (tsconfigPath == null) {
    throw new Error("tsconfig.json file was searched for but not found");
  }
  const answer = {
    cwd,
    tsconfig: [tsconfigPath],
    packageJson: import_pathe8.default.join(process.cwd(), CE_CTIX_DEFAULT_VALUE.PACKAGE_JSON_FILENAME),
    mode: CE_CTIX_BUILD_MODE.BUNDLE_MODE,
    exportFilename: CE_CTIX_DEFAULT_VALUE.EXPORT_FILENAME,
    addEveryOptions: false,
    configComment: true,
    configPosition: ".ctirc",
    confirmBackupPackageTsconfig: true,
    overwirte: true
  };
  return answer;
}

// src/modules/values/isConfigComment.ts
function isConfigComment(answer) {
  if (answer.configPosition === "package.json") {
    return false;
  }
  return answer.configComment;
}

// src/modules/commands/initializing.ts
var import_chalk7 = __toESM(require("chalk"));
var import_comment_json = require("comment-json");
var import_node_fs4 = __toESM(require("fs"));
var import_pathe9 = __toESM(require("pathe"));
async function initializing(option) {
  await TemplateContainer.bootstrap();
  const answer = option.forceYes ? await getDefaultInitAnswer() : await askInitOptions();
  if (!answer.overwirte) {
    const optionFilePath = import_pathe9.default.join(answer.cwd, CE_CTIX_DEFAULT_VALUE.CONFIG_FILENAME);
    Spinner.it.fail(`${import_chalk7.default.yellow(optionFilePath)} already exists`);
    return;
  }
  Spinner.it.start(`Start ctix ${import_chalk7.default.yellow("configuration")} generate ...`);
  const nestedOptions = await Promise.all(
    answer.tsconfig.map(async (tsconfigPath) => {
      Spinner.it.update(`Start option creation for: ${import_chalk7.default.yellow(tsconfigPath)}`);
      const tsconfig = getTypeScriptConfig(tsconfigPath);
      const { include, exclude } = getFileScope(tsconfig.raw);
      const initOption = answer.mode === CE_CTIX_BUILD_MODE.CREATE_MODE ? await transformCreateMode(
        { project: tsconfigPath, exportFilename: answer.exportFilename },
        { include, exclude }
      ) : transformBundleMode(
        { project: tsconfigPath, exportFilename: answer.exportFilename },
        { include, exclude }
      );
      Spinner.it.succeed(`${import_chalk7.default.yellow(tsconfigPath)} option creation completed!`);
      return {
        ...initOption,
        include: JSON.stringify(initOption.include),
        exclude: JSON.stringify(initOption.exclude),
        removeBackup: false,
        forceYes: false,
        mode: answer.mode
      };
    })
  );
  Spinner.it.start(`Start ${import_chalk7.default.yellow(".ctirc")} file write ...`);
  const renderedNestedOptions = await Promise.all(
    nestedOptions.map(async (initOption) => {
      const rendered = await TemplateContainer.evaluate(
        CE_TEMPLATE_NAME.NESTED_OPTIONS_TEMPLATE,
        {
          isComment: isConfigComment(answer),
          addEveryOptions: answer.addEveryOptions,
          options: initOption
        },
        {
          rmWhitespace: false
        }
      );
      return rendered;
    })
  );
  const renderedOptions = await TemplateContainer.evaluate(
    CE_TEMPLATE_NAME.OPTIONS_TEMPLATE,
    {
      config: CE_CTIX_DEFAULT_VALUE.CONFIG_FILENAME,
      isComment: isConfigComment(answer),
      addEveryOptions: answer.addEveryOptions,
      spinnerStream: "stdout",
      progressStream: "stdout",
      reasonerStream: "stderr",
      options: renderedNestedOptions.join(",\n")
    },
    { rmWhitespace: false }
  );
  const parsedRenderedOptions = (0, import_comment_json.parse)(renderedOptions);
  if (answer.configPosition === "tsconfig.json") {
    await Promise.all(
      answer.tsconfig.map(async (tsconfigFilePath) => {
        const resolvedTsconfigFilePath = import_pathe9.default.resolve(tsconfigFilePath);
        const buf = await import_node_fs4.default.promises.readFile(resolvedTsconfigFilePath);
        const parsedTsconfig = (0, import_comment_json.parse)(buf.toString());
        const newTsconfig = (0, import_comment_json.assign)(parsedTsconfig, { ctix: parsedRenderedOptions });
        if (answer.confirmBackupPackageTsconfig) {
          const backupFilePath = `${import_pathe9.default.basename(resolvedTsconfigFilePath)}.bak${import_pathe9.default.extname(resolvedTsconfigFilePath)}`;
          await import_node_fs4.default.promises.writeFile(backupFilePath, buf.toString());
        }
        await import_node_fs4.default.promises.writeFile(resolvedTsconfigFilePath, (0, import_comment_json.stringify)(newTsconfig, void 0, 2));
        Spinner.it.succeed(`${import_chalk7.default.yellow(resolvedTsconfigFilePath)} file modifing completed!`);
      })
    );
  } else if (answer.configPosition === "package.json") {
    const packageJsonFilePath = import_pathe9.default.resolve(answer.packageJson);
    const buf = await import_node_fs4.default.promises.readFile(packageJsonFilePath);
    const parsedPackageJson = (0, import_comment_json.parse)(buf.toString());
    const newPackageJson = (0, import_comment_json.assign)(parsedPackageJson, { ctix: parsedRenderedOptions });
    if (answer.confirmBackupPackageTsconfig) {
      const backupFilePath = `${import_pathe9.default.basename(packageJsonFilePath)}.bak${import_pathe9.default.extname(packageJsonFilePath)}`;
      await import_node_fs4.default.promises.writeFile(backupFilePath, buf.toString());
    }
    await import_node_fs4.default.promises.writeFile(packageJsonFilePath, (0, import_comment_json.stringify)(newPackageJson, void 0, 2));
    Spinner.it.succeed(`${import_chalk7.default.yellow(packageJsonFilePath)} file modifing completed!`);
  } else {
    await import_node_fs4.default.promises.writeFile(".ctirc", (0, import_comment_json.stringify)(parsedRenderedOptions, void 0, 2));
    Spinner.it.succeed(`${import_chalk7.default.yellow(".ctirc")} file writing completed!`);
  }
}

// src/cli/commands/initCommand.ts
var import_consola4 = __toESM(require("consola"));
async function initCommandCode(argv) {
  const option = {
    $kind: CE_CTIX_COMMAND.INIT_COMMAND,
    forceYes: argv.forceYes
  };
  await initializing(option);
}
async function initCommand(argv) {
  ProgressBar.it.enable = true;
  Spinner.it.enable = true;
  Reasoner.it.enable = true;
  try {
    await initCommandCode(argv);
  } catch (err) {
    import_consola4.default.error(err);
  } finally {
    ProgressBar.it.stop();
    Spinner.it.stop();
  }
}

// src/configs/transforms/createRemoveOptions.ts
function createRemoveOptions(argv) {
  const options = {
    $kind: CE_CTIX_COMMAND.REMOVE_COMMAND,
    config: argv.config,
    spinnerStream: argv.spinnerStream,
    progressStream: argv.progressStream,
    reasonerStream: argv.reasonerStream,
    removeBackup: argv.removeBackup,
    exportFilename: argv.exportFilename ?? CE_CTIX_DEFAULT_VALUE.EXPORT_FILENAME,
    forceYes: argv.forceYes
  };
  return options;
}

// src/cli/modules/getRatioNumber.ts
var import_mathjs = require("mathjs");
function getRatioNumber(num, base = 1) {
  return (0, import_mathjs.bignumber)(1).sub((0, import_mathjs.bignumber)(num)).mul(100 * base).floor().div(100).toNumber();
}

// src/cli/questions/askRemoveFiles.ts
var import_fuse = __toESM(require("fuse.js"));
var import_inquirer2 = __toESM(require("inquirer"));
var import_inquirer_ts_checkbox_plus_prompt = require("inquirer-ts-checkbox-plus-prompt");
async function askRemoveFiles(filePaths) {
  import_inquirer2.default.registerPrompt("checkbox-plus", import_inquirer_ts_checkbox_plus_prompt.CheckboxPlusPrompt);
  const choiceAbleTypes = filePaths.map((filePath) => {
    return {
      filePath,
      name: posixRelative(process.cwd(), filePath),
      value: filePath
    };
  });
  const fuse = new import_fuse.default(choiceAbleTypes, {
    includeScore: true,
    keys: ["identifier", "filePath"]
  });
  const answer = await import_inquirer2.default.prompt([
    {
      type: "checkbox-plus",
      name: "indexFiles",
      pageSize: 20,
      highlight: true,
      searchable: true,
      message: "Select `index.ts` for delete from project: ",
      default: choiceAbleTypes.map((item) => item.value),
      validate(removeIndexFiles) {
        if (removeIndexFiles.length === 0) {
          return "You must choose at least one type in `index.ts` files.";
        }
        return true;
      },
      source: (_answersSoFar, input) => {
        const safeInput = input == null ? "" : input;
        if (safeInput === "") {
          return Promise.resolve(choiceAbleTypes);
        }
        return Promise.resolve(
          fuse.search(safeInput).map((matched) => {
            return {
              ...matched,
              oneBased: getRatioNumber(matched.score ?? 0),
              percent: getRatioNumber(matched.score ?? 0, 100)
            };
          }).filter((matched) => matched.percent >= CE_CTIX_DEFAULT_VALUE.REMOVE_FILE_CHOICE_FUZZY).sort((l, r) => r.percent - l.percent).map((matched) => matched.item)
        );
      }
    }
  ]);
  return answer.indexFiles;
}

// src/modules/file/getRemoveFileGlobPattern.ts
var import_my_node_fp23 = require("my-node-fp");
async function getRemoveFileGlobPattern(argv, options) {
  const dirs = (await Promise.all(
    options.map(async (modeOption) => {
      const dir = await (0, import_my_node_fp23.getDirname)(modeOption.project);
      const results = [
        {
          origin: dir,
          project: modeOption.project,
          pattern: posixJoin(
            posixResolve(dir),
            "**",
            argv.exportFilename ?? modeOption.exportFilename
          )
        }
      ];
      if (argv.removeBackup) {
        results.push({
          origin: dir,
          project: modeOption.project,
          pattern: posixJoin(
            posixResolve(dir),
            "**",
            argv.exportFilename != null ? `${argv.exportFilename}.bak` : `${modeOption.exportFilename}.bak`
          )
        });
      }
      return results;
    })
  )).flat();
  return dirs;
}

// src/modules/file/unlinks.ts
var import_my_node_fp24 = require("my-node-fp");
var import_promises2 = require("fs/promises");
var import_types2 = require("util/types");
async function unlinks(filePaths, callback) {
  await Promise.all(
    filePaths.map(async (filePath) => {
      if (await (0, import_my_node_fp24.exists)(filePath)) {
        await (0, import_promises2.unlink)(filePath);
        if (callback != null) {
          const callbacked = callback(filePath);
          if ((0, import_types2.isPromise)(callbacked)) {
            await callbacked;
          }
        }
      }
    })
  );
}

// src/modules/commands/removing.ts
var import_chalk8 = __toESM(require("chalk"));
async function removing(options) {
  Spinner.it.start(`'index.ts' file remove start`);
  const patterns = await getRemoveFileGlobPattern(options, options.options);
  const include = new IncludeContainer({
    config: { include: patterns.map((projectDir) => projectDir.pattern) },
    cwd: process.cwd()
  });
  const filePaths = include.files();
  if (options.forceYes) {
    Spinner.it.succeed("enable force-yes, file removing without question");
    Spinner.it.stop();
    ProgressBar.it.start(filePaths.length);
    await unlinks(filePaths, () => {
      ProgressBar.it.increment();
    });
    ProgressBar.it.stop();
    await filePaths.reduce(async (prevHandle, filePath) => {
      const handle = async () => {
        Spinner.it.succeed(
          `${import_chalk8.default.redBright("removed:")} ${posixRelative(process.cwd(), filePath)}`
        );
      };
      await prevHandle;
      return handle();
    }, Promise.resolve());
    return;
  }
  Spinner.it.stop();
  ProgressBar.it.start(filePaths.length);
  const indexFiles = await askRemoveFiles(filePaths);
  await unlinks(indexFiles, () => {
    ProgressBar.it.increment();
  });
  ProgressBar.it.stop();
  await filePaths.reduce(async (prevHandle, filePath) => {
    const handle = async () => {
      Spinner.it.succeed(
        `${import_chalk8.default.redBright("removed:")} ${posixRelative(process.cwd(), filePath)}`
      );
    };
    await prevHandle;
    return handle();
  }, Promise.resolve());
}

// src/cli/commands/removeCommand.ts
var import_consola5 = __toESM(require("consola"));
async function removeCommandCode(argv) {
  const options = await createBuildOptions(argv);
  const removeOptions = createRemoveOptions(argv);
  await removing({ ...options, ...removeOptions });
}
async function removeCommand(argv) {
  ProgressBar.it.enable = true;
  Spinner.it.enable = true;
  Reasoner.it.enable = true;
  try {
    await removeCommandCode(argv);
  } catch (err) {
    import_consola5.default.error(err);
  } finally {
    ProgressBar.it.stop();
    Spinner.it.stop();
  }
}

// src/cli/questions/askInitOverwrite.ts
function askInitOverwrite() {
}

// src/comments/const-enum/CE_INLINE_EXCLUDE_KIND.ts
var CE_INLINE_EXCLUDE_KIND = {
  FILE_EXCLUDE_KEYWORD: "file",
  NEXT_STATEMENT_EXCLUDE_KEYWORD: "next-statement"
};

// src/modules/file/endsEol.ts
var import_my_easy_fp15 = require("my-easy-fp");
function endsEol(content, eol, size) {
  if (content.endsWith(eol)) {
    return content;
  }
  const multiplier = size ?? 1;
  const eols = (0, import_my_easy_fp15.populate)(multiplier).map(() => eol).join("");
  return `${content}${eols}`;
}

// src/configs/modules/json/readJsonConfig.ts
var import_node_fs5 = __toESM(require("fs"));
async function readJsonConfig(jsonConfigFilePath) {
  const buf = await import_node_fs5.default.promises.readFile(jsonConfigFilePath);
  const packageJsonParsed = readJsonc(buf);
  if (packageJsonParsed.type === "fail") {
    return void 0;
  }
  return packageJsonParsed.pass;
}

// src/configs/modules/json/safeJsonc.ts
function safeJsonc(buf) {
  try {
    const json = readJsonc(buf);
    if (json.type === "pass") {
      return json.pass;
    }
    return void 0;
  } catch {
    return void 0;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CE_AUTO_RENDER_CASE,
  CE_CTIX_BUILD_MODE,
  CE_CTIX_COMMAND,
  CE_CTIX_DEFAULT_VALUE,
  CE_EXTENSION_PROCESSING,
  CE_GENERATION_STYLE,
  CE_INLINE_COMMENT_KEYWORD,
  CE_INLINE_EXCLUDE_KIND,
  CE_TEMPLATE_NAME,
  ExcludeContainer,
  IncludeContainer,
  ProgressBar,
  ProjectContainer,
  Reasoner,
  Spinner,
  StatementTable,
  SymbolTable,
  TemplateContainer,
  addCurrentDirPrefix,
  addExt,
  askInitOptions,
  askInitOverwrite,
  askRemoveFiles,
  buildCommand,
  building,
  bundling,
  castConfig,
  checkOutputFile,
  createBuildOptions,
  createRemoveOptions,
  createRenderData,
  creating,
  declarationFileTemplate,
  defaultAliasNamedDestructiveDefaultTemplate,
  defaultAliasNamedStarDefaultTemplate,
  defaultExclude,
  defaultNonAliasNamedDestructiveDefaultTemplate,
  defaultStarNamedDestructiveDefaultTemplate,
  defaultStarNamedStarDefaultTemplate,
  dfsWalk,
  endsEol,
  extensions,
  filenamify,
  getAllParentDir,
  getAutoRenderCase,
  getBanner,
  getCheckedValue,
  getCommand,
  getCommentKind,
  getCommentWorkspace,
  getCommentWorkspaces,
  getCommentsWithParent,
  getConfigFilePath,
  getConfigObject,
  getConfigValue,
  getDefaultInitAnswer,
  getDepth,
  getEOL,
  getExportAssignmentMap,
  getExportStatement,
  getExportedKind,
  getExtendOptions,
  getExtname,
  getFileScope,
  getFunctionName,
  getGenerationStyle,
  getGlobFiles,
  getImportStatementExtname,
  getImportStatementRemoveExtname,
  getImportStatementReplaceJs,
  getInlineCommented,
  getInlineCommentedFiles,
  getInlineDeclarationRenderData,
  getInlineStyle,
  getJsDocComment,
  getJsDocTag,
  getModuleRenderData,
  getNodeComments,
  getOutputExcludedFiles,
  getOutputValue,
  getParentDir,
  getRatioNumber,
  getRelativeDepth,
  getRemoveFileGlobPattern,
  getRenderData,
  getSelectStyle,
  getSourceFileComments,
  getSourceFileEol,
  getStatementAlias,
  getString,
  getSummaryStatement,
  getTsExcludeFiles,
  getTsIncludeFiles,
  getTsconfigComparer,
  getTypeScriptConfig,
  getTypeScriptProject,
  indexFileDefaultTemplate,
  indexWrites,
  initCommand,
  initializing,
  isConfigComment,
  isDeclaration,
  isDeclarationFile,
  loadConfig,
  moduleIndexFileDefaultTemplate,
  moduling,
  nestedOptionDefaultTemplate,
  optionDefaultTemplate,
  parseConfig,
  posixJoin,
  posixRelative,
  posixResolve,
  prettifing,
  readConfigFromFile,
  readConfigFromPackageJson,
  readConfigFromTsconfigJson,
  readJson5,
  readJsonConfig,
  readJsonc,
  readYaml,
  removeCommand,
  removing,
  safeJsonc,
  setCommandInitOptions,
  setCommandRemoveOptions,
  setModeBundleOptions,
  setModeCreateOptions,
  setModeGenerateOptions,
  setProjectOptions,
  transformBundleMode,
  transformCreateMode,
  transformModuleMode,
  unlinks
});
//# sourceMappingURL=index.cjs.map
