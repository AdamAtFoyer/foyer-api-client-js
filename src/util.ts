/**
 * Combines parts of a URL by joining with '/'.
 * 
 * @param parts sections of a URL that should be combined
 * @returns a URL string
 */
export function urlJoin(...parts: string[]): string {
    return parts.map(x => trimChar(x, '/')).join('/');
}

function trimChar(s: string, c: string) {
    let start = 0;
    let end = s.length;
    while (start < end && s[start] === c) {
        ++start;
    }
    while (end > start && s[end - 1] === c) {
        --end;
    }
    return (start > 0 || end < s.length) ? s.substring(start, end) : s;
}