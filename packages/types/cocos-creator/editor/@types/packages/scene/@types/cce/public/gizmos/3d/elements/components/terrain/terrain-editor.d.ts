import { Camera, Terrain } from "cc";
import { TerrainEditorManage } from "../../../../../../../../source/script/public/gizmos/3d/elements/components/terrain/terrain-editor-manage.js";
import { TerrainEditorMode, eTerrainEditorMode } from "../../../../../../../../source/script/public/gizmos/3d/elements/components/terrain/terrain-editor-mode.js";
import { TerrainEditorPaint } from "../../../../../../../../source/script/public/gizmos/3d/elements/components/terrain/terrain-editor-paint.js";
import { TerrainEditorSculpt } from "../../../../../../../../source/script/public/gizmos/3d/elements/components/terrain/terrain-editor-sculpt.js";
import { TerrainEditorSelect } from "../../../../../../../../source/script/public/gizmos/3d/elements/components/terrain/terrain-editor-select.js";
import TerrainGizmo from "../../../../../../../../source/script/public/gizmos/3d/elements/components/terrain/terrain-gizmo.js";
export declare class TerrainEditor {
    static Instance: TerrainEditor;
    private _terrain;
    private _modes;
    private _currentMode;
    private _cameraComp;
    isChanged: boolean;
    private _gizmo?;
    constructor(cameraComp: Camera, gizmo: TerrainGizmo);
    setEditTerrain(t: Terrain | null): void;
    getEditTerrain(): Terrain | null;
    setMode(mode: eTerrainEditorMode): void;
    clearBrush(): void;
    getMode<T extends eTerrainEditorMode>(mode: T): [TerrainEditorManage, TerrainEditorSculpt, TerrainEditorPaint, TerrainEditorSelect][T];
    getCurrentMode(): TerrainEditorMode | null;
    getCurrentModeType(): eTerrainEditorMode;
    setCurrentLayer(id: number): void;
    getCurrentLayer(): number;
    update(dtime: number, isShiftDown: boolean): void;
    onMouseDown(x: number, y: number): void;
    onMouseUp(x?: number, y?: number): void;
    onMouseMove(x: number, y: number): void;
}
//# sourceMappingURL=terrain-editor.d.ts.map
