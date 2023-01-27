"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currency = void 0;
const currency = (value = 0, currency = 'MXN', locales = 'es-MX') => {
    const formatter = new Intl.NumberFormat(locales, {
        style: 'currency',
        currency
    });
    return formatter.format(value);
};
exports.currency = currency;
