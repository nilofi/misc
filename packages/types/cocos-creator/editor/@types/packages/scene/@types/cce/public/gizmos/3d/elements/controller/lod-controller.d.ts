import { Color, LabelComponent, Material, Size, Sprite, UITransform, Vec2, Vec3 } from "cc";
import { RectangleController } from "../../../../../../../source/script/public/gizmos/3d/elements/controller/rectangle-controller.js";
export default class LODController extends RectangleController {
    static readonly BACKGROUND_CONTENT_SIZE: Size;
    static readonly BACKGROUND_COLOR: Color;
    static readonly FONT_COLOR: Color;
    static readonly FONT_SIZE = 80;
    static readonly LINE_HEIGHT = 80;
    label: LabelComponent;
    labelUITransform: UITransform;
    sprite: Sprite;
    spriteUITransform: UITransform;
    spriteMaterial: Material;
    setString(str: string): void;
    initShape(): void;
    updateSize(center: Readonly<Vec3>, size: Vec2): void;
    adjustControllerSize(): void;
}
//# sourceMappingURL=lod-controller.d.ts.map
