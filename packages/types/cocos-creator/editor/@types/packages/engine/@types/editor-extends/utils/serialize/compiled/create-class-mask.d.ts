/// <reference types="../../../../node_modules/cc/cc" />
import { deserialize } from "cc";
import { ClassNode, CustomClassNode } from "../../../../../source/editor-extends/utils/serialize/compiled/types.js";
import D = deserialize.Internal;
declare type IClass = D.IClass_;
declare type IMask = D.IMask_;
export default function (classNodes: (ClassNode | CustomClassNode)[]): {
    sharedClasses: (IClass | string)[];
    sharedMasks: IMask[];
};
export { };
//# sourceMappingURL=create-class-mask.d.ts.map
