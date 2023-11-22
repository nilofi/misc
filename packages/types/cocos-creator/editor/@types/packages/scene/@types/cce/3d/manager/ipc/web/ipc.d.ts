import ipc from "../../../../../../source/script/3d/manager/ipc/web/webview.js";
export declare type CustomWebIPC = {
    startup: () => void;
    clearQueue: () => void;
} & typeof ipc;
declare const customIpc: CustomWebIPC;
/**
 * 启动 ipc 模块
 */
export declare function startup(): void;
export default customIpc;
//# sourceMappingURL=ipc.d.ts.map
