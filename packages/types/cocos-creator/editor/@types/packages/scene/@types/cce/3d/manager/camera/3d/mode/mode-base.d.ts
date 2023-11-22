import { Quat, Vec3 } from "cc";
import { ISceneKeyboardEvent, ISceneMouseEvent } from "../../../../../../../source/private.js";
import { CameraController3D } from "../../../../../../../source/script/3d/manager/camera/3d/camera-controller-3d.js";
import { IOperationMode } from "../../../../../../../source/script/3d/manager/camera/operation-mode-interface.js";
import { CameraMoveMode } from "../../../../../../../source/script/3d/manager/camera/utils.js";
declare class ModeBase implements IOperationMode {
    _cameraCtrl: CameraController3D;
    modeName: CameraMoveMode;
    protected _curRot: Quat;
    protected _curPos: Vec3;
    constructor(cameraCtrl: CameraController3D, modeName: CameraMoveMode);
    enter(): Promise<void>;
    exit(): Promise<void>;
    onMouseDown(event: ISceneMouseEvent): boolean;
    onMouseMove(event: ISceneMouseEvent): boolean;
    onMouseUp(event: ISceneMouseEvent): boolean;
    onMouseWheel(event: ISceneMouseEvent): void;
    onKeyDown(event: ISceneKeyboardEvent): void;
    onKeyUp(event: ISceneKeyboardEvent): void;
    onUpdate(deltaTime: number): void;
}
export { ModeBase };
//# sourceMappingURL=mode-base.d.ts.map
