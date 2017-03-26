export function toDate(time: string): Date {
    const splits = time.split(':');
    const date = new Date();
    date.setHours(Number(splits[0]));
    date.setMinutes(Number(splits[1]));
    date.setSeconds(Number(splits[2]));
    return date;
}
