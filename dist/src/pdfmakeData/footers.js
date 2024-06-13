"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.footerPage = void 0;
const footerPage = (currentPage, pageCount) => {
    return [
        {
            width: 80,
            alignment: "left",
            marginLeft: 25,
            fontSize: 6,
            text: `Munyaal Apps`,
        },
        {
            width: "*",
            alignment: "center",
            fontSize: 6,
            text: `Este documento es una representación impresa de un CFDI versión 4.0`,
        },
        {
            width: 80,
            alignment: "right",
            marginRight: 25,
            fontSize: 6,
            text: `Página ${currentPage} de ${pageCount}`,
        },
    ];
};
exports.footerPage = footerPage;
