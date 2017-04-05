export function toDate(date: string): Date {
    return new Date(date);
}

export function toString(date: Date): string {
    const yy = date.getFullYear();
    const month = date.getMonth() + 1;
    const mm = month < 10 ? '0' + month : '' + month;
    const day = date.getDate();
    const dd = day < 10 ? '0' + day : '' + day;
    return `${yy}-${mm}-${dd}`;
}
