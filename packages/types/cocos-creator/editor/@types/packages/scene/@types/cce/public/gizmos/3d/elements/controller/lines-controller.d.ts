import { Color, Node, Vec3 } from "cc";
import ControllerBase from "../../../../../../../source/script/public/gizmos/3d/elements/controller/controller-base.js";
declare class LinesController extends ControllerBase {
    private _linesNode;
    private _linesMR;
    private _dashed;
    constructor(rootNode: Node, opts?: any);
    initShape(opts?: any): void;
    setColor(color: Color): void;
    setOpacity(opacity: number): void;
    updateData(vertices: Vec3[], indices: number[]): void;
    clearData(): void;
}
export default LinesController;
//# sourceMappingURL=lines-controller.d.ts.map
