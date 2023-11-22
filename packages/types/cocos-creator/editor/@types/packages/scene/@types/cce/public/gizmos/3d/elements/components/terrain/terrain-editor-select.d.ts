/**
 * @category terrain
 */
import { Camera, Terrain, TerrainBlock, Texture2D } from "cc";
import { TerrainEditorMode } from "../../../../../../../../source/script/public/gizmos/3d/elements/components/terrain/terrain-editor-mode.js";
export declare class TerrainEditorWeightMapData {
    data: Uint8Array;
    width: number;
    height: number;
}
export declare class TerrainEditorSelect extends TerrainEditorMode {
    private _selectMaterial;
    private _selectBlock;
    private _weightMap;
    private _weightData;
    private _layerList;
    constructor(gizmo: any);
    setSelectBlock(block: TerrainBlock | null): void;
    getSelectBlock(): TerrainBlock | null;
    getCurrentBlockIndex(): number[] | null;
    getCurrentWeightMap(): Texture2D | null;
    getCurrentWeightData(): TerrainEditorWeightMapData | null;
    getCurrentLayerList(): (Texture2D | null)[];
    onDeactivate(): void;
    onMouseDown(terrain: Terrain, cam: Camera, x: number, y: number): void;
    private _pickTerrainBlock;
    private _updateBlockSelectMaterial;
}
//# sourceMappingURL=terrain-editor-select.d.ts.map
