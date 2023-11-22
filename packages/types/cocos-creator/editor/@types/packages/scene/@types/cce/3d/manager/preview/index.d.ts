import { MotionPreview } from "../../../../../source/script/3d/manager/animation-graph-preview/motion.js";
import { TransitionPreview } from "../../../../../source/script/3d/manager/animation-graph-preview/transition.js";
import { MaterialPreview } from "../../../../../source/script/3d/manager/material-preview.js";
import { MeshPreview } from "../../../../../source/script/3d/manager/mesh-preview.js";
import { MiniPreview } from "../../../../../source/script/3d/manager/mini-preview.js";
import { ModelPreview } from "../../../../../source/script/3d/manager/model-preview.js";
import { PreviewBase } from "../../../../../source/script/3d/manager/preview/preview-base.js";
import { SkeletonPreview } from "../../../../../source/script/3d/manager/skeleton-preview.js";
export declare class PreviewManager {
    _previewMgrMap: Map<string, PreviewBase>;
    scenePreview: import("../../../../../source/script/3d/manager/preview/scene-preview.js").ScenePreview;
    materialPreview: MaterialPreview;
    miniPreview: MiniPreview;
    modelPreview: ModelPreview;
    meshPreview: MeshPreview;
    skeletonPreview: SkeletonPreview;
    motionPreview: MotionPreview;
    transitionPreview: TransitionPreview;
    _electronIPC: any;
    init(): void;
    private initPreview;
    queryPreviewData(previewName: string, info: any): Promise<any>;
    callPreviewFunction(previewName: string, funcName: string, ...args: any[]): Promise<any>;
    unregisterPreview(): void;
    registerPreview(): void;
    private _register;
}
declare const previewMgr: PreviewManager;
export { previewMgr };
//# sourceMappingURL=index.d.ts.map
