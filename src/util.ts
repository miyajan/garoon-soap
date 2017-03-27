const excludes = ['xmlns'];

export function copyProps(src: {[key: string]: any}, dst: {[key: string]: any}) {
    for (const key in src) {
        if (excludes.indexOf(key) === -1 && src.hasOwnProperty(key)) {
            dst[key] = src[key];
        }
    }
}

export function formatDate(date: Date): string {
    const yy = date.getFullYear();
    const month = date.getMonth() + 1;
    const mm = month < 10 ? '0' + month : '' + month;
    const day = date.getDate();
    const dd = day < 10 ? '0' + day : '' + day;
    return `${yy}-${mm}-${dd}`;
}

export function toBoolean(str: string): boolean {
    return str === 'true';
}
