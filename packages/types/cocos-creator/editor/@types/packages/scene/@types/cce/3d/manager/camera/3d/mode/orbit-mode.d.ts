import { ISceneMouseEvent } from "../../../../../../../source/private.js";
import { ModeBase } from "../../../../../../../source/script/3d/manager/camera/3d/mode/mode-base.js";
declare class OrbitMode extends ModeBase {
    private _rotateSpeed;
    enter(): Promise<void>;
    exit(): Promise<void>;
    onMouseDown(event: ISceneMouseEvent): boolean;
    onMouseMove(event: ISceneMouseEvent): boolean;
    onMouseUp(event: ISceneMouseEvent): boolean;
}
export { OrbitMode };
//# sourceMappingURL=orbit-mode.d.ts.map
