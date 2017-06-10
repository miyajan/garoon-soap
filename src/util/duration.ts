export function toDate(duration: string): Date {
    const found = duration.match(/^P(\d+)Y(\d+)M(\d+)DT(\d+)H(\d+)M(\d+)S$/);
    if (found === null) {
        throw Error(`${duration} is not xsd:duration type`)
    }

    const date = new Date();
    date.setUTCFullYear(Number(found[1]));
    date.setUTCMonth(Number(found[2]));
    date.setUTCDate(Number(found[3]));
    date.setUTCHours(Number(found[4]));
    date.setUTCMinutes(Number(found[5]));
    date.setUTCSeconds(Number(found[6]));

    return date;
}
