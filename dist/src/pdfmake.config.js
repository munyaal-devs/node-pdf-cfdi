"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfmakeDefaultStyle = exports.pdfmakeTableLayout = exports.pdfmakeTableZebraLayout = exports.pdfmakeTableConceptLayout = exports.pdfmakeStyles = void 0;
exports.pdfmakeStyles = {
    tableCell: {
        lineHeight: 1.15
    },
    tableDefault: {
        margin: [0, 0],
    },
    tableHeaderDefault: {
        bold: true,
    },
};
exports.pdfmakeTableConceptLayout = {
    fillColor: (rowIndex, node, columnIndex) => {
        return (rowIndex === 0) ? '#DCDDE2' : null;
    },
    // defaultBorder: false,
    hLineWidth: (i, node) => i > 1 ? 1 : 0,
    hLineColor: () => '#D0CECE',
    vLineWidth: () => 0,
    vLineColor: () => '#D0CECE',
};
exports.pdfmakeTableZebraLayout = {
    fillColor: (rowIndex, node, columnIndex) => {
        return (rowIndex % 2 === 0) ? '#DCDDE2' : null;
    },
    defaultBorder: false,
};
exports.pdfmakeTableLayout = {
    fillColor: (rowIndex, node, columnIndex) => {
        return (rowIndex === 0) ? '#DCDDE2' : null;
    },
    defaultBorder: false,
};
exports.pdfmakeDefaultStyle = {
    font: 'OpenSans',
    columnGap: 5,
    fontSize: 7,
    lineHeight: 1.25,
    color: '#595959',
};
