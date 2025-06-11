export const dateFormatDDMonthYYYY = (value: string) => {
    const datetime = new Date(value);
    return datetime.toLocaleDateString('default', {day: '2-digit', month: 'long', year: 'numeric'});
}