export const currency = (value: number = 0, currency: string = 'MXN', locales: string = 'es-MX') => {
    const formatter = new Intl.NumberFormat(locales, {
        style: 'currency',
        currency
    });

    return formatter.format(value)
}
