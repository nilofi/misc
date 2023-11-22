import PreviewBuffer from "../../../../../source/script/3d/manager/preview/buffer.js";
declare class PreviewBase {
    protected previewBuffer: PreviewBuffer;
    queryPreviewData(info: any): Promise<any>;
    queryPreviewDataQueue(info: any, event: any): void;
    clearPreviewBuffer(): void;
    init(registerName: string, queryName: string): void;
}
export { PreviewBase };
//# sourceMappingURL=preview-base.d.ts.map
