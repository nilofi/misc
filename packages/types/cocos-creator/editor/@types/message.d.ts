import * as AssetDb from "./packages/asset-db/@types/message.js";
import * as Builder from "./packages/builder/@types/message.js";
import * as Engine from "./packages/engine/@types/message.js";
import * as Information from "./packages/information/@types/message.js";
import * as Preferences from "./packages/preferences/@types/message.js";
import * as Program from "./packages/program/@types/message.js";
import * as Programming from "./packages/programming/@types/message.js";
import * as Project from "./packages/project/@types/message.js";
import * as Scene from "./packages/scene/@types/message.js";
import * as Server from "./packages/server/@types/message.js";

declare global {
    interface EditorMessageContent {
        params: any[];
        result: any;
    }

    interface EditorMessageMap {
        [x: string]: EditorMessageContent;
    }

    interface EditorMessageMaps {
        [x: string]: EditorMessageMap;
        "asset-db": AssetDb.message;
        "builder": Builder.message;
        "engine": Engine.message;
        "information": Information.message;
        "preferences": Preferences.message;
        "program": Program.message;
        "programming": Programming.message;
        "project": Project.message;
        "scene": Scene.message;
        "server": Server.message;
    }
}
