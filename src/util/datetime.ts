export function toDate(datetime: string): Date {
    return new Date(datetime);
}

export function toString(datetime: Date): string {
    const YY = datetime.getUTCFullYear();
    const month = datetime.getUTCMonth() + 1;
    const MM = month < 10 ? '0' + month : '' + month;
    const day = datetime.getUTCDate();
    const DD = day < 10 ? '0' + day : '' + day;
    const hour = datetime.getUTCHours();
    const hh = hour < 10 ? '0' + hour : '' + hour;
    const minute = datetime.getUTCMinutes();
    const mm = minute < 10 ? '0' + minute : '' + minute;
    const second = datetime.getUTCSeconds();
    const ss = second < 10 ? '0' + second : '' + second;
    return `${YY}-${MM}-${DD}T${hh}:${mm}:${ss}Z`;
}
