import * as cc from "cc";
import { IProperty } from "../../../../../source/public.js.js.js";
import { DumpInterface } from "../../../../../source/script/utils/dump/types/dump-interface.js";
declare class AnimationCurveDump implements DumpInterface {
    encode(object: any, data: IProperty, opts?: any): void;
    decode(data: cc.CurveRange, info: any, dump: any, opts?: any): void;
}
export declare const animationCurveDump: AnimationCurveDump;
export { };
//# sourceMappingURL=animation-curve-dump.d.ts.map
