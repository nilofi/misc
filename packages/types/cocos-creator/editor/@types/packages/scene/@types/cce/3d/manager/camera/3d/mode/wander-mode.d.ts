import { ISceneKeyboardEvent, ISceneMouseEvent } from "../../../../../../../source/private.js";
import { ModeBase } from "../../../../../../../source/script/3d/manager/camera/3d/mode/mode-base.js";
declare class WanderMode extends ModeBase {
    private _curMouseDX;
    private _curMouseDY;
    private _rotateSpeed;
    private _movingSpeedShiftScale;
    private _damping;
    private _wanderSpeed;
    private _flyAcceleration;
    private _shiftKey;
    private _velocity;
    private _wanderKeyDown;
    private _destPos;
    private _destRot;
    private _wanderSpeedTarget;
    private _wanderAnim;
    private _enableAcceleration;
    get wanderSpeed(): number;
    set wanderSpeed(value: number);
    get enableAcceleration(): boolean;
    set enableAcceleration(value: boolean);
    enter(): Promise<void>;
    exit(): Promise<void>;
    onMouseMove(event: ISceneMouseEvent): boolean;
    onMouseWheel(event: ISceneMouseEvent): void;
    onKeyDown(event: ISceneKeyboardEvent): void;
    onKeyUp(event: ISceneKeyboardEvent): void;
    onUpdate(deltaTime: number): void;
}
export { WanderMode };
//# sourceMappingURL=wander-mode.d.ts.map
