import { Color, Node } from "cc";
import ControllerBase from "../../../../../../../source/script/public/gizmos/3d/elements/controller/controller-base.js";
import { IControlMouseEvent } from "../../../../../../../source/script/public/gizmos/defines.js";
declare class QuadController extends ControllerBase {
    protected _quadNode: Node | null;
    private _defaultSize;
    private _size;
    private _hoverColor;
    constructor(rootNode: Node, opts?: any);
    get hoverColor(): Color;
    set hoverColor(value: Color);
    initShape(opts?: any): void;
    onMouseDown(event: IControlMouseEvent): void;
    onMouseMove(event: IControlMouseEvent): void;
    onMouseUp(event: IControlMouseEvent): void;
    onHoverIn(event: IControlMouseEvent): void;
    onHoverOut(): void;
    onEditorCameraMoved(): void;
    onShow(): void;
    onHide(): void;
    updateSize(size: number): void;
    setMaterialProperty(name: string, value: any): void;
}
export default QuadController;
//# sourceMappingURL=quad-controller.d.ts.map
