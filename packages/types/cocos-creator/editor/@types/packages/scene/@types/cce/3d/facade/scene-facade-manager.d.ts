import * as cc from "cc";
import { Component, Node, Quat, Vec3 } from "cc";
import { AssetInfo, IAssetMeta, IChangeNodeOptions, ISceneUndoOptions } from "../../../../source/private.js";
import { CreateComponentOptions, CreateNodeOptions, CutNodeOptions, ExecuteComponentMethodOptions, ExecuteSceneScriptMethodOptions, IAnimOperation, MoveArrayOptions, PasteNodeOptions, QueryClassesOptions, RemoveArrayOptions, RemoveComponentOptions, RemoveNodeOptions, SetPropertyOptions, UnitTestInfo } from "../../../../source/public.js.js.js";
import ISceneFacade from "../../../../source/scene-facade-interface.js.js.js";
import animationMgr from "../../../../source/script/3d/manager/animation.js";
import { sceneAssetManager as assetMgr } from "../../../../source/script/3d/manager/asset.js";
import { assetWatcherManager } from "../../../../source/script/3d/manager/asset/asset-watcher.js";
import cameraMgr from "../../../../source/script/3d/manager/camera.js";
import compMgr from "../../../../source/script/3d/manager/component.js";
import effectMgr from "../../../../source/script/3d/manager/effects.js";
import { engineManager as engineMgr } from "../../../../source/script/3d/manager/engine.js";
import gizmoMgr from "../../../../source/script/3d/manager/gizmos.js";
import nodeMgr from "../../../../source/script/3d/manager/node.js";
import pluginMgr from "../../../../source/script/3d/manager/plugin.js";
import prefabMgr from "../../../../source/script/3d/manager/prefab.js";
import type PreviewPlay from "../../../../source/script/3d/manager/preview-play.js";
import previewPlay from "../../../../source/script/3d/manager/preview-play.js";
import { previewMgr } from "../../../../source/script/3d/manager/preview.js";
import sceneMgr from "../../../../source/script/3d/manager/scene.js";
import scriptMgr from "../../../../source/script/3d/manager/scripts.js";
import selectionMgr from "../../../../source/script/3d/manager/selection.js";
import shortcutMgr from "../../../../source/script/3d/manager/shortcut.js";
import terrainMgr from "../../../../source/script/3d/manager/terrain.js";
import DumpDecode from "../../../../source/script/export/dump/decode.js";
import DumpEncode from "../../../../source/script/export/dump/encode.js";
import DumpUtils from "../../../../source/script/export/dump/utils.js";
import { SceneUndoCommandID } from "../../../../source/script/export/undo.js";
import operationMgr from "../../../../source/script/public/operation.js";
export declare type NodesInfoData = {
    /** 是剪切还是拷贝 */
    type: "copy" | "cut";
    /** 需要拷贝/剪切的节点的 uuid  */
    uuids: string[];
    /** 使用系统剪切板，暂不支持跨编辑器剪切节点 */
    projectPath: string;
};
declare global {
    export namespace Editor {
        namespace Clipboard {
            function write(name: "nodes-info", NodesInfoData: NodesInfoData): boolean;
            function read(name: "nodes-info"): NodesInfoData | null;
        }
    }
}
declare class SceneFacadeManager implements ISceneFacade {
    private _projectType;
    private _highQuality;
    private _facadeFSM;
    init(): Promise<void>;
    changeProjectMode(type: "3d" | "2d"): void;
    changeHighQuality(bool: boolean): void;
    onNativeConfigChange(value: string): Promise<void>;
    initManager(): Promise<void>;
    initEventListener(): void;
    /**
     * 退出命令，如果是场景模式，则返回 true
     * 其他模式，则执行退出模式操作，并返回 false
     */
    quitEditorCommand(): boolean;
    openScene(uuid: string): Promise<boolean>;
    private clear;
    beforeClose(): Promise<boolean>;
    closeScene(): Promise<boolean>;
    dumpAllScenes(): Promise<any>;
    saveSceneConfig(): Promise<void>;
    onSceneOpened(scene: any): void;
    onSceneReload(scene: any): void;
    onSceneClosed(scene: any): void;
    onSceneSaved(scene: any): void;
    restoreAllScenes(dump: any[]): Promise<void>;
    saveScene(asNew?: boolean): Promise<boolean>;
    softReloadScene(json?: any): Promise<boolean>;
    reloadScene(): Promise<boolean>;
    queryNodeTree(uuid: string): Promise<any>;
    queryNodesByAssetUuid(uuid: string): Promise<string[]>;
    queryNodesMissAsset(): string[];
    querySceneSerializedData(): Promise<string>;
    querySceneDirty(): Promise<any>;
    queryClasses(options?: QueryClassesOptions): Promise<any>;
    queryComponents(): Promise<any>;
    queryComponentHasScript(name: string): Promise<boolean>;
    queryLayerBuiltin(): Promise<any>;
    querySortingLayerBuiltin(): Promise<any>;
    queryMode(): string;
    queryCurrentSceneUuid(): string;
    queryRecycleNode(uuid: string): Node | null;
    queryRecycleComponent(uuid: string): Component | null;
    onResize(opts: cc.ISizeLike): void;
    queryNodeDump(uuid: string): Promise<any>;
    setNodeProperty(options: SetPropertyOptions): Promise<boolean>;
    resetNode(uuid: string): Promise<boolean>;
    resetNodeProperty(options: SetPropertyOptions): Promise<boolean>;
    previewSetNodeProperty(options: SetPropertyOptions): Promise<boolean>;
    cancelPreviewSetNodeProperty(options: SetPropertyOptions): Promise<boolean>;
    updateNodePropertyFromNull(options: SetPropertyOptions): Promise<boolean>;
    setNodeAndChildrenLayer(options: SetPropertyOptions): void;
    moveNodeArrayElement(options: MoveArrayOptions): void;
    removeNodeArrayElement(options: RemoveArrayOptions): Promise<boolean>;
    generateNodeAvailableName(name: string, parentUuid?: string): Promise<string>;
    selectAllNodes(): void;
    copyNode(uuids: string | string[]): string[];
    duplicateNode(uuids: string | string[]): string[];
    duplicateCurrentSelectedProbes(): void;
    removeCurrentSelectedProbes(): void;
    lightProbeInfoChanged(): void;
    cutNode(uuids: string | string[]): void;
    pasteNode(options: PasteNodeOptions): Promise<string[]>;
    setNodeParent(options: CutNodeOptions): Promise<string[]>;
    createNode(options: CreateNodeOptions): Promise<string>;
    removeNode(options: RemoveNodeOptions): void;
    changeNodeLock(uuid: string, locked: boolean, loop: boolean): Promise<void>;
    restorePrefab(uuid: string, assetUuid: string): Promise<boolean>;
    onNodeBeforeChanged(node: Node): void;
    onNodeChanged(node: Node, opts: IChangeNodeOptions): void;
    onBeforeNodeAdded(node: Node): void;
    onAddNode(node: Node): void;
    onRemoveNode(node: Node): void;
    onNodeAdded(node: Node, opts?: any): void;
    onNodeRemoved(node: Node, opts?: any): void;
    queryComponent(uuid: string): Promise<import("../../../../source/public.js.js.js").IComponent | null>;
    queryComponentFunctionOfNode(uuid: string): Promise<any>;
    createComponent(options: CreateComponentOptions): void;
    resetComponent(uuid: string): void;
    removeComponent(options: RemoveComponentOptions): void;
    executeComponentMethod(options: ExecuteComponentMethodOptions): Promise<any>;
    executeSceneScriptMethod(options: ExecuteSceneScriptMethodOptions): Promise<any>;
    onAddComponent(comp: Component): void;
    onRemoveComponent(comp: Component): void;
    onComponentAdded(comp: Component, opts?: any): void;
    onComponentRemoved(comp: Component, opts?: any): void;
    snapshot(command?: any): Promise<void>;
    abortSnapshot(): Promise<void>;
    beginRecording(uuids: string | string[], options?: ISceneUndoOptions): SceneUndoCommandID;
    cancelRecording(commandId: SceneUndoCommandID): boolean;
    endRecording(commandId: SceneUndoCommandID): boolean;
    undo(): Promise<void>;
    redo(): Promise<void>;
    /**
     * @param node
     * @param enable
     */
    recordNode(node: Node, enable?: boolean): void;
    resetUndo(): void;
    changeTitle(): Promise<void>;
    queryAllEffects(): Promise<any>;
    queryMaterial(uuid: string): Promise<any>;
    queryEffect(effectName: string): Promise<any>;
    queryRenderPipeline(uuid: string): Promise<any>;
    previewMaterial(
        uuid: string,
        material: any,
        opts?: {
            emit?: boolean;
        },
    ): void;
    applyMaterial(uuid: string, materialDump: any): void;
    changePhysicsMaterial(dump: any): Promise<any>;
    applyPhysicsMaterial(uuid: string): Promise<void>;
    changeAnimationGraphVariant(dump: any): Promise<any>;
    applyAnimationGraphVariant(uuid: string): Promise<void>;
    changeAnimationMask(dump: any): Promise<any>;
    applyAnimationMask(uuid: string): Promise<void>;
    applyRenderTexture(uuid: string, userData: any): Promise<void>;
    changeRenderPipeline(dump: any): Promise<any>;
    applyRenderPipeline(uuid: string, renderPipelineDump: any): Promise<void>;
    queryPhysicsMaterial(uuid: string): any;
    queryAnimationGraphVariant(uuid: string): any;
    queryAnimationMask(uuid: string): any;
    queryCreatableAssetTypes(): any;
    private checkAssetNeedUpdate;
    onDBAssetChanged(uuid: string, info: AssetInfo, meta: IAssetMeta): Promise<void>;
    onSceneAssetChanged(uuid: string, asset: any, info: AssetInfo, meta: IAssetMeta): Promise<void>;
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
    setTransformToolName(name: string): void;
    setPivot(name: string): void;
    setCoordinate(type: string): void;
    setIs2D(value: boolean): void;
    setIconGizmo3D(is3D: boolean): void;
    setIconGizmoSize(size: number): void;
    queryTransformSnapConfigs(): import("../../../../source/script/public/gizmos/utils/transform-tool-data.js").ISnapConfigData;
    setTransformSnapConfigs(name: string, value: any): void;
    queryRectSnappingConfigs(): number | boolean | import("../../../../source/script/public/gizmos/utils/rect-transform-snapping.js").IRectSnapConfigData;
    setRectSnappingConfigs(name: any, value: any): void;
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
    setCameraEnableAcceleration(enable: boolean): void;
    getCameraEnableAcceleration(): boolean;
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
    queryAuxCurveValueAtFrame(clipUuid: string, name: string, frame: number): any;
    recordAnimation(uuid: string, active: boolean, clipUuid?: string): Promise<boolean>;
    changeAnimationRootNode(uuid: string, clipUuid: string): Promise<boolean>;
    setCurEditTime(time: number): Promise<boolean>;
    changeClipState(operate: string, clipUuid: string): Promise<boolean>;
    setEditClip(clipUuid: string): Promise<boolean>;
    saveClip(): Promise<boolean>;
    applyAnimationOperation(operationList: IAnimOperation[]): Promise<import("../../../../source/public.js.js.js").IAniResultBase>;
    queryAnimationNodeEditInfo(uuid: string): IAniEditInfo;
    queryEnumListWithPath(path: string): readonly cc.__private._cocos_core_value_types_enum__Enum.Enumerator<any>[] | null;
    protected reloadAfterScriptChanged(): void;
    queryScriptName(uuid: string): Promise<any>;
    queryScriptCid(uuid: string): Promise<any>;
    loadScript(uuid: string): Promise<void>;
    removeScript(info: any): Promise<void>;
    scriptChange(info: any): Promise<void>;
    investigatePackerDriver(): Promise<void>;
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
    createPrefab(uuid: string, url: string): Promise<any>;
    getPrefabData(uuid: string): any;
    linkPrefab(nodeUuid: string, assetUuid: string): any;
    unlinkPrefab(nodeUuid: string, removeNested: boolean): any;
    applyPrefab(nodeUuid: string): Promise<boolean>;
    applyRemovedComponent(nodeUUID: string, fileID: string): Promise<void>;
    revertRemovedComponent(nodeUUID: string, fileID: string): Promise<void>;
    distributeSelectionUI(type: string): void;
    alignSelectionUI(type: string): void;
    queryParticlePlayInfo(uuid: string): any;
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
    changePreviewPlayState(state: boolean, sceneJson?: string): Promise<void>;
    callPreviewPlayMethod<T extends keyof typeof PreviewPlay>(method: T, ...args: Parameters<(typeof PreviewPlay)[T]>): Promise<any>;
    updatePhysicsGroup(): void;
    onEngineUpdate(): void;
    switchGraphicalTools(bool: boolean): void;
    changeTargetResolution(deviceName: string): Promise<void>;
    regeneratePolygon2DPoints(uuid: string): void;
    exportParticlePlist(uuid: string): Promise<any>;
    unitTest(testInfo: UnitTestInfo): Promise<boolean | undefined>;
    setSceneLightOn(enable: boolean): void;
    querySceneLightOn(): boolean;
    changeSceneViewVisible(visible: boolean): void;
    queryPreviewData(previewName: string, info: any): Promise<any>;
    callPreviewFunction(previewName: string, funcName: string, args: any[]): Promise<any>;
    queryThumbnail(uuids: string[], types?: string[]): Promise<string[]>;
    getCurrentFacade(): import("../../../../source/script/3d/facade/scene-facade-state-interface.js").ISceneFacadeState;
    /**
     * @description debug view
     * @param key
     * @param value
     * */
    changeDebugOption(key: string, value: any): Promise<void>;
    unregisterPreview(): void;
    registerPreview(): void;
    forceUpdatePlugin(): void;
    initSceneConfig(): Promise<void>;
    syncAfterExitEditorPreview(): Promise<void>;
    private resetLightProbeEditMode;
    toggleLightProbeEditMode(mode: boolean): boolean;
    queryLightProbeEditMode(): boolean;
    toggleLightProbeBoundingBoxEditMode(mode: boolean): boolean;
    queryLightProbeBoundingBoxEditMode(): boolean;
    queryAuxiliaryCurves(clipUUID: string): Promise<Record<string, import("../../../../source/public.js.js.js").IPropCurveDumpData>>;
}
export { SceneFacadeManager };
declare global {
    export namespace cce {
        let Camera: typeof cameraMgr;
        let Animation: typeof animationMgr;
        let Scene: typeof sceneMgr;
        let Node: typeof nodeMgr;
        let Script: typeof scriptMgr;
        let Operation: typeof operationMgr;
        let Gizmo: typeof gizmoMgr;
        let Asset: typeof assetMgr;
        let PreviewPlay: typeof previewPlay;
        let Prefab: typeof prefabMgr;
        let Effect: typeof effectMgr;
        let Selection: typeof selectionMgr;
        let Shortcut: typeof shortcutMgr;
        let Preview: typeof previewMgr;
        let Component: typeof compMgr;
        let Terrain: typeof terrainMgr;
        let Plugin: typeof pluginMgr;
        let Engine: typeof engineMgr;
        let NeedAnimState: typeof import("../../../../source/script/3d/manager/engine.js")["NeedAnimState"];
        let ModelPreview: typeof previewMgr.modelPreview;
        let MotionPreview: typeof previewMgr.motionPreview;
        let TransitionPreview: typeof previewMgr.transitionPreview;
        let ThumbnailManager: typeof import("../../../../source/script/3d/manager/thumbnail/index.js")["default"];
        let AssetWatcher: typeof assetWatcherManager;
        namespace Dump {
            let encode: typeof DumpEncode;
            let decode: typeof DumpDecode;
            let utils: typeof DumpUtils;
        }
    }
}
//# sourceMappingURL=scene-facade-manager.d.ts.map
