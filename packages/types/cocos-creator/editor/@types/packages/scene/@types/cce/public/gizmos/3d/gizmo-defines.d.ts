import GizmoBase from "../../../../../source/script/public/gizmos/3d/elements/gizmo-base.js";
import SceneGizmo from "../../../../../source/script/public/gizmos/3d/elements/scene-gizmo.js";
import PositionGizmo from "../../../../../source/script/public/gizmos/3d/elements/transform/position-gizmo.js";
import RectGizmo from "../../../../../source/script/public/gizmos/3d/elements/transform/rect-gizmo.js";
import RotationGizmo from "../../../../../source/script/public/gizmos/3d/elements/transform/rotation-gizmo.js";
import ScaleGizmo from "../../../../../source/script/public/gizmos/3d/elements/transform/scale-gizmo.js";
declare const GizmoDefines: {
    "cc.Scene": typeof SceneGizmo;
    position: typeof PositionGizmo;
    rotation: typeof RotationGizmo;
    scale: typeof ScaleGizmo;
    rect: typeof RectGizmo;
    components: Record<string, typeof GizmoBase>;
    iconGizmo: Record<string, typeof GizmoBase>;
    persistentGizmo: Record<string, typeof GizmoBase>;
};
export default GizmoDefines;
//# sourceMappingURL=gizmo-defines.d.ts.map
