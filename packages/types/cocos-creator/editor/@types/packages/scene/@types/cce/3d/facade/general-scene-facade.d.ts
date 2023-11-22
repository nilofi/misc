/// <reference path="../../../../../../../resources/3d/engine/bin/.declarations/cc.d.ts" />
/// <reference path="../../../../source/script/public/gizmos/utils/engine/3d.d.ts" />
/// <reference path="../../../../source/script/public/gizmos/3d/gizmo-manager.d.ts" />
/// <reference path="../../../../source/script/3d/manager/asset/asset-watcher.d.ts" />
import { Component, ISizeLike, Node, Quat, Vec3 } from "cc";
import { Asset, AssetInfo } from "../../../../../asset-db/@types/protected.js";
import { IAniResultBase, IAssetMeta, IChangeNodeOptions, IOptionBase, ISceneUndoOptions } from "../../../../source/private.js";
import { CreateComponentOptions, CreateNodeOptions, CutNodeOptions, ExecuteComponentMethodOptions, ExecuteSceneScriptMethodOptions, IAnimOperation, MoveArrayOptions, PasteNodeOptions, QueryClassesOptions, RemoveArrayOptions, RemoveComponentOptions, RemoveNodeOptions, SetPropertyOptions } from "../../../../source/public.js.js.js";
import { ISceneFacadeState, SceneModeType } from "../../../../source/script/3d/facade/scene-facade-state-interface.js";
import { ISceneEvents } from "../../../../source/script/3d/manager/scene-events-interface.js";
import SceneProxy from "../../../../source/script/3d/manager/scene/proxy/scene-proxy.js";
import { ISceneUndoManager, SceneUndoCommandID } from "../../../../source/script/export/undo/index.js";
import LightProbeEditModeListener from "../../../../source/script/public/gizmos/3d/elements/listener/light-probe-edit-mode-listener.js";
import { TransformToolDataCoordinateType, TransformToolDataPivotType, TransformToolDataToolNameType } from "../../../../source/script/public/gizmos/utils/transform-tool-data.js";
export declare class GeneralSceneFacade implements ISceneFacadeState, LightProbeEditModeListener {
    protected _sceneMgr: import("../../../../source/script/3d/manager/scene/scene-manager.js").default;
    protected _cameraMgr: import("../../../../source/script/3d/manager/camera.js").Camera;
    protected _nodeMgr: import("../../../../source/script/3d/manager/node.js").NodeManager;
    protected _compMgr: import("../../../../source/script/3d/manager/component.js").CompManager;
    protected _assetMgr: import("../../../../source/script/3d/manager/asset.js").SceneAssetManager;
    protected _gizmoMgr: import("../../../../source/script/public/gizmos/3d/gizmo-manager.js").GizmoManager;
    protected _materialPreviewMgr: import("../../../../source/script/3d/manager/material-preview.js").MaterialPreview;
    protected _miniPreviewMgr: import("../../../../source/script/3d/manager/mini-preview.js").MiniPreview;
    protected _scriptMgr: import("../../../../source/script/3d/manager/scripts.js").ScriptManager;
    protected _previewMgr: import("../../../../source/script/3d/manager/preview.js").PreviewManager;
    protected _animationMgr: import("../../../../source/script/3d/manager/animation.js").AnimationManager;
    protected _selectionMgr: import("../../../../source/script/3d/manager/selection.js").SceneSelection;
    protected _effectMgr: import("../../../../source/script/3d/manager/effects.js").EffectManager;
    protected _terrainMgr: import("../../../../source/script/3d/manager/terrain.js").TerrainManager;
    protected _prefabMgr: import("../../../../source/script/3d/manager/prefab.js").PrefabManager;
    protected _engineMgr: import("../../../../source/script/3d/manager/engine.js").EngineManager;
    protected _pluginMgr: import("../../../../source/script/3d/manager/plugin.js").PluginManager;
    protected _uiMgr: import("../../../../source/script/3d/manager/ui.js").UIManager;
    protected _particleMgr: import("../../../../source/script/3d/manager/particle.js").ParticleManager;
    protected _lodMgr: import("../../../../source/script/3d/manager/lod.js").LODManager;
    protected _modelPreviewMgr: import("../../../../source/script/3d/manager/model-preview.js").ModelPreview;
    protected _meshPreviewMgr: import("../../../../source/script/3d/manager/mesh-preview.js").MeshPreview;
    protected _physics2DMgr: import("../../../../source/script/3d/manager/physics-2d.js").Physics2DManager;
    protected _particle2DMgr: import("../../../../source/script/3d/manager/particle-2d.js").Particle2DManager;
    protected _sceneProxy: SceneProxy;
    protected _recycleNode: Record<string, Node>;
    protected _recycleComponent: Record<string, Component>;
    fromState?: ISceneFacadeState;
    protected _undoMgr: ISceneUndoManager;
    isHold: boolean;
    modeName: SceneModeType;
    closeSceneWhenExit: boolean;
    private _stagingCameraInfo;
    protected _sceneEventListener: ISceneEvents[];
    private _lightProbeEditModeListener;
    private _lightProbeEditMode;
    set lightProbeEditMode(value: boolean);
    get lightProbeEditMode(): boolean;
    private _lightProbeBoundingBoxEditMode;
    set lightProbeBoundingBoxEditMode(value: boolean);
    get lightProbeBoundingBoxEditMode(): boolean;
    init(): void;
    initEventListener(): void;
    registerLightProbeEditModeListener(listener: LightProbeEditModeListener): void;
    enter(opts: any): Promise<void>;
    resetUndo(): void;
    exit(): Promise<void>;
    setCloseSceneWhenExit(): void;
    checkToClose(): Promise<boolean>;
    closeSceneState(): Promise<boolean>;
    stagingSceneState(): Promise<boolean>;
    fireCloseEvent(): void;
    openScene(uuid: string): Promise<boolean>;
    closeScene(): Promise<boolean>;
    saveScene(asNew: boolean): Promise<any>;
    dumpSceneState(): any;
    patchSceneState(): Promise<boolean>;
    restoreSceneState(dump?: any): Promise<boolean>;
    softReloadScene(json?: any): Promise<boolean>;
    reloadScene(): Promise<boolean>;
    queryNodeTree(uuid: string): Promise<any>;
    queryNodesByAssetUuid(uuid: string): Promise<void>;
    querySceneSerializedData(): Promise<string>;
    querySceneDirty(): Promise<boolean>;
    queryClasses(options?: QueryClassesOptions): Promise<
        {
            name: string;
        }[]
    >;
    queryComponents(): Promise<
        {
            name: any;
            cid: any;
            path: any;
            assetUuid: any;
        }[]
    >;
    queryComponentHasScript(name: string): Promise<boolean>;
    queryLayerBuiltin(): Promise<
        {
            name: string;
            value: any;
        }[]
    >;
    querySortingLayerBuiltin(): Promise<readonly import("cc").__private._cocos_sorting_sorting_layers__SortingItem[]>;
    /**
     * 查询当前正在编辑的模式名字
     */
    queryMode(): SceneModeType;
    queryCurrentSceneUuid(): string;
    dispatchEvents(eventName: keyof ISceneEvents, ...args: any[any]): Promise<void>;
    onSceneOpened(scene: any): void;
    onSceneReload(scene: any): void;
    onSceneClosed(scene: any): void;
    onResize(opts: ISizeLike): void;
    queryRecycleNode(uuid: string): Node | null;
    queryRecycleComponent(uuid: string): Component | null;
    queryNodeDump(uuid: string): Promise<any>;
    queryComponentFunctionOfNode(uuid: string): Promise<any>;
    previewSetNodeProperty(options: SetPropertyOptions): Promise<boolean>;
    cancelPreviewSetNodeProperty(options: SetPropertyOptions): Promise<boolean>;
    setNodeProperty(options: SetPropertyOptions): Promise<boolean>;
    resetNode(uuid: string): Promise<boolean>;
    resetNodeProperty(options: SetPropertyOptions): Promise<boolean>;
    updateNodePropertyFromNull(options: SetPropertyOptions): Promise<boolean>;
    setNodeAndChildrenLayer(options: SetPropertyOptions): Promise<void>;
    moveNodeArrayElement(options: MoveArrayOptions): Promise<boolean>;
    removeNodeArrayElement(options: RemoveArrayOptions): Promise<boolean>;
    generateNodeAvailableName(name: string, parentUuid?: string): Promise<string>;
    selectAllNodes(): void;
    copyNode(uuids: string | string[]): string[];
    duplicateNode(uuids: string | string[]): string[];
    pasteNode(options: PasteNodeOptions): Promise<string[]>;
    setNodeParent(options: CutNodeOptions): Promise<string[]>;
    createNode(options: CreateNodeOptions): Promise<any>;
    removeNode(options: RemoveNodeOptions): Promise<void>;
    changeNodeLock(uuids: string | string[], locked: Boolean, loop: Boolean): Promise<void>;
    restorePrefab(uuid: string, assetUuid: string): Promise<boolean>;
    onNodeBeforeChanged(node: Node): void;
    onNodeChanged(node: Node, opts?: IChangeNodeOptions): void;
    onAddNode(node: Node): void;
    onRemoveNode(node: Node): void;
    onNodeAdded(node: Node, opts?: IOptionBase): void;
    onNodeRemoved(node: Node, opts: IOptionBase): void;
    queryComponent(uuid: string): Promise<import("../../../../source/public.js.js.js").IComponent | null>;
    createComponent(options: CreateComponentOptions): void;
    resetComponent(uuid: string): Promise<void>;
    removeComponent(options: RemoveComponentOptions): Promise<void>;
    executeComponentMethod(options: ExecuteComponentMethodOptions): Promise<boolean>;
    executeSceneScriptMethod(options: ExecuteSceneScriptMethodOptions): Promise<any>;
    onAddComponent(comp: Component, opts?: IOptionBase): void;
    onRemoveComponent(comp: Component, opts?: IOptionBase): void;
    onComponentAdded(comp: Component, opts?: IOptionBase): void;
    onComponentRemoved(comp: Component, opts?: IOptionBase): void;
    snapshot(command?: any): Promise<void>;
    abortSnapshot(): void;
    beginRecording(uuids: string | string[], options?: ISceneUndoOptions): SceneUndoCommandID;
    cancelRecording(commandId: SceneUndoCommandID): boolean;
    endRecording(commandId: SceneUndoCommandID): boolean;
    undo(): Promise<void>;
    redo(): Promise<void>;
    recordNode(node: Node, enable?: boolean): void;
    queryAllEffects(): Promise<any>;
    queryMaterial(uuid: string): Promise<any>;
    queryEffect(effectName: string): Promise<any>;
    queryRenderPipeline(uuid: string): Promise<any>;
    changeRenderPipeline(dump: any): Promise<any>;
    applyRenderPipeline(uuid: string): Promise<void>;
    previewMaterial(
        uuid: string,
        material: any,
        opts?: {
            emit?: boolean;
        },
    ): Promise<void>;
    applyMaterial(uuid: string, materialDump: any): Promise<void>;
    changePhysicsMaterial(dump: any): Promise<any>;
    applyPhysicsMaterial(uuid: string): Promise<void>;
    changeAnimationGraphVariant(dump: any): Promise<any>;
    applyAnimationGraphVariant(uuid: string): Promise<void>;
    changeAnimationMask(dump: any): Promise<any>;
    applyAnimationMask(uuid: string): Promise<void>;
    applyRenderTexture(uuid: string, userData: any): Promise<void>;
    queryPhysicsMaterial(uuid: string): Promise<any>;
    queryAnimationGraphVariant(uuid: string): Promise<any>;
    queryAnimationMask(uuid: string): Promise<any>;
    queryCreatableAssetTypes(): string[];
    onSceneAssetChanged(uuid: string, asset: Asset, info: AssetInfo, meta: IAssetMeta): Promise<void>;
    assetDelete(uuid: string, info: any): void;
    assetRefresh(uuid: string): void;
    gizmoRefreshConfig(): Promise<void>;
    queryGizmoToolName(): Promise<string>;
    queryGizmoPivot(): Promise<string>;
    queryGizmoCoordinate(): Promise<string>;
    queryIs2D(): Promise<boolean>;
    queryIsIconGizmo3D(): boolean;
    queryIconGizmoSize(): number;
    updateInnerTetrahedron(): void;
    setTransformToolName(name: TransformToolDataToolNameType): Promise<void>;
    setPivot(name: TransformToolDataPivotType): Promise<void>;
    setCoordinate(type: TransformToolDataCoordinateType): Promise<void>;
    setIs2D(value: boolean): Promise<void>;
    setIconGizmo3D(is3D: boolean): Promise<void>;
    setIconGizmoSize(size: number): Promise<void>;
    focus(uuid?: string[] | null, position?: Vec3, rotation?: Quat, viewCenter?: Vec3, immediate?: boolean): void;
    alignNodeToSceneView(uuids: string[]): void;
    queryIsGridVisible(): boolean;
    setGridVisible(visible: boolean): void;
    alignWithView(): void;
    alignViewWithNode(): void;
    setGridLineColor(color: number[]): void;
    getCameraProperty(): any;
    setCameraProperty(opts: any): void;
    getCameraWheelSpeed(): number;
    setCameraWheelSpeed(speed: number): void;
    getCameraWanderSpeed(): number;
    setCameraWanderSpeed(speed: number): void;
    zoomSceneViewUp(): void;
    zoomSceneViewDown(): void;
    resetSceneViewZoom(): void;
    toggleActiveSelectedNode(): void;
    toggleActiveUnselectedNode(): void;
    toggleActiveAllNodes(): void;
    queryCurrentAnimationState(): any;
    queryCurrentAnimationInfo(): any;
    queryAnimationRootNode(uuid: string): string;
    queryAnimationRootInfo(uuid: string): any;
    queryAnimationClipDump(nodeUuid: string, clipUuid: string): any;
    queryAnimationProperties(uuid: string): any;
    queryAnimationClipsInfo(nodeUuid: string): any;
    queryAnimationClipCurrentTime(clipUuid: string): number;
    queryAnimationPropValueAtFrame(clipUuid: string, nodePath: string, propKey: string, frame: number): any;
    queryAuxCurveValueAtFrame(clipUuid: string, name: string, frame: number): null;
    recordAnimation(uuid: string, active: boolean, clipUuid?: string): Promise<boolean>;
    changeAnimationRootNode(uuid: string, clipUuid: string): Promise<boolean>;
    setCurEditTime(time: number): Promise<boolean>;
    changeClipState(operate: string, clipUuid: string): Promise<boolean>;
    setEditClip(clipUuid: string): Promise<boolean>;
    saveClip(): Promise<boolean>;
    applyAnimationOperation(operationList: IAnimOperation[]): Promise<IAniResultBase>;
    queryAnimationNodeEditInfo(uuid: string): import("../../../../source/public.js.js.js").IAniEditInfo;
    queryAuxiliaryCurves(clipUuid: string): Promise<Record<string, import("../../../../source/public.js.js.js").IPropCurveDumpData>>;
    queryScriptName(uuid: string): Promise<any>;
    queryScriptCid(uuid: string): Promise<any>;
    loadScript(uuid: string): Promise<void>;
    removeScript(info: any): Promise<void>;
    scriptChange(info: any): Promise<void>;
    _selectNode(uuid: string): void;
    _unselectNode(uuid: string): void;
    querySelection(): string[];
    isSelectNode(uuid: string): boolean;
    selectNode(uuid: string): void;
    unselectNode(uuid: string): void;
    clearSelection(): void;
    registerEffects(uuids: string[]): void;
    removeEffects(uuids: string[]): void;
    updateEffect(uuid: string): void;
    onRemoveTerrain(uuid: string, info: any): void;
    createPrefab(uuid: string, url: string): Promise<string | null | undefined>;
    getPrefabData(uuid: string): any;
    linkPrefab(nodeUuid: string, assetUuid: string): any;
    unlinkPrefab(nodeUuid: string, removeNested: boolean): any;
    doUnlinkPrefab(nodeUuid: string, removeNested: boolean): any;
    applyPrefab(nodeUuid: string): Promise<boolean>;
    distributeSelectionUI(type: string): void;
    alignSelectionUI(type: string): void;
    queryParticlePlayInfo(uuid: string): {
        speed: number;
        time: string;
        particle: number;
        isPlaying: boolean;
    } | null;
    setParticlePlaySpeed(uuid: string, speed: number): void;
    /**
     * 播放选中的粒子
     * @param uuid 粒子组件的 uuid
     */
    playParticle(): void;
    /**
     * 重新开始播放选中的粒子
     * @param uuid 粒子组件的 uuid
     */
    restartParticle(): void;
    /**
     * 暂停选中的粒子
     * @param uuid 粒子组件的 uuid
     */
    pauseParticle(): void;
    /**
     * 停止播放选中的粒子
     * @param uuid 粒子组件的 uuid
     */
    stopParticle(): void;
    applyCurrentCameraSize(uuid: Readonly<string>): number | null;
    insertLOD(lODGroupUUID: string, ...args: Parameters<import("cc").LODGroup["insertLOD"]>): void;
    eraseLOD(lODGroupUUID: string, ...args: Parameters<import("cc").LODGroup["eraseLOD"]>): void;
    updatePhysicsGroup(): Promise<void>;
    onEngineUpdate(): void;
    regeneratePolygon2DPoints(uuid: string): void;
    exportParticlePlist(uuid: string): Promise<any>;
    duplicateCurrentSelectedProbes(): void;
    removeCurrentSelectedProbes(): void;
    toggleLightProbeEditMode(mode: boolean | undefined): boolean;
    queryLightProbeEditMode(): boolean;
    toggleLightProbeBoundingBoxEditMode(mode: boolean | undefined): boolean;
    queryLightProbeBoundingBoxEditMode(): boolean;
    lightProbeInfoChanged(): void;
    /**
     * _lightProbeEditModeListener的注册在
     * @see registerLightProbeEditModeListener
     * @param mode
     */
    lightProbeEditModeChanged(mode: boolean): void;
    boundingBoxEditModeChanged(mode: boolean): void;
    changeTitle(): Promise<void>;
}
export default GeneralSceneFacade;
//# sourceMappingURL=general-scene-facade.d.ts.map
