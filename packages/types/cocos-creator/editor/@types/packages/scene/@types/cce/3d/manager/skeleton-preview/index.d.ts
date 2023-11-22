import { Scene } from "cc";
import { InteractivePreview } from "../../../../../source/script/3d/manager/preview/Interactive-preview.js";
declare class SkeletonPreview extends InteractivePreview {
    private lightComp;
    private _modelNode;
    private _jointMap;
    init(registerName: string, queryName: string): void;
    createNodes(scene: Scene): void;
    setSkeleton(uuid: string): Promise<{
        jointCount: number;
    } | null>;
    setLightEnable(enable: boolean): void;
    onMouseDown(event: any): void;
}
export { SkeletonPreview };
//# sourceMappingURL=index.d.ts.map
