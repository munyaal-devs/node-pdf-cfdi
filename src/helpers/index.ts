export const currency = (value: number = 0, currency: string = 'MXN', locales: string = 'es-MX') => {
    const formatter = new Intl.NumberFormat(locales, {
        style: 'currency',
        currency
    });

    return formatter.format(value)
}


export const getDataElement = (value: string, customSwitch: {condition: string, fn: Function}[]) => {
    for (const { condition, fn } of customSwitch) {
        if (value === condition) {
            return fn();
        }
    }
}