import { IControlMouseEvent } from "../../../../../../../source/script/public/gizmos/defines.js";
export default interface GizmoEventListener {
    onControllerMouseDown?(event: IControlMouseEvent): void;
    onControllerMouseMove?(event: IControlMouseEvent): void;
    onControllerMouseUp?(event: IControlMouseEvent): void;
    onControllerHoverIn?(event: IControlMouseEvent): void;
    onControllerHoverOut?(event: IControlMouseEvent): void;
}
//# sourceMappingURL=gizmo-event-listener.d.ts.map
