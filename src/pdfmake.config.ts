import { Style, StyleDictionary, TableLayout } from "pdfmake/interfaces";

export const pdfmakeStyles: StyleDictionary = {
    tableCell: {
        lineHeight: 1.15
    },
    tableDefault: {
        margin: [0, 0],
    },
    tableHeaderDefault: {
        bold: true,
    },
}

export const pdfmakeTableConceptLayout: TableLayout = {
    fillColor: (rowIndex, node, columnIndex) => {
        return (rowIndex === 0) ? '#DCDDE2' : null;
    },
    // defaultBorder: false,
    hLineWidth: (i, node) => i > 1 ? 1 : 0,
    hLineColor: () => '#D0CECE',
    vLineWidth: () => 0,
    vLineColor: () => '#D0CECE',
}

export const pdfmakeTableZebraLayout: TableLayout = {
    fillColor: (rowIndex, node, columnIndex) => {
        return (rowIndex % 2 === 0) ? '#DCDDE2' : null;
    },
    defaultBorder: false,
}

export const pdfmakeTableLayout: TableLayout = {
    fillColor: (rowIndex, node, columnIndex) => {
        return (rowIndex === 0) ? '#DCDDE2' : null;
    },
    defaultBorder: false,
}

export const pdfmakeDefaultStyle: Style = {
    font: 'OpenSans',
    columnGap: 5,
    fontSize: 7,
    lineHeight: 1.25,
    color: '#595959',
}
