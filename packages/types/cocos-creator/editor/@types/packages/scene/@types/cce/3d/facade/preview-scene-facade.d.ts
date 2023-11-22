import { Component, Node } from "cc";
import { IChangeNodeOptions, IOptionBase } from "../../../../source/private.js";
import GeneralSceneFacade from "../../../../source/script/3d/facade/general-scene-facade.js";
import PreviewPlay from "../../../../source/script/3d/manager/preview-play.js";
import { ISceneEvents } from "../../../../source/script/3d/manager/scene-events-interface.js";
declare class PreviewSceneFacade extends GeneralSceneFacade {
    protected _previewPlay: import("../../../../source/script/3d/manager/preview-play.js").PreviewPlay;
    private _isEnter;
    init(): void;
    enter(opts: any): Promise<void>;
    exit(): Promise<void>;
    enterGameview(sceneJson?: string): Promise<void>;
    callPreviewPlayMethod<T extends keyof typeof PreviewPlay>(method: T, ...args: Parameters<(typeof PreviewPlay)[T]>): Promise<any>;
    redirectInput(): void;
    private registerOperation;
    private isInputRedirected;
    dispatchEvents(eventName: keyof ISceneEvents, ...args: any[any]): Promise<void>;
    dispatchEventsOnly(eventName: keyof ISceneEvents, ...args: any[any]): void;
    onSceneOpened(scene: any): void;
    onNodeChanged(node: Node, opts: IChangeNodeOptions): void;
    onAddNode(node: Node): void;
    onRemoveNode(node: Node): void;
    onNodeAdded(node: Node, opts?: IOptionBase): void;
    onNodeRemoved(node: Node, opts: IOptionBase): void;
    onComponentAdded(comp: Component, opts?: IOptionBase): void;
    saveScene(asNew: boolean): Promise<boolean>;
}
export default PreviewSceneFacade;
//# sourceMappingURL=preview-scene-facade.d.ts.map
