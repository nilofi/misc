import ImageController from "../../../../../../../source/script/public/gizmos/3d/elements/controller/image-controller.js";
import { RectangleController } from "../../../../../../../source/script/public/gizmos/3d/elements/controller/rectangle-controller.js";
import GizmoBase from "../../../../../../../source/script/public/gizmos/3d/elements/gizmo-base.js";
declare class WebviewGizmo extends GizmoBase {
    protected _controller: ImageController;
    protected _rectController: RectangleController;
    init(): void;
    onShow(): void;
    onHide(): void;
    onDestroy(): void;
    createController(): void;
    onControllerMouseDown(): void;
    onControllerMouseMove(): void;
    onControllerMouseUp(): void;
    syncImageControllerData(): void;
    syncRectControllerData(): void;
    updateControllerData(): void;
    updateControllerTransform(): void;
    updateController(): void;
    onTargetUpdate(): void;
    onNodeChanged(): void;
}
export default WebviewGizmo;
//# sourceMappingURL=webview-gizmo.d.ts.map
