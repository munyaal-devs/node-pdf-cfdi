"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataElement = exports.currency = void 0;
const currency = (value = 0, currency = 'MXN', locales = 'es-MX') => {
    const formatter = new Intl.NumberFormat(locales, {
        style: 'currency',
        currency
    });
    return formatter.format(value);
};
exports.currency = currency;
const getDataElement = (value, customSwitch) => {
    for (const { condition, fn } of customSwitch) {
        if (value === condition) {
            return fn();
        }
    }
};
exports.getDataElement = getDataElement;
