# Set up development environment 

Please make sure you have **Git**, **Node.js** (v20+), **PNPM** (v8+) installed on your device. 

We recommend using [**VSCode**](https://code.visualstudio.com/) as your code editor. This is not a rule, but it will get you into development faster, and the next part The content will be written on this basis. 

Clone the project and run in the project root directory: 

```shell 
pnpm install 
``` 

# Put into development 

This repository is Monorepo, and all packages are placed in the `packages` directory. Each package has a different development process. You can go to the corresponding package directory to view the `README.md` file for more specific contribution guidelines.

# Individual chapters

Since there are many similarities in the contribution guidelines for some packages, they are incorporated into the subsections of this chapter. You don't need to read this chapter separately; you should only read it if it's explicitly stated in the contribution guidelines for a particular package.

## Development Flow A

Run:

```shell
pnpm run dev
```

Start development in 'watch' mode and all changes will be compiled automatically.

You can also run the above command directly from the root of your repository to enable 'watch' mode on all packages at once.

## Build Flow A

Run:

```shell
pnpm run build
```

You can build the package.

You can also run the above command directly from the root of your repository to build all packages at once.

## Release Flow A

When you're ready to release a new version of your package, follow these steps:

1. Run `pnpm version xxx` to bump the version.
2. Commit and push all changes.
3. Run `pnpm publish`.
 