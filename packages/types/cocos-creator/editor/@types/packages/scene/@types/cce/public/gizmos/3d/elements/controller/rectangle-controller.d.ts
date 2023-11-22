import { Color, Node, Vec2, Vec3 } from "cc";
import EditableController from "../../../../../../../source/script/public/gizmos/3d/elements/controller/editable-controller.js";
import { IControlMouseEvent, IRectangleControllerOption } from "../../../../../../../source/script/public/gizmos/defines.js";
declare enum RectHandleType {
    None = "none",
    TopLeft = "tl",
    TopRight = "tr",
    BottomLeft = "bl",
    BottomRight = "br",
    Left = "neg_x",
    Right = "x",
    Top = "y",
    Bottom = "neg_y",
    Area = "area",
    Anchor = "anchor",
}
declare type AxisDir = {
    x?: Vec3;
    y?: Vec3;
} & Partial<Record<RectHandleType, Vec3>>;
declare class RectangleController extends EditableController {
    static RectHandleType: typeof RectHandleType;
    anchorLocked: boolean;
    contentSizeLocked: boolean;
    private _center;
    protected _size: Vec2;
    private _deltaSize;
    private _curHandleType;
    private _rectNode;
    private _panPlane;
    private _areaNode;
    private _areaMR;
    private _rectMR;
    private _mouseDownOnPlanePos;
    private _areaColor;
    private _areaOpacity;
    private _axisDir;
    constructor(rootNode: Node, opts?: IRectangleControllerOption);
    setColor(color: Color): void;
    setOpacity(opacity: number): void;
    setAreaColor(color: Color): void;
    setAreaOpacity(opacity: number): void;
    isBorder(axisName: string): boolean;
    isCorner(axisName: string): boolean;
    isAreaOrAnchor(handleName: string): boolean;
    onInitEditHandles(): void;
    showEditHandles(): void;
    hideEditHandles(): void;
    _updateEditHandle(axisName: keyof AxisDir): void;
    initShape(): void;
    updateSize(center: Readonly<Vec3>, size: Vec2): void;
    onMouseDown(event: IControlMouseEvent): void;
    onMouseMove(event: IControlMouseEvent): void;
    onMouseUp(event: IControlMouseEvent): void;
    onMouseLeave(event: IControlMouseEvent): void;
    onHoverIn(event: IControlMouseEvent): void;
    onHoverOut(): void;
    onHide(): void;
    getDeltaSize(): Vec3;
    getCurHandleType(): RectHandleType;
    reset(): void;
}
export { RectHandleType, RectangleController };
//# sourceMappingURL=rectangle-controller.d.ts.map
