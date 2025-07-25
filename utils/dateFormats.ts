export const dateFormatHHMM = (value: string) => {
    const datetime = new Date(value);
    return datetime.toLocaleTimeString('en-GB', {hour: 'numeric', minute: '2-digit'});
}

export const dateFormatDDMMMYYYY = (value: string) => {
    const datetime = new Date(value);
    return datetime.toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric'});
}

export const dateFormatDDMonthYYYY = (value: string) => {
    const datetime = new Date(value);
    return datetime.toLocaleDateString('en-GB', {day: '2-digit', month: 'long', year: 'numeric'});
}

export const dateFormatWDDMYYYY = (value: string) => {
    const datetime = new Date(value);
    return datetime.toLocaleDateString('en-GB', {weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'});
}