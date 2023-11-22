import { SharedSettings } from "./protected.js";
export interface message extends EditorMessageMap {
    "query-shared-settings": {
        params: [];
        result: SharedSettings;
    };
}
