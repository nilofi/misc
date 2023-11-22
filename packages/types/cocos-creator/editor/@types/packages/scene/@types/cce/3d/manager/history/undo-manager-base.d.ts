import { ICommand } from "../../../../../source/script/3d/manager/history/icommand.js";
import { ISceneEvents } from "../../../../../source/script/3d/manager/scene-events-interface.js";
import LightProbeEditModeListener from "../../../../../source/script/public/gizmos/3d/elements/listener/light-probe-edit-mode-listener.js";
export declare class UndoManagerBase implements ISceneEvents, LightProbeEditModeListener {
    private _undoArray;
    get undoArray(): ICommand[];
    set undoArray(value: ICommand[]);
    redoArray: ICommand[];
    undoSizeWhenSave: number;
    constructor();
    push(command: ICommand): void;
    undo(): Promise<void>;
    redo(): Promise<void>;
    rebase(): void;
    reset(uuids: string | string[], scene: any): void;
    snapshot(command?: any): void;
    abort(): void;
    record(node?: any): void;
    changed(): void;
    save(): void;
    isDirty(): boolean;
    onSceneOpened(scene: any): void;
    lightProbeEditModeChanged(mode: boolean): void;
}
export default UndoManagerBase;
//# sourceMappingURL=undo-manager-base.d.ts.map
