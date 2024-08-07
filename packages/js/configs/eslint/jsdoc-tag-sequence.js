/**
 * @type {{tags:string[]}[]}
 */
export default [
    // Access
    {
        tags: ["static", "private", "protected", "public", "access", "package"],
    },

    // Brief descriptions
    {
        tags: ["summary", "typeSummary"],
    },

    // Module/file-level
    {
        tags: [
            "module",
            "exports",
            "file",
            "fileoverview",
            "overview",
            "import",
        ],
    },

    // Identifying (name, type)
    {
        tags: [
            "typedef",
            "interface",
            "record",
            "template",
            "name",
            "kind",
            "type",
            "alias",
            "external",
            "host",
            "callback",
            "func",
            "function",
            "method",
            "class",
            "constructor",
        ],
    },

    // Relationships
    {
        tags: [
            "modifies",
            "mixes",
            "mixin",
            "mixinClass",
            "mixinFunction",
            "namespace",
            "borrows",
            "constructs",
            "lends",
            "implements",
            "requires",
        ],
    },

    // Long descriptions
    {
        tags: [
            "desc",
            "description",
            "classdesc",
            "tutorial",
            "copyright",
            "license",
        ],
    },

    // Simple annotations
    {
        tags: [
            "const",
            "constant",
            "final",
            "global",
            "readonly",
            "abstract",
            "virtual",
            "var",
            "member",
            "memberof",
            "memberof!",
            "inner",
            "instance",
            "inheritdoc",
            "inheritDoc",
            "override",
            "hideconstructor",

            // Xenon Reactive
            "reactive",
            "shallow",
            "val",
        ],
    },

    // Core function/object info
    {
        tags: [
            "param",
            "arg",
            "argument",
            "prop",
            "property",
            "return",
            "returns",
        ],
    },

    // Important behavior details
    {
        tags: [
            "async",
            "generator",
            "default",
            "defaultvalue",
            "enum",
            "augments",
            "extends",
            "throws",
            "exception",
            "yield",
            "yields",
            "event",
            "fires",
            "emits",
            "listens",
            "this",
        ],
    },

    // Supplementary descriptions
    {
        tags: ["see", "example"],
    },

    // METADATA
    {
        tags: ["author", "version", "since", "deprecated"],
    },
];
