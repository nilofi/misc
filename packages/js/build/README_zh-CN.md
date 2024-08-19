<!-- 标志 -->
<p align="center">
  <a target="_blank" rel="noopener noreferrer">
    <img width="150" src="https://rollupjs.org/rollup-logo.svg" alt="logo">
  </a>
</p>
<!-- 名字 -->
<h1 align="center">Xenon JavaScript Build Tool</h1>
<!-- 描述 -->
<p align="center">一个开箱即用的现代化 JavaScript 构建工具。</p>
<br/>

阅读其它语言版本: [English](./README.md) | 简体中文

## 简介

现在如果想要构建一个现代化、跨平台支持的 JavaScript 库并不简单，本工具通过良好的预设和丰富的特性为开发者提供一种快速高效的解决方案以简化这一过程。

- 基于 Rollup 的良好预设，开箱即用
- 支持 TypeScript
- 支持同时导出 ESM 与 CJS 两种模块格式
- 支持子路径导出
- 支持子路径导入
- 支持自动生成条件常量
- 支持自动处理 TypeScript Paths

## 安装

可安装为项目的开发依赖：

```shell
npm install -D @xenon.js/build
```

或者直接运行构建工具：

```shell
npx xe-build
```

## 快速上手

让我们先创建一个空项目：

```shell
npm init -y
```

构建工具将 `src` 作为源码目录，所以请在 `src` 目录中创建一个脚本文件 `lib.ts`：

```ts
export const str = "hello world.";
```

为了将该脚本作为库的入口点，在 `package.json` 进行配置：

```json
{
  "exports": "./dist/lib.js"
}
```

这样就可以运行 `npx xe-build` 进行构建了。

你会看到构建产物输出在 `dist` 目录下，这样你就完成了一次最简单的库构建了！

如果你想在源文件变动时自动构建，请运行：

```shell
npx xe-build -w
```

## 路径自动映射规则

在 `bin` 和 `exports` 的字段中只有构建产物路径（如 `./dist/lib.js`），所以工具会将其映射到源文件。

首先要知道的是，工具会将相同条件的所有子路径合并为一次构建。

也就是说如果你的项目有针对 `import` 的 ESM 产物，还有针对 `require` 的 CJS 产物，那么即使只有一个入口点，但也会执行两次构建，因为有两种条件，更多可能导致多次构建的场景可参考 [条件导出](#条件导出)。

那么如果存在多次构建，当然不能都输出到 `dist` 的根目录中了，否则可能存在被覆盖的情况，所以工具会采用如下规则：

- 只有单次构建时，则会直接将 `dist/xxx.js` 映射为 `src/xxx.ts`
- 存在多次构建时，如果你的源码文件是 `src/xxx.ts`，则请勿直接配置 `dist/xxx.js`，因为工具映射时会以 `dist` 的子目录为起点，比如 `dist/es/xxx.js` 会映射为 `src/xxx.ts`

需注意 `bin` 配置的映射规则有所不同，会永远以 `dist/bin` 作为起点进行映射，比如 `dist/bin/xxx.js` 会映射为 `src/xxx.ts`，并且存在即会视为有多次构建。

## 更多特性

### 多入口点

如果你的库需要多个入口点，仅需按照 [Node.js 文档](https://nodejs.org/docs/latest-v20.x/api/packages.html#subpath-exports) 配置 `exports` 字段即可：

```json
{
  "exports": {
    ".": "./dist/index.js",
    "./sub": "./dist/sub/index.js"
  }
}
```

工具会遍历所有 `exports` 中的子路径，并将所有子路径作为入口点进行构建。

如上面的例子将会构建 `./src/index.ts` 和 `./src/sub/index.ts` 这两个入口点。

相同条件的不同子路径会被合并到一次构建中作为多个入口点，而不是作为多次独立的构建。

### 条件导出

条件导出的详细介绍请参考 [Node.js 文档](https://nodejs.org/docs/latest-v20.x/api/packages.html#conditional-exports)。

条件导出有几个典型的使用场景：

#### 生成 TypeScript 声明文件

当需要生成 `.d.ts` TypeScript 声明文件时，可以给 `exports` 中的入口点增加 `types` 条件：

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    }
  }
}
```

#### 同时导出 ESM 与 CJS 模块

只需要给 `exports` 中的入口点增加 `import` 或 `require` 条件即可：

```json
{
  "exports": {
    ".": {
      "types": "./dist/es/index.d.ts",
      "import": "./dist/es/index.js",
      "require": "./dist/cjs/index.cjs"
    }
  }
}
```

如果没有显式的 `import` 或 `require` 条件，则会根据 `package.json` 的 `type` 字段来决定输出的模块格式。

#### 根据平台导出不同入口点

假设你的库需要根据执行环境导出不同的入口点，那么可以这样：

```json
{
  "exports": {
    ".": {
      "node": {
        "types": "./dist/node-es/index.d.ts",
        "import": "./dist/node-es/index.js",
        "require": "./dist/node-cjs/index.cjs"
      },
      "default": {
        "types": "./dist/default-es/index.d.ts",
        "import": "./dist/default-es/index.js",
        "require": "./dist/default-cjs/index.cjs"
      }
    },
    "./sub": {
      "node": {
        "types": "./dist/node-es/sub/index.d.ts",
        "import": "./dist/node-es/sub/index.js",
        "require": "./dist/node-cjs/sub/index.cjs"
      },
      "default": {
        "types": "./dist/default-es/sub/index.d.ts",
        "import": "./dist/default-es/sub/index.js",
        "require": "./dist/default-cjs/sub/index.cjs"
      }
    },
  }
}
```

以上例子会生成四次构建任务：

1. 构建条件：`node`、`import`、`types`，入口点：`.`、`./sub`
2. 构建条件：`node`、`require`，入口点：`.`、`./sub`
3. 构建条件：`default`、`import`、`types`，入口点：`.`、`./sub`
4. 构建条件：`default`、`require`，入口点：`.`、`./sub`

### 使用构建条件常量模块

构建条件常量模块是构建工具内置的一个插件，会将 `exports` 用到的所有条件都生成为一个常量，并通过 `internal/constants` 模块导出。

比如上面的构建例子一共有 `node`、`import`、`require`、`default` 四个条件（`types` 会被忽略）。

那么就会生成类似下面的模块：

```ts
declare module "internal/constants" {
    /**
     * 以 NodeJS 为编译目标
     */
    export const NODE: boolean;

