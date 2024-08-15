import { format, isAbsolute, parse, relative, sep } from "path";

/**
 * 返回是否为子级路径
 */
export function isChild(
    parent: string,
    path: string,
    includeSelf: boolean = false,
) {
    const _relative = relative(parent, path);
    if (includeSelf && _relative === "") {
        return true;
    } else {
        return (
            _relative && !_relative.startsWith("..") && !isAbsolute(_relative)
        );
    }
}

/**
 * 获取目录路径的相对深度
 */
export function depth(parent: string, dir: string) {
    const _relative = relative(parent, dir);
    const depth = _relative.split(sep).length;
    return depth;
}

/**
 * 修改文件扩展名
 */
export function toExtname(path: string, ext: string) {
    return format({ ...parse(path), base: "", ext });
}
