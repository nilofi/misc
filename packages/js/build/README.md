<!-- 标志 -->
<p align="center">
  <a target="_blank" rel="noopener noreferrer">
    <img width="150" src="https://rollupjs.org/rollup-logo.svg" alt="logo">
  </a>
</p>
<!-- 名字 -->
<h1 align="center">Xenon JavaScript Build Tool</h1>
<!-- 描述 -->
<p align="center">A modern JavaScript building tool out of the box.</p>
<br/>

Read this in other languages: English | [简体中文](./README_zh-CN.md)

## Introduction

Nowadays, if you want to build a modern, cross-platform supported JavaScript library is not easy, this tool provides developers with a quick and efficient solution to simplify the process with good presets and rich features.

- Good presets based on Rollup, ready to use out of the box
- Support for TypeScript
- Support for exporting both ESM and CJS module formats simultaneously
- Support for subpath exports
- Support for subpath imports
- Support for automatic generation of conditional constants
- Support for automatic handling of TypeScript Paths

## Installation

Can be installed as a project development dependency:

```shell
npm install -D @xenon.js/build
```

Or run the build tool directly:

```shell
npx xe-build
```

## Quick Start

Let's create an empty project first:

```shell
npm init -y
```

The build tool uses `src` as the source code directory, so please create a script file `lib.ts` in the `src` directory:

```ts
export const str = "hello world.";
```

To use this script as the library's entry point, configure in `package.json`:

```json
{
  "exports": "./dist/lib.js"
}
```

Now you can run `npx xe-build` to build.

You'll see the build artifacts output in the `dist` directory, and you've completed the simplest library build!

If you want to automatically build when source files change, run:

```shell
npx xe-build -w
```

## Path Auto-Mapping Rules

In the `bin` and `exports` fields, only build artifact paths (such as `./dist/lib.js`) are used, so the tool will map them to source files.

First, you need to know that the tool will merge all subpaths with the same conditions into one build.

This means that if your project has ESM artifacts for `import` and CJS artifacts for `require`, even if there's only one entry point, two builds will be executed because there are two conditions. For more scenarios that may lead to multiple builds, refer to [Conditional Exports](#conditional-exports).

So if there are multiple builds, of course, they can't all output to the root of `dist`, otherwise there might be overwriting. Therefore, the tool will use the following rules:

- When there's only one build, `dist/xxx.js` will be directly mapped to `src/xxx.ts`
- When there are multiple builds, if your source file is `src/xxx.ts`, don't directly configure `dist/xxx.js`, because the tool will map starting from the subdirectory of `dist`, for example, `dist/es/xxx.js` will be mapped to `src/xxx.ts`

Note that the mapping rules for `bin` configuration are different, it will always map starting from `dist/bin`, for example, `dist/bin/xxx.js` will be mapped to `src/xxx.ts`, and its existence will be considered as having multiple builds.

## Basic Features

### Multiple Entry Points