    /**
     * 以 Default 为编译目标
     */
    export const DEFAULT: boolean;

    /**
     * 以 ESM 为编译目标
     */
    export const IMPORT: boolean;

    /**
     * 以 CJS 为编译目标
     */
    export const REQUIRE: boolean;
}
```

你可以自行创建一个类似上面内容的 `constants.d.ts` 文件以提供代码提示。

注意名称会被转换为全大写，在项目中可这样使用：

```ts
import { NODE } from "internal/constants";

if (NODE) {
  console.log("Running in Node.js.");
} else {
  console.log("Running in other platform.");
}
```

当一次构建中存在 `node` 条件时，`NODE` 常量即为 `true`，以达到 tree-shaking 或者执行不同逻辑的效果。

你可以创建 [配置文件](#使用配置文件) 并增加 `constants` 字段以在此基础上添加更多构建常量：

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

### 使用子路径导入

子路径导入的详细介绍请参考 [Node.js 文档](https://nodejs.org/docs/latest-v20.x/api/packages.html#subpath-imports)。

假设你同时有三个文件：

- `lib.ts`
- `lib.node.ts`
- `lib.browser.ts`

并且配置了 `imports` 字段：

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

那么在项目内部可以通过导入该路径来根据平台的不同导入不同模块：

```ts
import * as lib from "#lib.ts";
```

### 构建可执行入口点

如果你的库需要构建一个可执行入口点，你可以通过 `bin` 字段配置：

```json
{
  "bin": {
    "cli": "./dist/bin/cli.js"
  }
}
```

工具仅会处理在 `dist/bin` 路径下的文件，其它路径会被忽略，并且会生成一次单独的 `bin` 的构建，所以需注意在 `exports` 中如果也存在 `dist/bin` 目录下的目标路径，会作为同一次构建执行。

你可以创建 [配置文件](#使用配置文件) 并增加 `binConditions` 字段以配置要使用的条件：

```js
export default {
    binConditions: ["node", "import"],
};
```

## 更多配置

### 命令行选项

你可以执行

```shell
npx xe-build -h
```

查看所有可用的命令行选项。

部分配置可以直接作为命令行参数进行传入，比如：

```shell
npx xe-build --binConditions node production --onlyBuildConditions node
```

命令行参数传入的选项会覆盖配置文件中的选项。

### 使用配置文件

你可以在项目根目录创建一个 `xebuild.config.js` 配置文件，构建工具默认会读取该文件路径作为配置。

```js
/**
 * @type {import("@xenon.js/build").ConfigInput}
 */
export default {};
```

如果你想将配置文件放在其它路径，那么请在执行构建时指定配置文件路径：

```shell
npx xe-build --config ./configs/xebuild.config.js
```
如果传入的是相对路径，那么需要是基于执行目录的相对路径。

## 注意事项

- 当前不支持除 `.ts` 的其它源码文件后缀和除 `.js` 的其它构建产物后缀。
- 当前不支持导出或导入子路径内含有 `*` 通配符。
- 当前不允许自定义源码目录 `src` 与构建输出目录 `dist`。
- 条件 `types` 的值必须是字符串，不能继续嵌套子条件。
- `types` 声明文件的路径必须与源代码的路径相对应，并且只要有一个入口点需生成声明文件，那么单次构建的所有源码都会生成声明文件，因为 TypeScript 并不支持单独生成声明文件。
- 当前只要出现除 `import`、`require`、`default` 以外的条件，则会被视为多次构建。
- `redirects` 为遗留选项，应使用 [条件导入](#使用子路径导入) 替代。

## 贡献

如果你想为项目出一份力，请参阅[贡献指南](./CONTRIBUTING_zh-CN.md)。

## 许可证

[MIT @ SmallMain](./LICENSE)
