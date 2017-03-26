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

export function formatDateTime(date: Date): string {
    const YY = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const MM = month < 10 ? '0' + month : '' + month;
    const day = date.getUTCDate();
    const DD = day < 10 ? '0' + day : '' + day;
    const hour = date.getUTCHours();
    const hh = hour < 10 ? '0' + hour : '' + hour;
    const minute = date.getUTCMinutes();
    const mm = minute < 10 ? '0' + minute : '' + minute;
    const second = date.getUTCSeconds();
    const ss = second < 10 ? '0' + second : '' + second;
    return `${YY}-${MM}-${DD}T${hh}:${mm}:${ss}Z`;
}

export function toBoolean(str: string): boolean {
    return str === 'true';
}
