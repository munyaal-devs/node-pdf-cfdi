"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concepts = exports.concept = void 0;
const cfdi_catalogs_1 = require("@munyaal/cfdi-catalogs");
const helpers_1 = require("../../helpers");
const concept = (value, withImpuestos) => {
    const table = [
        [
            {
                text: `${value.Descripcion}`,
            },
        ],
        [
            {
                text: `Código SAT: ${value.ClaveProdServ} Unidad SAT: ${value.ClaveUnidad} Objeto Impuesto: ${value.ObjetoImp} - ${(0, cfdi_catalogs_1.searchOption)(value.ObjetoImp, cfdi_catalogs_1.CatalogEnum.ObjetoImp)?.description}`,
                fontSize: 6,
                lineHeight: 1,
            },
        ],
    ];
    if (withImpuestos) {
        table.push([
            {
                text: `Impuesto: ${(0, cfdi_catalogs_1.searchOption)(value.Impuestos?.Traslados[0].Impuesto || "", cfdi_catalogs_1.CatalogEnum.Impuesto)?.description} Tipo factor: ${value.Impuestos?.Traslados[0].TipoFactor || ""} Tasa o cuota: ${parseFloat(value.Impuestos?.Traslados[0].TasaOCuota || "").toFixed(2)} Base: ${(0, helpers_1.currency)(parseFloat(`${value.Impuestos?.Traslados[0].Base || ""}`))} Importe: ${(0, helpers_1.currency)(parseFloat(`${value?.Impuestos?.Traslados[0].Importe || ""}`))}`,
                fontSize: 6,
                lineHeight: 1,
            },
        ]);
    }
    if (value.ComplementoConcepto) {
        if (value?.ComplementoConcepto?.iedu) {
            table.push([
                {
                    text: `Alumno: ${value.ComplementoConcepto.iedu.nombreAlumno} CURP: ${value.ComplementoConcepto.iedu.CURP} Nivel educativo: ${value.ComplementoConcepto.iedu.nivelEducativo} Clave: ${value.ComplementoConcepto.iedu.autRVOE} RFC: ${value.ComplementoConcepto.iedu.rfcPago}`,
                    fontSize: 6,
                    lineHeight: 1,
                },
            ]);
        }
    }
    return {
        widths: ["*"],
        body: table,
    };
};
exports.concept = concept;
const concepts = (Conceptos, withImpuestos) => {
    const concepts = Conceptos.map((value) => [
        {
            layout: "noBorders",
            table: (0, exports.concept)(value, withImpuestos),
        },
        {
            text: (0, helpers_1.currency)(parseFloat(`${value.ValorUnitario}`)),
            alignment: "right",
        },
        {
            text: value.Cantidad,
            alignment: "right",
        },
        {
            text: (0, helpers_1.currency)(parseFloat(`${value.Importe}`)),
            alignment: "right",
        },
        {
            text: (0, helpers_1.currency)(isNaN(parseFloat(`${value.Descuento}`))
                ? 0
                : parseFloat(`${value.Descuento}`)),
            alignment: "right",
        },
    ]);
    return {
        widths: ["*", 45, 45, 45, 45],
        body: [
            [
                {
                    text: "Descripción",
                    alignment: "left",
                    style: "tableCell",
                    marginTop: 6,
                    bold: true,
                },
                {
                    text: "Valor unitario",
                    alignment: "right",
                    style: "tableCell",
                    marginTop: 0.15,
                    bold: true,
                },
                {
                    text: "Cantidad",
                    alignment: "right",
                    style: "tableCell",
                    marginTop: 6,
                    bold: true,
                },
                {
                    text: "Importe",
                    alignment: "right",
                    style: "tableCell",
                    marginTop: 6,
                    bold: true,
                },
                {
                    text: "Descuento",
                    alignment: "right",
                    style: "tableCell",
                    marginTop: 6,
                    bold: true,
                },
            ],
            ...concepts,
        ],
    };
};
exports.concepts = concepts;
