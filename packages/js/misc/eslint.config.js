import { eslint } from "@xenon.js/configs";

export default [
    ...eslint.config({
        jsdocDefinedTags: [
            "ctix-exclude",
            "ctix-generation-style",
            "ctix-exclude-next",
        ],
    }),
];
