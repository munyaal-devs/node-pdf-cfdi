"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalText = exports.currency = void 0;
const utils_1 = require("../utils");
__exportStar(require("./generator"), exports);
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
    if (values[1] && values[1].length > 0) {
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
//# sourceMappingURL=index.js.map