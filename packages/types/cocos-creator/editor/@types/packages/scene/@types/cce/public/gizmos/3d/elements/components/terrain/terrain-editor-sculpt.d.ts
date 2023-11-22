import { Terrain, Texture2D, Vec3 } from "cc";
import { TerrainBrush, TerrainBrushType, TerrainEdModifierKeyState } from "../../../../../../../../source/script/public/gizmos/3d/elements/components/terrain/terrain-brush.js";
import { TerrainEditorMode } from "../../../../../../../../source/script/public/gizmos/3d/elements/components/terrain/terrain-editor-mode.js";
import { TerrainHeightUndoRedo } from "../../../../../../../../source/script/public/gizmos/3d/elements/components/terrain/terrain-operation.js";
export declare class TerrainEditorSculpt extends TerrainEditorMode {
    _brushes: TerrainBrush[];
    _undo: TerrainHeightUndoRedo | null;
    _currentBrush: TerrainBrush;
    private _currentTool;
    constructor(gizmo: any);
    setCurrentBrush(type: TerrainBrushType): void;
    getCurrentBrush(): TerrainBrush;
    getBrush(type: TerrainBrushType): TerrainBrush;
    setBrushImage(tex: Texture2D | null): void;
    setSculptBrushRotation(rotate: number): void;
    onUpdate(terrain: Terrain, dtime: number, isShiftDown: boolean): void;
    onUpdateBrushPosition(terrain: Terrain, pos: Vec3): void;
    onMouseDown(terrain: Terrain): void;
    onMouseUp(): void;
    _updateHeight(terrain: any, dtime: number, modifiers: TerrainEdModifierKeyState): void;
}
//# sourceMappingURL=terrain-editor-sculpt.d.ts.map