If your library needs multiple entry points, you just need to configure the `exports` field according to the [Node.js documentation](https://nodejs.org/docs/latest-v20.x/api/packages.html#subpath-exports):

```json
{
  "exports": {
    ".": "./dist/index.js",
    "./sub": "./dist/sub/index.js"
  }
}
```

The tool will traverse all subpaths in `exports` and use all subpaths as entry points for building.

In the above example, `./src/index.ts` and `./src/sub/index.ts` will be built as two entry points.

Different subpaths with the same conditions will be merged into one build as multiple entry points, rather than as multiple independent builds.

### Generating TypeScript Declaration Files

Enabling the `emitDeclarationFile` option will generate `.d.ts` declaration files in the same directory, which is enabled by default.

Additionally, the tool will enable the `autoFixDeclarationFileExt` option by default to attempt to fix [TypeScript issue #53045](https://github.com/microsoft/TypeScript/issues/53045).

These options can be enabled or disabled through the [configuration file](#using-configuration-file).

### Conditional Exports

For a detailed introduction to conditional exports, please refer to the [Node.js documentation](https://nodejs.org/docs/latest-v20.x/api/packages.html#conditional-exports).

Conditional exports have several typical use cases:

#### Export Both ESM and CJS Modules Simultaneously

Just add `import` or `require` conditions to the entry points in `exports`:

```json
{
  "exports": {
    ".": {
      "import": "./dist/es/index.js",
      "require": "./dist/cjs/index.cjs"
    }
  }
}
```

If there are no explicit `import` or `require` conditions, the output module format will be determined based on the `type` field in `package.json`.

**Controlling the Output File Extensions**

The output file extensions are automatically determined based on conditions and the `type` field of the code package.

For example, the default output file extension for `require` conditions with `type: "module"` is `.cjs`, meaning that even if you specify `"require": "./dist/cjs/index.mjs"`, it will not output a file with the `.mjs` extension.

If you need to force a specific extension, you can add the `forceExts` field in the [configuration file](#using-configuration-file):

```js
export default {
    forceExts: { esm: ".mjs", cjs: ".cjs" },
};
```

You can use the [Are the types wrong?](https://arethetypeswrong.github.io) website to check if your package can be imported correctly.

#### Export Different Entry Points Based on Platform

Suppose your library needs to export different entry points based on the execution environment, you can do this:

```json
{
  "exports": {
    ".": {
      "node": {
        "import": "./dist/node-es/index.js",
        "require": "./dist/node-cjs/index.cjs"
      },
      "default": {
        "import": "./dist/default-es/index.js",
        "require": "./dist/default-cjs/index.cjs"
      }
    },
    "./sub": {
      "node": {
        "import": "./dist/node-es/sub/index.js",
        "require": "./dist/node-cjs/sub/index.cjs"
      },
      "default": {
        "import": "./dist/default-es/sub/index.js",
        "require": "./dist/default-cjs/sub/index.cjs"
      }
    },
  }
}
```

The above example will generate four build tasks:

1. Build conditions: `node`, `import`, entry points: `.`, `./sub`
2. Build conditions: `node`, `require`, entry points: `.`, `./sub`
3. Build conditions: `default`, `import`, entry points: `.`, `./sub`
4. Build conditions: `default`, `require`, entry points: `.`, `./sub`

### Using Build Condition Constant Module

The build condition constant module is a built-in plugin of the build tool, which will generate all conditions used in `exports` as constants and export them through the `internal/constants` module.

For example, the build example above has four conditions in total: `node`, `import`, `require`, `default` (`types` will be ignored).

So it will generate a module similar to the following:

```ts
declare module "internal/constants" {
    /**
     * Compile target is NodeJS
     */
    export const NODE: boolean;

    /**
     * Compile target is Default
     */
    export const DEFAULT: boolean;

    /**
     * Compile target is ESM
     */
    export const IMPORT: boolean;

    /**
     * Compile target is CJS
     */
    export const REQUIRE: boolean;
}
```

You can create a `constants.d.ts` file similar to the above content to provide code hints.

Note that the names will be converted to all uppercase, and can be used in the project like this:

```ts
import { NODE } from "internal/constants";

if (NODE) {
  console.log("Running in Node.js.");
} else {
  console.log("Running in other platform.");
}
```

When a `node` condition exists in a build, the `NODE` constant will be `true`, to achieve the effect of tree-shaking or executing different logic.

You can create a [configuration file](#using-configuration-file) and add a `constants` field to add more build constants on this basis:

```js
import { readFileSync } from "fs";

const { version } = JSON.parse(
    readFileSync("./package.json", { encoding: "utf-8" }),
);

export default {
    constants: {
        VERSION: version,
    },
};
```

### Using Subpath Imports

For a detailed introduction to subpath imports, please refer to the [Node.js documentation](https://nodejs.org/docs/latest-v20.x/api/packages.html#subpath-imports).

Suppose you have three files at the same time:

- `lib.ts`
- `lib.node.ts`
- `lib.browser.ts`

And configured the `imports` field:

```json
{
  "imports": {
    "#lib.ts": {
      "node": "./src/lib.node.ts",
      "browser": "./src/lib.browser.ts",
      "default": "./src/lib.ts"
    }
  }
}
```

Then you can import different modules based on the platform by importing this path internally in the project:

```ts
import * as lib from "#lib.ts";
```

By default, the `autoFixImportsPath` option is enabled, which automatically replaces all import paths in the project with paths existing in `imports` before the build. If this feature encounters issues, it can be disabled through the [configuration file](#using-configuration-file):

```js
export default {
    autoFixImportsPath: false,
};
```

### Building Executable Entry Points

If your library needs to build an executable entry point, you can configure it through the `bin` field:

```json
{
  "bin": {
    "cli": "./dist/bin/cli.js"
  }
}
```

The tool will only process files in the `dist/bin` path, other paths will be ignored, and it will generate a separate `bin` build, so note that if there are also target paths under the `dist/bin` directory in `exports`, they will be executed as the same build.

You can create a [configuration file](#using-configuration-file) and add a `binConditions` field to configure the conditions to use:

```js
export default {
    binConditions: ["node", "import"],
};
```

## More Features

### Automatic Entry Point Generation

You can create a [configuration file](#using-configuration-file) and add the `entryPoint` field configuration:

```js
export default {
    entryPoint: {
        atBuild: true,
        entryPoints: {
            ".": "./src/index.ts",
            "./polyfills": "./src/polyfills.ts",
        },
        conditions: ["node", "default"],
    },
};
```

The above configuration will automatically generate the following `package.json` content:

```json
"exports": {
  ".": {
    "node": {
      "import": "./dist/node-es/index.js",
      "require": "./dist/node-cjs/index.cjs"
    },
    "default": {
      "import": "./dist/default-es/index.js",
      "require": "./dist/default-cjs/index.cjs"
    }
  },
  "./polyfills": {
    "node": {
      "import": "./dist/node-es/polyfills.js",
      "require": "./dist/node-cjs/polyfills.cjs"
    },
    "default": {
      "import": "./dist/default-es/polyfills.js",
      "require": "./dist/default-cjs/polyfills.cjs"
    }
  },
}
```

### Automatic Barrel File Generation

You can create a [configuration file](#using-configuration-file) and add the `barrel` field configuration:

```js
export default {
    barrel: {
        atBuild: true,
        files: [
            {
                file: "./src/index.ts",
                include: ["src/**/*"],
                exclude: [
                    "**/*polyfills*/**",
                    "**/*polyfills*",
                ],
                ctix: {},
            },
        ],
    },
};
```

The above configuration will automatically generate the following `index.ts` content:

```ts
// created from ctix

import "./internal/singleton-check.js";
export * from "./exports/boost-utils.js";
export * from "./exports/disposal-symbol.js";
```

Internally, the tool uses the [ctix](https://github.com/imjuni/ctix) library's `bundle mode`, and you can modify any configuration through the `ctix` field.

### Module Declaration File Generation

This feature is generally used to generate a `modules.json` file that records all module information.

For details, refer to the usage of [@xenon.js](https://github.com/nilofi/xenon.js).

### API Report Generation

You can create a [configuration file](#using-configuration-file) and add the `apiReport` field configuration:

```js
export default {
    apiReport: {
        atBuild: true,
        output: "./.report/api-report",
    },
};
```

Internally, the tool uses [api-extractor](https://api-extractor.com/) to generate a public interface report for each entry point.

## More Configuration

### Command Line Options

You can execute

```shell
npx xe-build -h
```

to view all available command line options.

Some configurations can be passed directly as command line parameters, for example:

```shell
npx xe-build --binConditions node production --onlyBuildConditions node
```

Options passed as command line parameters will override those in the configuration file.

### Using Configuration File

You can create a `xebuild.config.js` configuration file in the project root directory, and the build tool will read this file path as the configuration by default.

```js
/**
 * @type {import("@xenon.js/build").ConfigInput}
 */
export default {};
```

If you want to put the configuration file in another path, please specify the configuration file path when executing the build:

```shell
npx xe-build --config ./configs/xebuild.config.js
```
If a relative path is passed, it needs to be relative to the execution directory.

## Notes

- Currently, other source file extensions besides `.ts` are not supported. (TODO)
- Currently, exporting or importing subpaths containing the `*` wildcard is not supported. (TODO)
- Currently, custom source directory `src` and build output directory `dist` are not allowed. (TODO)
- Currently, any condition other than `import`, `require`, or `default` will be considered as multiple builds. (TODO)

## Contributing

If you want to contribute to the project, please refer to the [Contribution Guide](./CONTRIBUTING.md).

## License

[MIT @ SmallMain](./LICENSE)
