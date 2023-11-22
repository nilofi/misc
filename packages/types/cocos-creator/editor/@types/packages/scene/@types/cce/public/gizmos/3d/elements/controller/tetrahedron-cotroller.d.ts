import { Color, Node, Vec3 } from "cc";
import ControllerBase from "../../../../../../../source/script/public/gizmos/3d/elements/controller/controller-base.js";
declare class TetrahedronController extends ControllerBase {
    private _edgesNode;
    private _edgesMR;
    private _indices;
    constructor(rootNode: Node);
    setColor(color: Color): void;
    initShape(): void;
    updateData(v0: Vec3, v1: Vec3, v2: Vec3, v3: Vec3): void;
}
export default TetrahedronController;
//# sourceMappingURL=tetrahedron-cotroller.d.ts.map
