export const dateFormatDDMMMYYYY = (value: string) => {
    const datetime = new Date(value);
    return datetime.toLocaleDateString('default', {day: '2-digit', month: 'short', year: 'numeric'});
}