const excludes = ['xmlns'];

export function copyProps(src: {[key: string]: any}, dst: {[key: string]: any}) {
    for (const key in src) {
        if (excludes.indexOf(key) === -1 && src.hasOwnProperty(key)) {
            dst[key] = src[key];
        }
    }
}

export function toBoolean(str: string): boolean {
    return str === 'true';
}
