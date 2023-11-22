import { Color, Node, Vec3 } from "cc";
import EditableController from "../../../../../../../source/script/public/gizmos/3d/elements/controller/editable-controller.js";
import { IControlMouseEvent } from "../../../../../../../source/script/public/gizmos/defines.js";
declare class BoxController extends EditableController {
    private _center;
    private _size;
    private _deltaSize;
    private _wireframeBoxNode;
    private _wireframeBoxMeshRenderer;
    private _cubeNode;
    private _cubeNodeMR;
    private _mouseDeltaPos;
    private _curDistScalar;
    constructor(rootNode: Node);
    setColor(color: Color): void;
    setOpacity(opacity: number): void;
    _updateEditHandle(axisName: string): void;
    initShape(): void;
    updateSize(center: Readonly<Vec3>, size: Vec3): void;
    onMouseDown(event: IControlMouseEvent): void;
    onMouseMove(event: IControlMouseEvent): void;
    onMouseUp(event: IControlMouseEvent): void;
    onMouseLeave(event: IControlMouseEvent): void;
    onHoverIn(event: IControlMouseEvent): void;
    onHoverOut(): void;
    getDeltaSize(): Vec3;
    showEditHandles(): void;
    hideEditHandles(): void;
}
export default BoxController;
//# sourceMappingURL=box-controller.d.ts.map
