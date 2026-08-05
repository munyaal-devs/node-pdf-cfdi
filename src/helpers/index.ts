import { convertToText } from "../utils";

export * from "./generator"

export const currency = (value: number = 0, currency: string = 'MXN', locales: string = 'es-MX') => {
    const formatter = new Intl.NumberFormat(locales, {
        style: 'currency',
        currency
    });

    return formatter.format(value)
}

export const getTotalText = (value: string) => {
    const values = value.split('.');
    const n1 = convertToText(values[0]);

    
    const decimalRaw = values[1] ?? "";
    const decimal = `${decimalRaw}`.padEnd(2, "0").substring(0, 2);
    const n2 = `${decimal}/100`;

    return `${n1} ${n2}`.toUpperCase();
}