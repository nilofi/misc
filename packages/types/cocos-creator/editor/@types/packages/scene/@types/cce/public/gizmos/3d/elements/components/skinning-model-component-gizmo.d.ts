import LightProbeTetrahedronController from "../../../../../../../source/script/public/gizmos/3d/elements/controller/light-probe-tetrahedron-controller.js";
import Gizmo from "../../../../../../../source/script/public/gizmos/3d/elements/gizmo-base.js";
import LightProbeEditModeListener from "../../../../../../../source/script/public/gizmos/3d/elements/listener/light-probe-edit-mode-listener.js";
declare class SkinningModelComponentGizmo extends Gizmo implements LightProbeEditModeListener {
    private _controller;
    tetrahedronController: LightProbeTetrahedronController | null;
    init(): void;
    lightProbeInfoChanged(): void;
    onShow(): void;
    onHide(): void;
    createController(): void;
    updateControllerTransform(): void;
    updateControllerData(): void;
    onTargetUpdate(): void;
    onNodeChanged(): void;
    onUpdate(): void;
}
export default SkinningModelComponentGizmo;
//# sourceMappingURL=skinning-model-component-gizmo.d.ts.map
