import { Table } from "pdfmake/interfaces";
import { ComprobanteReceptorType, ComprobanteType } from "../types";
import { CatalogEnum, searchOption } from "@munyaal/cfdi-catalogs";

export const receptor = (Receptor: ComprobanteReceptorType): Table => {
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
                            text: `${Receptor.RegimenFiscalReceptor} - ${searchOption(
                                Receptor.RegimenFiscalReceptor,
                                CatalogEnum.RegimenFiscal
                            )?.description
                                }`,
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
}

export const payment = (data: ComprobanteType): Table => {
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
                            text: `${data.Receptor.UsoCFDI} - ${searchOption(data.Receptor.UsoCFDI, CatalogEnum.UsoCFDI)
                                    ?.description
                                }`,
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
                            text: `${data.Exportacion} - ${searchOption(data.Exportacion, CatalogEnum.Exportacion)
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
                            text: `${data.MetodoPago} - ${searchOption(
                                data.MetodoPago || "",
                                CatalogEnum.MetodoPago
                            )?.description
                                }`,
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
                            text: `${data.FormaPago} - ${searchOption(data.FormaPago || "", CatalogEnum.FormaPago)
                                    ?.description
                                }`,
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
}