import { IRuler } from "../../../../../../../source/script/3d/manager/camera/2d/ruler-interface.js";
import Grid from "../../../../../../../source/script/3d/manager/camera/grid.js";
declare class Ruler implements IRuler {
    show(isShow: boolean): void;
    init(): void;
    updateTicks(grid: Grid): void;
    resize(width: number, height: number): void;
}
export { Ruler };
//# sourceMappingURL=ruler.d.ts.map
