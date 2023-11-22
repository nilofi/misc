import { IProperty } from "../../../../../source/public.js.js.js";
import { DumpInterface } from "../../../../../source/script/export/dump/types/dump-interface.js";
declare class ValueTypeDump implements DumpInterface {
    encode(object: any, data: IProperty, opts?: any): void;
    decode(data: any, info: any, dump: any, opts?: any): void;
}
export declare const valueTypeDump: ValueTypeDump;
export { };
//# sourceMappingURL=value-type-dump.d.ts.map
