import { IProperty } from "../../../../../source/public.js.js.js";
import { DumpInterface } from "../../../../../source/script/export/dump/types/dump-interface.js";
declare class ComponentDump implements DumpInterface {
    encode(object: any, data: IProperty, opts?: any): void;
    decode(data: any, info: any, dump: any, opts?: any): void;
}
export declare const componentDump: ComponentDump;
export { };
//# sourceMappingURL=component-dump.d.ts.map
