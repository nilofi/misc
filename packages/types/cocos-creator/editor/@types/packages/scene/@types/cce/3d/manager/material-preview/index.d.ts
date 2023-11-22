import { Material, Scene } from "cc";
import { InteractivePreview } from "../../../../../source/script/3d/manager/preview/Interactive-preview.js";
declare class MaterialPreview extends InteractivePreview {
    private lightComp;
    private modelComp;
    private primitive;
    private material;
    private dummyUniformBuffer;
    private dummyStorageTexture;
    private dummySampleTexture;
    private dummySampler;
    private dummyStorageBuffer;
    private uniformBuffer;
    private storageBuffer;
    init(registerName: string, queryName: string): void;
    createNodes(scene: Scene): void;
    setMaterial(material: Material | null): void;
    updateDs(): void;
    setPrimitive(primitive: string): void;
    setLightEnable(enable: boolean): void;
    onMouseDown(event: any): void;
}
export { MaterialPreview };
//# sourceMappingURL=index.d.ts.map
