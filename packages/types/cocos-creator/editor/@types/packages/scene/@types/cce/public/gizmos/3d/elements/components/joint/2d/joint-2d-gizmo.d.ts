import { Color, Vec2 } from "cc";
import { Joint2DController } from "../../../../../../../../../source/script/public/gizmos/3d/elements/controller/joint-2d-controller.js";
import GizmoBase from "../../../../../../../../../source/script/public/gizmos/3d/elements/gizmo-base.js";
declare class Joint2DGizmo extends GizmoBase {
    protected _anchorController: Joint2DController;
    protected _connectedAnchorController: Joint2DController;
    protected _anchor: Vec2;
    protected _connectedAnchor: Vec2;
    protected _propPath: string | null;
    protected _anchorColor: Color;
    protected _connectedAnchorColor: Color;
    init(): void;
    createController(): void;
    onShow(): void;
    onHide(): void;
    onAnchorControllerMouseDown(): void;
    onAnchorControllerMouseMove(): void;
    onAnchorControllerMouseUp(): void;
    onConnectedAnchorControllerMouseDown(): void;
    onConnectedAnchorControllerMouseMove(): void;
    updateControllerData(): void;
    updateAnchorControllerData(): void;
    onTargetUpdate(): void;
    onNodeChanged(): void;
}
export default Joint2DGizmo;
//# sourceMappingURL=joint-2d-gizmo.d.ts.map
