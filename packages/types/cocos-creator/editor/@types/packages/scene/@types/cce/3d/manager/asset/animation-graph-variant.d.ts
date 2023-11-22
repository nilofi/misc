import EditComponentAsset from "../../../../../source/script/3d/manager/asset/edit-component-asset.js";
declare class EditAnimationGraphVariant extends EditComponentAsset {
    overrides: Record<string, string>;
    invalidEntries: Record<string, string>;
    resetOverrides(): void;
    entryOverrides(): Record<string, string>;
    cacheComponent(component: any): void;
    encodeComponent(): any;
    updateComponent(dump: any): Promise<any>;
    applyComponent(): Promise<any>;
}
declare const _default: EditAnimationGraphVariant;
export default _default;
//# sourceMappingURL=animation-graph-variant.d.ts.map
