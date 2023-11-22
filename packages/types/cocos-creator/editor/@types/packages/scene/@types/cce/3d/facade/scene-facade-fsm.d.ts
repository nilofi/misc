import AnimationSceneFacade from "../../../../source/script/3d/facade/animation-scene-facade.js";
import GeneralSceneFacade from "../../../../source/script/3d/facade/general-scene-facade.js";
import PrefabSceneFacade from "../../../../source/script/3d/facade/prefab-scene-facade.js";
import PreviewSceneFacade from "../../../../source/script/3d/facade/preview-scene-facade.js";
import { ISceneFacadeState } from "../../../../source/script/3d/facade/scene-facade-state-interface.js";
import FiniteStateMachine from "../../../../source/script/3d/utils/state-machine/finite-state-machine.js";
declare class SceneFacadeFSM extends FiniteStateMachine<ISceneFacadeState> {
    generalSceneFacade: GeneralSceneFacade;
    animationSceneFacade: AnimationSceneFacade;
    prefabSceneFacade: PrefabSceneFacade;
    previewSceneFacade: PreviewSceneFacade;
    start(): void;
    toGeneral(opts?: any): Promise<boolean>;
    toAnimation(opts?: any): Promise<boolean>;
    toPrefab(opts?: any): Promise<boolean>;
    toPreview(opts?: any): Promise<boolean>;
    dumpAllScenes(): Promise<any>[];
    restoreAllScenes(dump: any[]): void;
    closeScene(): Promise<boolean>;
    closeSceneToGeneral(): Promise<false | undefined>;
}
declare function createSceneFacadeFSM(): SceneFacadeFSM;
export { SceneFacadeFSM, createSceneFacadeFSM };
//# sourceMappingURL=scene-facade-fsm.d.ts.map
