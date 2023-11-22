import { Node, Texture2D, Vec2, Vec3 } from "cc";
import ControllerBase from "../../../../../../../source/script/public/gizmos/3d/elements/controller/controller-base.js";
declare class ImageController extends ControllerBase {
    private _center;
    private _size;
    private _imageNode;
    private _imageMR;
    constructor(rootNode: Node, opts?: any);
    initShape(opts?: any): void;
    setTexture(texture: Texture2D | null): void;
    setTextureByUUID(uuid: string): void;
    updateSize(center: Vec3, size: Vec2): void;
}
export default ImageController;
//# sourceMappingURL=image-controller.d.ts.map
