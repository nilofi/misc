import { format, join, parse, sep } from "path";
import type { LogHandlerWithDefault, ModuleFormat } from "rollup";
import type { Chunk, Chunks } from "./builders/chunk-builder.js";

/**
 * 某些警告应该被得到重视
 */
export function logger(): LogHandlerWithDefault {
    const isSkipLogCode = (code: string | undefined) => {
        return [
            // prettier-keep
            "EMPTY_BUNDLE",
        ].includes(code ?? "");
    };

    const isSkipLogMessage = (msg: string): string | undefined => {
        return [
            // prettier-keep
        ].find(v => msg.includes(v));
    };

    const isSkipLogPlugin = (name: string | undefined): boolean => {
        return [
            // prettier-keep
            "typescript",
        ].includes(name ?? "");
    };

    return (level, log, handler) => {
        if (
            level === "warn" &&
            !isSkipLogCode(log.code) &&
            !isSkipLogMessage(log.message) &&
            !isSkipLogPlugin(log.plugin)
        ) {
            handler("error", log);
        } else {
            handler(level, log);
        }
    };
}

/**
 * `dist/cocos-es/abc/index.js` 对应 `src/abc/index.ts`
 *
 * 如果 Key 是 "." `dist/abc/index.js` 对应 `src/abc/index.ts`
 */
function chunkToSrcPath(chunkKey: string, chunkDist: string) {
    const obj = parse(chunkDist);

    obj.dir = obj.dir.replace(chunkToDistDir(chunkKey), "src");
    obj.ext = ".ts";
    obj.base = obj.name + obj.ext;

    return format(obj);
}

/**
 * 如果 Key 是 "."，则返回 `dist`，否则返回 `dist/${chunkKey}`
 */
export function chunkToDistDir(chunkKey: string) {
    if (chunkKey === ".") {
        return `dist`;
    } else {
        return `dist/${chunkKey}`;
    }
}

/**
 * `./dist/index.js` -> `dist/index`
 */
function chunkToEntryKey(chunkKey: string, chunkDist: string) {
    const info = parse(chunkDist);
    let key = join(
        info.dir.replace(`${chunkToDistDir(chunkKey)}`, ""),
        info.name,
    );
    if (key[0] === sep) {
        key = key.slice(1);
    }
    return key;
}

export function chunkToRollupInput(key: string, chunk: Chunk) {
    const obj: {
        [entryAlias: string]: string;
    } = {};

    for (const dist of chunk.entrys) {
        obj[chunkToEntryKey(key, dist)] = chunkToSrcPath(key, dist);
    }

    return obj;
}

export function conditionsToFormat(
    conditions: Set<string> | null,
    defaultEsm: boolean,
): ModuleFormat & ("cjs" | "esm") {
    if (conditions?.has("require")) {
        return "cjs";
    } else if (conditions?.has("import")) {
        return "esm";
    } else {
        return defaultEsm ? "esm" : "cjs";
    }
}

export function chunksToConstans(
    chunks: Chunks,
    fixeds: Set<string>,
    curr?: Chunk,
) {
    const conditions: Record<string, unknown> = {};
    for (const [key, chunk] of chunks.chunks) {
        if (chunk.conditions) {
            for (const condition of chunk.conditions) {
                conditions[condition.toUpperCase()] = false;
            }
        }
    }
    for (const fixed of fixeds) {
        conditions[fixed.toUpperCase()] = false;
    }
    if (curr?.conditions) {
        for (const condition of curr.conditions) {
            conditions[condition.toUpperCase()] = true;
        }
    }
    return conditions;
}

export function pickRedirectSuffix(
    redirects: string[],
    chunk: Chunk,
): { suffix: string; errMsg?: string } {
    const _redirects = new Set(redirects);
    let suffix = "";
    if (chunk.conditions) {
        for (const condition of chunk.conditions) {
            if (_redirects.has(condition)) {
                if (suffix) {
                    return {
                        suffix: "",
                        errMsg: `有多个可能的重定向后缀，比如：${suffix} 和 ${condition}`,
                    };
                }
                suffix = condition;
            }
        }
    }
    return {
        suffix,
    };
}

export function isJsExt(ext: string) {
    if (ext.at(0) === ".") {
        ext = ext.slice(1);
    }
    return (
        ext === "js" ||
        ext === "mjs" ||
        ext === "cjs" ||
        ext === "jsx" ||
        ext === "cjsx" ||
        ext === "mjsx"
    );
}
