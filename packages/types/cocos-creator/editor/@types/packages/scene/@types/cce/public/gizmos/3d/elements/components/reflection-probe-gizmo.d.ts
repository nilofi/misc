import { IMaterialInfo, Material } from "cc";
import Gizmo from "../../../../../../../source/script/public/gizmos/3d/elements/gizmo-base.js";
import { IControlMouseEvent } from "../../../../../../../source/script/public/gizmos/defines.js";
declare class ReflectionProbeGizmo extends Gizmo {
    static readonly SPHERE_NODE_NAME = "Reflection Probe Sphere";
    static readonly PLANE_NODE_NAME = "Reflection Probe Plane";
    private static _PLANE_PREFAB;
    private static _SPHERE_PREFAB;
    private _controller;
    private _bbHalfSize;
    private _sphereMeshRenderer;
    private _planeMeshRenderer;
    private _sphere;
    private _plane;
    onBBControllerMouseDown(event: IControlMouseEvent): void;
    onBBControllerMouseMove(event: IControlMouseEvent): void;
    onBBControllerMouseUp(event: IControlMouseEvent): void;
    init(): void;
    onShow(): void;
    generateMaterial(options?: IMaterialInfo): Material;
    onHide(): void;
    createController(): void;
    private loadSphere;
    private loadPlane;
    updateControllerTransform(): void;
    updateControllerData(): void;
    onTargetUpdate(): void;
    onNodeChanged(): void;
}
export default ReflectionProbeGizmo;
//# sourceMappingURL=reflection-probe-gizmo.d.ts.map
