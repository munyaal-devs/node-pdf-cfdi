import { convertToText } from "../utils";

export * from "./generator"

export const currency = (value: number = 0, currency: string = 'MXN', locales: string = 'es-MX') => {
    const formatter = new Intl.NumberFormat(locales, {
        style: 'currency',
        currency
    });

    return formatter.format(value)
}

export const getTotalText = (value: string) =>{
    const values = value.split('.');
    const n1 = convertToText(values[0]);
    let n2 = `00/100`
    if (values[1].length > 0) {
        if (`${parseInt(values[1])}`.length === 1) {
            n2 = `${values[1]}/100`;
        }
        else {
            n2 = `${parseInt(values[1])}/100`;
        }
    }

    return `${n1} ${n2}`.toUpperCase();
}