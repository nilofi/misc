import { Camera, Color, Node, Texture2D, Vec3 } from "cc";
import ControllerBase from "../../../../../../../source/script/public/gizmos/3d/elements/controller/controller-base.js";
import { IControlMouseEvent } from "../../../../../../../source/script/public/gizmos/defines.js";
declare class WorldAxisController extends ControllerBase {
    private _defaultSize;
    private _sceneGizmoCamera;
    private _cameraOffset;
    private _viewDist;
    private _textNodeMap;
    constructor(rootNode: Node, sceneGizmoCamera: Camera);
    createAxis(axisName: string, color: Color, rotation: Vec3): void;
    initShape(): void;
    setTexture(node: Node, texture: Texture2D | null): void;
    setTextureByUUID(node: Node, uuid: string): void;
    createAxisText(axis: string, uuid: string, color: Color): void;
    onMouseUp(event: IControlMouseEvent): void;
    onHoverIn(event: IControlMouseEvent): void;
    onHoverOut(): void;
    onEditorCameraMoved(): void;
    onCameraProjectionChanged(projection: number): void;
}
export default WorldAxisController;
//# sourceMappingURL=world-axis-controller.d.ts.map
