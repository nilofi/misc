import { ISceneFacadeState } from "../../../../source/script/3d/facade/scene-facade-state-interface.js";
import { Transition } from "../../../../source/script/3d/utils/state-machine/transition.js";
declare class ToAnimationTransition<TState extends ISceneFacadeState> extends Transition<TState> {
    constructor(from: TState, to: TState, testConditionFunc?: Function | null);
    testCondition(): Promise<boolean>;
    Complete(): Promise<void>;
}
declare class ToGeneralTransition<TState extends ISceneFacadeState> extends Transition<TState> {
    constructor(from: TState, to: TState, testConditionFunc?: Function | null);
    testCondition(): Promise<boolean>;
}
declare class ToPreviewTransition<TState extends ISceneFacadeState> extends Transition<TState> {
    constructor(from: TState, to: TState, testConditionFunc?: Function | null);
    Complete(): Promise<void>;
}
declare class ToPrefabTransition<TState extends ISceneFacadeState> extends Transition<TState> {
    constructor(from: TState, to: TState, testConditionFunc?: Function | null);
    testCondition(): Promise<boolean>;
    Complete(): Promise<void>;
}
export { ToAnimationTransition, ToGeneralTransition, ToPrefabTransition, ToPreviewTransition };
//# sourceMappingURL=scene-facade-state-transition.d.ts.map
