import AssetManager from "../../source/editor-extends/manager/asset.js";
import ComponentManager from "../../source/editor-extends/manager/component.js";
import DialogManager from "../../source/editor-extends/manager/dialog.js";
import NodeManager from "../../source/editor-extends/manager/node.js";
import ScriptManager from "../../source/editor-extends/manager/script.js";
import { MissingClassReporter } from "../../source/editor-extends/missing-reporter/missing-class-reporter.js";
import { MissingObjectReporter } from "../../source/editor-extends/missing-reporter/missing-object-reporter.js";
import * as Uuid from "../../source/editor-extends/utils/uuid.js";
export declare const Script: ScriptManager;
export declare const Node: NodeManager;
export declare const Component: ComponentManager;
export declare const Asset: AssetManager;
export declare const Dialog: DialogManager;
export declare const UuidUtils: typeof Uuid;
export declare let GeometryUtils: any;
export declare let PrefabUtils: any;
export declare let serialize: any;
export declare let serializeCompiled: any;
export { walkProperties } from "../../source/editor-extends/missing-reporter/object-walker.js";
export declare const MissingReporter: {
    classInstance: {
        reporter: MissingClassReporter;
        classFinder(id: any, data: any, owner: any, propName: any): any;
        hasMissingClass: boolean;
        reportMissingClass(asset: any): void;
        reset(): void;
    };
    class: typeof MissingClassReporter;
    object: typeof MissingObjectReporter;
};
export declare function init(): Promise<void>;
/**
 * 启动各个管理器
 */
export declare function start(): void;
/**
 * 关闭各个管理器
 */
export declare function stop(): void;
export declare function emit(name: string | symbol, ...args: string[]): void;
export declare function on(name: string | symbol, handle: (...args: any[]) => void): void;
export declare function removeListener(name: string | symbol, handle: (...args: any[]) => void): void;
declare global {
    export const EditorExtends: typeof import("../../source/editor-extends/index.js");
    export namespace cce {
        namespace Utils {
            const serialize: typeof import("../../source/editor-extends/utils/serialize/index.js")["serialize"];
        }
    }
}
//# sourceMappingURL=index.d.ts.map
