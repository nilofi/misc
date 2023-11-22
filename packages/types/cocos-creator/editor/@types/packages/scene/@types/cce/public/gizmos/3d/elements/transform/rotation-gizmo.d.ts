import { Node, Quat, Vec3 } from "cc";
import { ISceneKeyboardEvent } from "../../../../../../../source/private.js";
import TransformGizmo from "../../../../../../../source/script/public/gizmos/3d/elements/transform/transform-gizmo.js";
import { IControlMouseEvent } from "../../../../../../../source/script/public/gizmos/defines.js";
declare class RotationGizmo extends TransformGizmo {
    private _rotList;
    private _offsetList;
    private _center;
    private _rotating;
    private _keydownDelta;
    private _curDeltaAngle;
    private _curDeltaRotation;
    isNodeLocked(node: Node): boolean;
    init(): void;
    layer(): string;
    createController(): void;
    onControllerMouseDown(): void;
    onControllerMouseMove(event: any): void;
    onControllerMouseUp(): void;
    onGizmoKeyDown(event: ISceneKeyboardEvent): boolean;
    onGizmoKeyUp(event: ISceneKeyboardEvent): boolean;
    updateDataFromController(event: IControlMouseEvent): void;
    getLocalRotFromWorldRot(node: Node, worldRot: Quat, localRot: Quat): Quat;
    repeat(t: number, l: number): number;
    setNodeWorldRotation3D(node: Node, worldRot: Quat): void;
    checkSnap(deltaRotation: Quat, deltaAngle: number, axisDir: Vec3, snapStep: number): Quat;
    updateDataFromController3D(event: IControlMouseEvent): void;
    updateDataFromController2D(event: IControlMouseEvent): void;
    updateRotationByZDeltaAngle(zDeltaAngle: number): void;
    updateControllerTransform(): void;
}
export default RotationGizmo;
//# sourceMappingURL=rotation-gizmo.d.ts.map
