const excludes = ['xmlns'];

export function copyProps(src: Object, dst: Object) {
    for (const key in src) {
        if (excludes.indexOf(key) === -1 && src.hasOwnProperty(key)) {
            dst[key] = src[key];
        }
    }
}
