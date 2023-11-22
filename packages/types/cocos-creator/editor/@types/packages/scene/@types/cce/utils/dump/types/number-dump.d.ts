import { IProperty } from "../../../../../source/public.js.js.js";
import { DumpInterface } from "../../../../../source/script/utils/dump/types/dump-interface.js";
declare class NumberDump implements DumpInterface {
    encode(object: any, data: IProperty, opts?: any): void;
    decode(data: any, info: any, dump: any, opts?: any): void;
}
export declare const numberDump: NumberDump;
export { };
//# sourceMappingURL=number-dump.d.ts.map
