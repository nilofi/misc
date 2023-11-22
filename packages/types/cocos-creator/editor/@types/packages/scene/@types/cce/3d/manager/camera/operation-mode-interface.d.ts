import { ISceneKeyboardEvent, ISceneMouseEvent } from "../../../../../source/private.js";
import IState from "../../../../../source/script/3d/utils/state-machine/state-interface.js";
interface IOperationMode extends IState {
    onMouseDown(event: ISceneMouseEvent): boolean;
    onMouseMove(event: ISceneMouseEvent): boolean;
    onMouseUp(event: ISceneMouseEvent): boolean;
    onMouseWheel(event: ISceneMouseEvent): void;
    onKeyDown(event: ISceneKeyboardEvent): void;
    onKeyUp(event: ISceneKeyboardEvent): void;
    onUpdate(deltaTime: number): void;
}
export { IOperationMode };
//# sourceMappingURL=operation-mode-interface.d.ts.map
