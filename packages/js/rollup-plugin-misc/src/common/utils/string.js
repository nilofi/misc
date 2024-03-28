/**
 * 替换最后一个匹配的字符串
 *
 * @param {string} str
 * @param {string} search
 * @param {string} replace
 */
export function replaceFromLast(str, search, replace) {
    const index = str.lastIndexOf(search);
    if (index === -1) {
        return str;
    }
    return (
        str.substring(0, index) + replace + str.substring(index + search.length)
    );
}
