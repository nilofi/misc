import Gizmo from "../../../../../../../source/script/public/gizmos/3d/elements/gizmo-base.js";
declare class LightComponentGizmo extends Gizmo {
    private Direction;
    private Sphere;
    private Spot;
    private _curLightType;
    private _sphereLightRange;
    private _spotAngle;
    private _spotLightHeight;
    private _lightGizmoColor;
    private _lightCtrlHoverColor;
    private _activeController;
    private _lightController;
    init(): void;
    onShow(): void;
    onHide(): void;
    createController(): void;
    onControllerMouseDown(): void;
    onControllerMouseMove(): void;
    onControllerMouseUp(): void;
    updateDataFromController(): void;
    updateControllerTransform(): void;
    getConeRadius(angle: number, height: number): number;
    updateControllerData(): void;
    onTargetUpdate(): void;
    onNodeChanged(): void;
}
export default LightComponentGizmo;
//# sourceMappingURL=light-component-gizmo.d.ts.map
