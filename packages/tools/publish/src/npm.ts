export enum NpmPackageManagerType {
    Npm = "npm",
    Yarn = "yarn",
    Pnpm = "pnpm",
}

export const STAGE_TO_NPM_TAG = {
    // prettier-keep
    release: "latest",
    beta: "beta",
    alpha: "alpha",
};
