import { CameraComponent, Node } from "cc";
import { PreviewBase } from "../../../../../source/script/3d/manager/preview/preview-base.js";
import { ISceneEvents } from "../../../../../source/script/3d/manager/scene-events-interface.js";
export declare class MiniPreview extends PreviewBase implements ISceneEvents {
    previewNodes: any;
    scene: any;
    renderScene: any;
    currNode: any;
    _previewInfo: any;
    init(registerName: string, queryName: string): void;
    onResize(): void;
    setAspect(srcCamCom: any, tarCam: any): void;
    onNodeChanged(node: Node): void;
    onNodeRemoved(node: Node): void;
    handleSelect(uuid: string): void;
    handleUnselect(uuid: string): void;
    onComponentRemoved(comp: CameraComponent): void;
    private clearByComponent;
    removePreviewNode(srcCamera: CameraComponent): void;
    createPreviewNode(srcCamera: CameraComponent): any;
    setPreviewInfo(): void;
    getPreviewInfo(): any;
}
//# sourceMappingURL=index.d.ts.map
