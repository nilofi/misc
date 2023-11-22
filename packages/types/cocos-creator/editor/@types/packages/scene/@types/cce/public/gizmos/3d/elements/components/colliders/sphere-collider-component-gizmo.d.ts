import { Vec3 } from "cc";
import Gizmo from "../../../../../../../../source/script/public/gizmos/3d/elements/gizmo-base.js";
declare class SphereColliderComponentGizmo extends Gizmo {
    private _radius;
    private _maxScale;
    private _controller;
    private _propPath;
    init(): void;
    onShow(): void;
    onHide(): void;
    createController(): void;
    onControllerMouseDown(): void;
    onControllerMouseMove(): void;
    onControllerMouseUp(): void;
    getMaxScale(inScale: Vec3): number;
    updateDataFromController(): void;
    updateControllerData(): void;
    updateControllerTransform(): void;
    onTargetUpdate(): void;
    onNodeChanged(): void;
}
export default SphereColliderComponentGizmo;
//# sourceMappingURL=sphere-collider-component-gizmo.d.ts.map
