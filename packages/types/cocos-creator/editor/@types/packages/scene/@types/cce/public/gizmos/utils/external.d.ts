import aabb from "../../../../../source/script/utils/aabb.js";
import EditorMath from "../../../../../source/script/utils/math.js";
declare class External {
    NodeUtils: import("../../../../../source/script/utils/node.js").NodeUtils;
    EditorMath: typeof EditorMath;
    EditorCamera: import("../../../../../source/script/3d/manager/camera.js").Camera;
    GeometryUtils: {
        aabb: typeof aabb;
        calculateNormals: any;
    };
}
declare const external: External;
export default external;
//# sourceMappingURL=external.d.ts.map
