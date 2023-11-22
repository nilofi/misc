import { MissingReporter } from "../../../source/editor-extends/missing-reporter/missing-reporter.js";
export declare class MissingObjectReporter extends MissingReporter {
    root: any;
    doReport(obj: any, value: any, parsedObjects: any, rootUrl: any, inRootBriefLocation: any): Promise<void>;
    report(): void;
    reportByOwner(): void;
}
//# sourceMappingURL=missing-object-reporter.d.ts.map
