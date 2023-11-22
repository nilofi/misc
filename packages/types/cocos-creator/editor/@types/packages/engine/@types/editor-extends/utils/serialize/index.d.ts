import { IOptions } from "../../../../source/editor-extends/utils/serialize/parser.js";
export declare function serialize(obj: Exclude<any, null | undefined>, options?: IOptions): string | object;
export declare namespace serialize {
    var asAsset: typeof import("../../../../source/editor-extends/utils/serialize/dynamic-builder.js").asAsset;
    var setName: typeof import("../../../../source/editor-extends/utils/serialize/dynamic-builder.js").setName;
    var findRootObject: typeof import("../../../../source/editor-extends/utils/serialize/dynamic-builder.js").findRootObject;
}
export declare function serializeCompiled(obj: Exclude<any, null | undefined>, options: IOptions): string | object;
export declare namespace serializeCompiled {
    var getRootData: typeof import("../../../../source/editor-extends/utils/serialize/compiled/builder.js").getRootData;
    var packJSONs: typeof import("../../../../source/editor-extends/utils/serialize/compiled/pack-jsons.js").default;
}
//# sourceMappingURL=index.d.ts.map
