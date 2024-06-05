"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CfdiPdf = void 0;
const pdfmake_1 = __importDefault(require("pdfmake/build/pdfmake"));
const fontBase64_1 = require("./fonts/OpenSans/fontBase64");
const fontConfig_1 = require("./fonts/OpenSans/fontConfig");
const fs_1 = require("fs");
const pdfmake_config_1 = require("./pdfmake.config");
const helpers_1 = require("./helpers");
const cfdi_catalogs_1 = require("@munyaal/cfdi-catalogs");
const src_1 = require("@munyaal/cfdi-catalogs/dist/src");
const pdfmakeData_1 = require("./pdfmakeData");
pdfmake_1.default.vfs = fontBase64_1.fontBase64;
pdfmake_1.default.fonts = fontConfig_1.fonts;
class CfdiPdf {
    constructor(xml, cadenaOriginal, pathLogo) {
        this.url = "https://verificacfdi.facturaelectronica.sat.gob.mx/default.aspx";
        this.cadenaOriginal = "";
        this.logo = undefined;
        this.cadenaOriginal = cadenaOriginal;
        this.data = (0, helpers_1.getData)(xml);
        this.url += (0, helpers_1.getUrlQr)(this.data);
        if (pathLogo != undefined && pathLogo != "") {
            this.logo = (0, pdfmakeData_1.getLogo)(pathLogo);
        }
        this.buildDefinition();
    }
    receptor() {
        var _a;
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
                        text: `${this.data.Receptor.Nombre}`,
                        bold: true,
                        style: "tableCell",
                        alignment: "left",
                    },
                ],
                [
                    {
                        width: "*",
                        text: ["RFC: ", { text: `${this.data.Receptor.Rfc}`, bold: true }],
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
                                text: `${this.data.Receptor.RegimenFiscalReceptor} - ${(_a = (0, cfdi_catalogs_1.searchOption)(this.data.Receptor.RegimenFiscalReceptor, src_1.CatalogEnum.RegimenFiscal)) === null || _a === void 0 ? void 0 : _a.description}`,
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
                                text: `${this.data.Receptor.DomicilioFiscalReceptor}`,
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
    payment() {
        var _a, _b, _c, _d;
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
                                text: `${this.data.Receptor.UsoCFDI} - ${(_a = (0, cfdi_catalogs_1.searchOption)(this.data.Receptor.UsoCFDI, src_1.CatalogEnum.UsoCFDI)) === null || _a === void 0 ? void 0 : _a.description}`,
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
                            { text: `${this.data.Exportacion} - ${(_b = (0, cfdi_catalogs_1.searchOption)(this.data.Exportacion, src_1.CatalogEnum.Exportacion)) === null || _b === void 0 ? void 0 : _b.description}`, bold: true },
                        ],
                        style: "tableCell",
                        alignment: "left",
                    },
                ],
                [
                    this.data.MetodoPago ? {
                        width: "*",
                        text: [
                            "Método de pago",
                            "\n",
                            {
                                text: `${this.data.MetodoPago} - ${(_c = (0, cfdi_catalogs_1.searchOption)(this.data.MetodoPago || "", src_1.CatalogEnum.MetodoPago)) === null || _c === void 0 ? void 0 : _c.description}`,
                                bold: true,
                            },
                        ],
                        style: "tableCell",
                        alignment: "left",
                    } : {},
                    this.data.FormaPago ? {
                        width: "*",
                        text: [
                            "Forma de pago",
                            "\n",
                            {
                                text: `${this.data.FormaPago} - ${(_d = (0, cfdi_catalogs_1.searchOption)(this.data.FormaPago || "", src_1.CatalogEnum.FormaPago)) === null || _d === void 0 ? void 0 : _d.description}`,
                                bold: true,
                            },
                        ],
                        style: "tableCell",
                        alignment: "left",
                    } : {},
                ],
                this.data.CondicionesDePago && this.data.CondicionesDePago != "" ? [
                    {
                        width: "*",
                        text: [
                            { text: "Condiciones de pago", style: "tableCell" },
                            "\n",
                            { text: `${this.data.CondicionesDePago}`, bold: true },
                        ],
                        style: "tableCell",
                        alignment: "left",
                    },
                    {}
                ] : [{}, {}],
            ],
        };
    }
    concept(value) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const table = [
            [
                {
                    text: `${value.Descripcion}`,
                },
            ],
            [
                {
                    text: `Código SAT: ${value.ClaveProdServ} Unidad SAT: ${value.ClaveUnidad} Objeto Impuesto: ${value.ObjetoImp} - ${(_a = (0, cfdi_catalogs_1.searchOption)(value.ObjetoImp, src_1.CatalogEnum.ObjetoImp)) === null || _a === void 0 ? void 0 : _a.description}`,
                    fontSize: 6,
                    lineHeight: 1,
                },
            ],
        ];
        if (parseFloat(((_b = this.data.Impuestos) === null || _b === void 0 ? void 0 : _b.TotalImpuestosTrasladados) || "0") != 0) {
            table.push([
                {
                    text: `Impuesto: ${(_d = (0, cfdi_catalogs_1.searchOption)(((_c = value.Impuestos) === null || _c === void 0 ? void 0 : _c.Traslados[0].Impuesto) || "", src_1.CatalogEnum.Impuesto)) === null || _d === void 0 ? void 0 : _d.description} Tipo factor: ${((_e = value.Impuestos) === null || _e === void 0 ? void 0 : _e.Traslados[0].TipoFactor) || ""} Tasa o cuota: ${parseFloat(((_f = value.Impuestos) === null || _f === void 0 ? void 0 : _f.Traslados[0].TasaOCuota) || "").toFixed(2)} Base: ${(0, helpers_1.currency)(parseFloat(`${((_g = value.Impuestos) === null || _g === void 0 ? void 0 : _g.Traslados[0].Base) || ""}`))} Importe: ${(0, helpers_1.currency)(parseFloat(`${((_h = value === null || value === void 0 ? void 0 : value.Impuestos) === null || _h === void 0 ? void 0 : _h.Traslados[0].Importe) || ""}`))}`,
                    fontSize: 6,
                    lineHeight: 1,
                },
            ]);
        }
        if (value.ComplementoConcepto) {
            if (Object.entries(value.ComplementoConcepto.iedu).length != 0) {
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
    }
    concepts() {
        const concepts = this.data.Conceptos.map((value) => [
            {
                layout: "noBorders",
                table: this.concept(value),
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
    }
    relationship(value) {
        var _a;
        const table = [
            [
                {
                    text: `${value.TipoRelacion} - ${(_a = (0, cfdi_catalogs_1.searchOption)(value.TipoRelacion, src_1.CatalogEnum.TipoRelacion)) === null || _a === void 0 ? void 0 : _a.description}`,
                    bold: true,
                    style: "tableCell",
                    alignment: "left",
                },
            ],
        ];
        for (let index = 0; index < value.CfdiRelacionado.length; index++) {
            table.push([
                {
                    text: ["UUID: ", { text: `${value.CfdiRelacionado[index]}` }],
                    style: "tableCell",
                    alignment: "left",
                },
            ]);
        }
        return {
            widths: ["*"],
            body: table,
        };
    }
    relationships() {
        const concepts = this.data.CfdiRelacionados.map((value) => [
            {
                layout: "noBorders",
                table: this.relationship(value),
            },
        ]);
        return {
            widths: ["*"],
            body: [
                [
                    {
                        text: " Comprobantes fiscales digitales por internet relacionados",
                        alignment: "left",
                        style: "tableCell",
                        marginTop: 0.15,
                        bold: true,
                    },
                ],
                ...concepts,
            ],
        };
    }
    summary() {
        var _a, _b;
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
                                        text: (0, helpers_1.currency)(parseFloat(`${this.data.SubTotal}`)),
                                        alignment: "right",
                                        bold: true,
                                    },
                                ],
                                [
                                    {
                                        text: (0, helpers_1.currency)(isNaN(parseFloat(`${this.data.Descuento}`))
                                            ? 0
                                            : parseFloat(`${this.data.Descuento}`)),
                                        alignment: "right",
                                        bold: true,
                                    },
                                ],
                                [
                                    {
                                        text: (0, helpers_1.currency)(isNaN(parseFloat(`${(_a = this.data.Impuestos) === null || _a === void 0 ? void 0 : _a.TotalImpuestosTrasladados}`))
                                            ? 0
                                            : parseFloat(`${(_b = this.data.Impuestos) === null || _b === void 0 ? void 0 : _b.TotalImpuestosTrasladados}`)),
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
                                        text: (0, helpers_1.currency)(parseFloat(`${this.data.Total}`)),
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
                                        text: `${(0, helpers_1.getTotalText)(this.data.Total)} ${this.data.Moneda}`,
                                    },
                                ],
                            },
                        ],
                    ],
                },
            },
        ];
    }
    footer(currentPage, pageCount) {
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
    }
    buildDefinition() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        this._definition = {
            pageSize: "LETTER",
            pageOrientation: "portrait",
            pageMargins: [25, 25],
            content: [
                {
                    columns: [
                        this.logo != undefined
                            ? { image: this.logo, fit: [80, 80], alignment: "left" }
                            : [],
                        {
                            width: this.logo != undefined ? "45%" : "60%",
                            text: (0, pdfmakeData_1.emisor)(this.data.Emisor, this.data.NoCertificado || ''),
                        },
                        {
                            width: "40%",
                            layout: pdfmake_config_1.pdfmakeTableLayout,
                            table: (0, pdfmakeData_1.folio)({
                                TipoDeComprobante: this.data.TipoDeComprobante,
                                Serie: ((_a = this.data) === null || _a === void 0 ? void 0 : _a.Serie) || '',
                                Fecha: (_b = this.data) === null || _b === void 0 ? void 0 : _b.Fecha,
                                Folio: ((_c = this.data) === null || _c === void 0 ? void 0 : _c.Folio) || '',
                                LugarExpedicion: this.data.LugarExpedicion,
                                VersionPago: (_d = this.data.Complemento.Pagos) === null || _d === void 0 ? void 0 : _d.Version
                            }),
                        },
                    ],
                },
                "\n",
                {
                    columns: [
                        {
                            width: "50%",
                            layout: pdfmake_config_1.pdfmakeTableLayout,
                            table: this.receptor(),
                        },
                        {
                            width: "50%",
                            layout: pdfmake_config_1.pdfmakeTableLayout,
                            table: this.payment(),
                        },
                    ],
                },
                "\n",
                {
                    layout: pdfmake_config_1.pdfmakeTableConceptLayout,
                    table: this.concepts(),
                },
                this.summary(),
                "\n",
                {
                    columns: !this.data.CfdiRelacionados.length ? [] : [
                        {
                            width: "100%",
                            layout: pdfmake_config_1.pdfmakeTableLayout,
                            table: this.relationships(),
                        },
                    ],
                },
                "\n",
                "\n",
                {
                    columns: [
                        { qr: `${this.url}`, fit: 130 },
                        {
                            width: "40%",
                            layout: pdfmake_config_1.pdfmakeTableZebraLayout,
                            table: {
                                headerRows: 1,
                                widths: ["100%"],
                                body: [
                                    [
                                        {
                                            text: "Folio fiscal",
                                            fontSize: 4,
                                            lineHeight: 1.15,
                                        },
                                    ],
                                    [
                                        {
                                            text: `${(_f = (_e = this.data.Complemento) === null || _e === void 0 ? void 0 : _e.TimbreFiscalDigital) === null || _f === void 0 ? void 0 : _f.UUID}`,
                                            fontSize: 4,
                                            lineHeight: 1.15,
                                        },
                                    ],
                                    [
                                        {
                                            text: "RFC proveedor de certificación",
                                            fontSize: 4,
                                            lineHeight: 1.15,
                                        },
                                    ],
                                    [
                                        {
                                            text: `${(_h = (_g = this.data.Complemento) === null || _g === void 0 ? void 0 : _g.TimbreFiscalDigital) === null || _h === void 0 ? void 0 : _h.RfcProvCertif}`,
                                            fontSize: 4,
                                            lineHeight: 1.15,
                                        },
                                    ],
                                    [
                                        {
                                            text: "Cadena original del timbre",
                                            fontSize: 4,
                                            lineHeight: 1.15,
                                        },
                                    ],
                                    [
                                        {
                                            text: `${this.cadenaOriginal}`,
                                            fontSize: 4,
                                            lineHeight: 1.15,
                                        },
                                    ],
                                ],
                            },
                        },
                        {
                            width: "20%",
                            layout: pdfmake_config_1.pdfmakeTableZebraLayout,
                            table: {
                                headerRows: 1,
                                widths: ["100%"],
                                body: [
                                    [
                                        {
                                            text: "Número de certificado SAT",
                                            fontSize: 4,
                                            lineHeight: 1.15,
                                        },
                                    ],
                                    [
                                        {
                                            text: `${(_j = this.data.Complemento.TimbreFiscalDigital) === null || _j === void 0 ? void 0 : _j.NoCertificadoSAT}`,
                                            fontSize: 4,
                                            lineHeight: 1.15,
                                        },
                                    ],
                                    [
                                        {
                                            text: "Sello digital del SAT",
                                            fontSize: 4,
                                            lineHeight: 1.15,
                                        },
                                    ],
                                    [
                                        {
                                            text: `${(_k = this.data.Complemento.TimbreFiscalDigital) === null || _k === void 0 ? void 0 : _k.SelloSAT}`,
                                            fontSize: 4,
                                            lineHeight: 1.15,
                                        },
                                    ],
                                ],
                            },
                        },
                        {
                            width: "20%",
                            layout: pdfmake_config_1.pdfmakeTableZebraLayout,
                            table: {
                                headerRows: 1,
                                widths: ["100%"],
                                body: [
                                    [
                                        {
                                            text: "Fecha y hora de certificación",
                                            fontSize: 4,
                                            lineHeight: 1.15,
                                        },
                                    ],
                                    [
                                        {
                                            text: `${(_l = this.data.Complemento.TimbreFiscalDigital) === null || _l === void 0 ? void 0 : _l.FechaTimbrado}`,
                                            fontSize: 4,
                                            lineHeight: 1.15,
                                        },
                                    ],
                                    [
                                        {
                                            text: "Sello digital del CFDI",
                                            fontSize: 4,
                                            lineHeight: 1.15,
                                        },
                                    ],
                                    [
                                        {
                                            text: `${(_m = this.data.Complemento.TimbreFiscalDigital) === null || _m === void 0 ? void 0 : _m.SelloCFD}`,
                                            fontSize: 4,
                                            lineHeight: 1.15,
                                        },
                                    ],
                                ],
                            },
                        },
                    ],
                },
            ],
            footer: (currentPage, pageCount) => {
                return [{ columns: this.footer(currentPage, pageCount) }];
            },
            styles: pdfmake_config_1.pdfmakeStyles,
            defaultStyle: pdfmake_config_1.pdfmakeDefaultStyle,
        };
    }
    createDocument(name, folderPath) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const doc = pdfmake_1.default.createPdf(this._definition, {}, fontConfig_1.fonts, fontBase64_1.fontBase64);
                doc.getBase64((base) => {
                    (0, fs_1.writeFile)(`${folderPath}/${name}.pdf`, base, "base64", (error) => {
                        if (error) {
                            console.error(error);
                            reject(error);
                        }
                        else {
                            resolve(`${folderPath}/${name}.pdf`);
                        }
                    });
                });
            });
        });
    }
}
exports.CfdiPdf = CfdiPdf;
//# sourceMappingURL=CfdiPdf.js.map