import { BaseThumbnailGenerator } from "../../../../../source/script/3d/manager/thumbnail/thumbnail-generator-interface.js";
declare class MeshThumbnailGenerator extends BaseThumbnailGenerator {
    private _mesh;
    constructor();
    getThumbnail(uuid: string, path: string): Promise<string>;
    private generate;
}
export default MeshThumbnailGenerator;
//# sourceMappingURL=mesh-thumbnail-generator.d.ts.map
