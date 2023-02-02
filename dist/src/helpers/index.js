"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalText = exports.currency = void 0;
const utils_1 = require("../utils");
const currency = (value = 0, currency = 'MXN', locales = 'es-MX') => {
    const formatter = new Intl.NumberFormat(locales, {
        style: 'currency',
        currency
    });
    return formatter.format(value);
};
exports.currency = currency;
const getTotalText = (value) => {
    const values = value.split('.');
    const n1 = (0, utils_1.convertToText)(values[0]);
    let n2 = `00/100`;
    if (values[1].length > 0) {
        if (`${parseInt(values[1])}`.length === 1) {
            n2 = `${values[1]}/100`;
        }
        else {
            n2 = `${parseInt(values[1])}/100`;
        }
    }
    return `${n1} ${n2}`.toUpperCase();
};
exports.getTotalText = getTotalText;
