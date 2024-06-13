"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.summary = void 0;
const helpers_1 = require("../helpers");
const pdfmake_config_1 = require("../pdfmake.config");
const summary = (data) => {
    return [
        {
            columns: [
                {
                    width: "*",
                    layout: "noBorders",
                    table: {
                        widths: ["*"],
                        body: [
                            [{ text: "Subtotal", alignment: "right" }],
                            [{ text: "Descuento", alignment: "right" }],
                            [{ text: "IVA Trasladado (16%)", alignment: "right" }],
                        ],
                    },
                },
                {
                    width: 50,
                    layout: "noBorders",
                    table: {
                        widths: ["*"],
                        body: [
                            [
                                {
                                    text: (0, helpers_1.currency)(parseFloat(`${data.SubTotal}`)),
                                    alignment: "right",
                                    bold: true,
                                },
                            ],
                            [
                                {
                                    text: (0, helpers_1.currency)(isNaN(parseFloat(`${data.Descuento}`))
                                        ? 0
                                        : parseFloat(`${data.Descuento}`)),
                                    alignment: "right",
                                    bold: true,
                                },
                            ],
                            [
                                {
                                    text: (0, helpers_1.currency)(isNaN(parseFloat(`${data.Impuestos?.TotalImpuestosTrasladados}`))
                                        ? 0
                                        : parseFloat(`${data.Impuestos?.TotalImpuestosTrasladados}`)),
                                    alignment: "right",
                                    bold: true,
                                },
                            ],
                        ],
                    },
                },
            ],
        },
        {
            layout: pdfmake_config_1.pdfmakeTableLayout,
            table: {
                widths: ["*"],
                body: [
                    [
                        {
                            fontSize: 10,
                            text: [
                                { text: "Total " },
                                {
                                    text: (0, helpers_1.currency)(parseFloat(`${data.Total}`)),
                                    bold: true,
                                },
                            ],
                            alignment: "right",
                        },
                    ],
                    [
                        {
                            alignment: "center",
                            text: [
                                { text: "IMPORTE CON LETRAS: ", bold: true },
                                {
                                    text: `${(0, helpers_1.getTotalText)(data.Total)} ${data.Moneda}`,
                                },
                            ],
                        },
                    ],
                ],
            },
        },
    ];
};
exports.summary = summary;
