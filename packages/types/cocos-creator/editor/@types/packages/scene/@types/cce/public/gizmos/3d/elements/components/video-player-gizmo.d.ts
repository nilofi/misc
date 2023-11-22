import { Texture2D } from "cc";
import ImageController from "../../../../../../../source/script/public/gizmos/3d/elements/controller/image-controller.js";
import GizmoBase from "../../../../../../../source/script/public/gizmos/3d/elements/gizmo-base.js";
declare class VideoPlayerGizmo extends GizmoBase {
    protected _controller: ImageController;
    protected _videoElem: HTMLVideoElement | null;
    protected _canvasElem: HTMLCanvasElement | null;
    protected _canvas2D: CanvasRenderingContext2D | null;
    protected _image: any;
    protected _tex2D: Texture2D;
    protected _curUrl: string;
    init(): void;
    onShow(): void;
    onHide(): void;
    createController(): void;
    onControllerMouseDown(): void;
    onControllerMouseMove(): void;
    onControllerMouseUp(): void;
    updateControllerData(): void;
    onVideoLoaded(): void;
    updateControllerTransform(): void;
    updateController(): void;
    onTargetUpdate(): void;
    onNodeChanged(): void;
}
export default VideoPlayerGizmo;
//# sourceMappingURL=video-player-gizmo.d.ts.map
