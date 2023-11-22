import { IChangeNodeOptions } from "../../../../../../../source/private.js";
import IconController from "../../../../../../../source/script/public/gizmos/3d/elements/controller/icon-controller.js";
import GizmoBase from "../../../../../../../source/script/public/gizmos/3d/elements/gizmo-base.js";
declare class IconGizmoBase extends GizmoBase {
    protected _controller: IconController | null;
    private _isIconGizmoVisible;
    /**
     * 用于控制选中某节点时是否隐藏icon
     * 目前仅有light-probe-icon用到
     */
    disableOnSelected: boolean;
    init(): void;
    onShow(): void;
    onHide(): void;
    checkVisible(): boolean;
    setIconGizmoVisible(visible: boolean): void;
    setIconGizmo3D(value: boolean): void;
    setIconGizmoSize(size: number): void;
    createController(): void;
    onControllerMouseDown(): void;
    onControllerMouseMove(): void;
    onControllerMouseUp(): void;
    updateController(): void;
    updateControllerTransform(): void;
    onTargetUpdate(): void;
    onNodeChanged(event: IChangeNodeOptions): void;
}
export default IconGizmoBase;
//# sourceMappingURL=icon-gizmo-base.d.ts.map
