export function toDate(time: string): Date {
    const splits = time.split(':');
    const date = new Date();
    date.setHours(Number(splits[0]));
    date.setMinutes(Number(splits[1]));
    date.setSeconds(Number(splits[2]));
    return date;
}

export function toString(time: Date): string {
    const hours = time.getHours();
    const hh = hours < 10 ? '0' + hours : '' + hours;
    const minutes = time.getMinutes();
    const mm = minutes < 10 ? '0' + minutes : '' + minutes;
    const seconds = time.getSeconds();
    const ss = seconds < 10 ? '0' + seconds : '' + seconds;
    return `${hh}:${mm}:${ss}`;
}
