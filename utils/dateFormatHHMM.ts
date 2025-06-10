export const dateFormatHHMM = (value: string) => {
    const datetime = new Date(value);
    return datetime.toLocaleTimeString('default', {hour: 'numeric', minute: '2-digit'});
}