<!-- 标志 -->
<p align="center">
  <a target="_blank" rel="noopener noreferrer">
    <img width="350" src="https://user-images.githubusercontent.com/1503156/112012067-d5cdf580-8b63-11eb-819a-1c32cf253b25.png" alt="logo">
  </a>
</p>
<!-- 名字 -->
<h1 align="center">Cocos Creator Types</h1>
<!-- 描述 -->
<p align="center">TypeScript declaration files extracted from Cocos Creator engine.</p>
<br/>

Read this in other languages: English | [简体中文](./README_zh-CN.md)

## Introduction

Cocos Creator runtime and editor type declarations.

**Cocos provides [official type definition package](https://github.com/cocos/creator-types) after v3.8.1. It is recommended to use it first. Unless there are special circumstances, this package will no longer be updated.**

## Usage

1. Install npm package:

```shell
npm install @xenon.types/cocos-creator
```

Unless otherwise specified, the version number of the package corresponds to the engine version.

For example, if you want to install the type package corresponding to Cocos Creator v3.8.0, you can:

```shell
npm install @xenon.types/cocos-creator@3.8.0
```

2. Add the path of `@xenon.types/cocos-creator` to the `types` field of `compilerOptions` in `tsconfig.json` so that TypeScript can find the type declaration file:

```json5
"types": [
    "@xenon.types/cocos-creator",
],
```

## Contributing

To get started contributing to the project, see the [Contributing Guide](./CONTRIBUTING.md).

## License

[MIT @ SmallMain](./LICENSE)
