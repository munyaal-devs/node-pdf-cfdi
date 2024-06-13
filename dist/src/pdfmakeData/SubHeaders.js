"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payment = exports.receptor = void 0;
const cfdi_catalogs_1 = require("@munyaal/cfdi-catalogs");
const receptor = (Receptor) => {
    return {
        widths: ["*"],
        body: [
            [
                {
                    text: "Información del cliente",
                    alignment: "left",
                    style: "tableCell",
                    marginTop: 0.15,
                    bold: true,
                },
            ],
            [
                {
                    text: `${Receptor.Nombre}`,
                    bold: true,
                    style: "tableCell",
                    alignment: "left",
                },
            ],
            [
                {
                    width: "*",
                    text: ["RFC: ", { text: `${Receptor.Rfc}`, bold: true }],
                    style: "tableCell",
                    alignment: "left",
                },
            ],
            [
                {
                    width: "*",
                    text: [
                        "Régimen Fiscal: ",
                        {
                            text: `${Receptor.RegimenFiscalReceptor} - ${(0, cfdi_catalogs_1.searchOption)(Receptor.RegimenFiscalReceptor, cfdi_catalogs_1.CatalogEnum.RegimenFiscal)?.description}`,
                            bold: true,
                        },
                    ],
                    style: "tableCell",
                    alignment: "left",
                },
            ],
            [
                {
                    width: "*",
                    text: [
                        "Domicilio fiscal: ",
                        {
                            text: `${Receptor.DomicilioFiscalReceptor}`,
                            bold: true,
                        },
                    ],
                    style: "tableCell",
                    alignment: "left",
                },
            ],
        ],
    };
};
exports.receptor = receptor;
const payment = (data) => {
    return {
        widths: ["*", "*"],
        body: [
            [
                {
                    text: "Información del pago",
                    alignment: "left",
                    style: "tableCell",
                    marginTop: 0.15,
                    colSpan: 2,
                    bold: true,
                },
                {},
            ],
            [
                {
                    text: [
                        "Uso del CFDI",
                        "\n",
                        {
                            text: `${data.Receptor.UsoCFDI} - ${(0, cfdi_catalogs_1.searchOption)(data.Receptor.UsoCFDI, cfdi_catalogs_1.CatalogEnum.UsoCFDI)
                                ?.description}`,
                            bold: true,
                        },
                    ],
                    style: "tableCell",
                    alignment: "left",
                },
                {
                    text: [
                        { text: "Exportación", style: "tableCell" },
                        "\n",
                        {
                            text: `${data.Exportacion} - ${(0, cfdi_catalogs_1.searchOption)(data.Exportacion, cfdi_catalogs_1.CatalogEnum.Exportacion)
                                ?.description}`, bold: true
                        },
                    ],
                    style: "tableCell",
                    alignment: "left",
                },
            ],
            [
                data.MetodoPago ? {
                    width: "*",
                    text: [
                        "Método de pago",
                        "\n",
                        {
                            text: `${data.MetodoPago} - ${(0, cfdi_catalogs_1.searchOption)(data.MetodoPago || "", cfdi_catalogs_1.CatalogEnum.MetodoPago)?.description}`,
                            bold: true,
                        },
                    ],
                    style: "tableCell",
                    alignment: "left",
                } : {},
                data.FormaPago ? {
                    width: "*",
                    text: [
                        "Forma de pago",
                        "\n",
                        {
                            text: `${data.FormaPago} - ${(0, cfdi_catalogs_1.searchOption)(data.FormaPago || "", cfdi_catalogs_1.CatalogEnum.FormaPago)
                                ?.description}`,
                            bold: true,
                        },
                    ],
                    style: "tableCell",
                    alignment: "left",
                } : {},
            ],
            data.CondicionesDePago && data.CondicionesDePago != "" ? [
                {
                    width: "*",
                    text: [
                        { text: "Condiciones de pago", style: "tableCell" },
                        "\n",
                        { text: `${data.CondicionesDePago}`, bold: true },
                    ],
                    style: "tableCell",
                    alignment: "left",
                },
                {}
            ] : [{}, {}],
        ],
    };
};
exports.payment = payment;
