import { SimplexCollider } from "cc";
import LineController from "../../../../../../../../source/script/public/gizmos/3d/elements/controller/line-controller.js";
import PointController from "../../../../../../../../source/script/public/gizmos/3d/elements/controller/point-controller.js";
import TetrahedronController from "../../../../../../../../source/script/public/gizmos/3d/elements/controller/tetrahedron-cotroller.js";
import TriangleController from "../../../../../../../../source/script/public/gizmos/3d/elements/controller/triangle-controller.js";
import GizmoBase from "../../../../../../../../source/script/public/gizmos/3d/elements/gizmo-base.js";
declare class SimplexColliderGizmo extends GizmoBase {
    private _shapeControllers;
    private _activeController;
    init(): void;
    createControllerByShape(shape: SimplexCollider.ESimplexType): LineController | PointController | TriangleController | TetrahedronController | null;
    getControllerByShape(shape: SimplexCollider.ESimplexType): any;
    onShow(): void;
    onHide(): void;
    updateControllerData(): void;
    onTargetUpdate(): void;
    onNodeChanged(): void;
}
export default SimplexColliderGizmo;
//# sourceMappingURL=simplex-collider-gizmo.d.ts.map
