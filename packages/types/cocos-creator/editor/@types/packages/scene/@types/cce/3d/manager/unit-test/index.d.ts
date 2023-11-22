import { UnitTestInfo } from "../../../../../source/public.js.js.js";
import { SceneFacadeManager } from "../../../../../source/script/3d/facade/scene-facade-manager.js";
declare class UnitTestManager {
    private _unitTestMap;
    constructor();
    test(sceneFacadeMgr: SceneFacadeManager, opts: UnitTestInfo): Promise<boolean | undefined>;
}
declare const unitTestMgr: UnitTestManager;
export { unitTestMgr };
//# sourceMappingURL=index.d.ts.map
