import * as commentJson from "comment-json";

export function parse<T>(
    text: string,
    reviver?: (key: string, value: unknown) => unknown,
    removeComments: boolean = false,
): T {
    return commentJson.parse(text, reviver as never, removeComments) as T;
}

/**
 * 尾随逗号会被消除
 *
 * @param [space=2] 缩进，如果为空字符串则不会输出注释
 */
export function stringify(
    value: unknown,
    replacer?:
        | ((key: string, value: unknown) => unknown)
        | (number | string)[]
        | null,
    space: string | number = 2,
) {
    return commentJson.stringify(value, replacer, space);
}

export { CommentArray, assign } from "comment-json";
