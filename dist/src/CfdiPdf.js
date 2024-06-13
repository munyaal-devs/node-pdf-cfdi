"use strict";
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
const pdfmakeData_1 = require("./pdfmakeData");
const contents_1 = require("./pdfmakeData/contents");
pdfmake_1.default.vfs = fontBase64_1.fontBase64;
pdfmake_1.default.fonts = fontConfig_1.fonts;
class CfdiPdf {
    _definition;
    data;
    url = "https://verificacfdi.facturaelectronica.sat.gob.mx/default.aspx";
    cadenaOriginal = "";
    logo = undefined;
    constructor(xml, cadenaOriginal, pathLogo) {
        this.cadenaOriginal = cadenaOriginal;
        this.data = (0, helpers_1.getData)(xml);
        this.url += (0, helpers_1.getUrlQr)(this.data);
        if (pathLogo != undefined && pathLogo != "") {
            this.logo = (0, pdfmakeData_1.getLogo)(pathLogo);
        }
        this.buildDefinition();
    }
    buildDefinition() {
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
                                Serie: this.data?.Serie || '',
                                Fecha: this.data?.Fecha,
                                Folio: this.data?.Folio || '',
                                LugarExpedicion: this.data.LugarExpedicion,
                                VersionPago: this.data.Complemento.Pagos?.Version
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
                            table: (0, pdfmakeData_1.receptor)(this.data.Receptor),
                        },
                        {
                            width: "50%",
                            layout: pdfmake_config_1.pdfmakeTableLayout,
                            table: (0, pdfmakeData_1.payment)(this.data),
                        },
                    ],
                },
                "\n",
                (0, contents_1.contents)(this.data),
                (0, pdfmakeData_1.summary)(this.data),
                "\n",
                {
                    columns: !this.data.CfdiRelacionados.length ? [] : [
                        {
                            width: "100%",
                            layout: pdfmake_config_1.pdfmakeTableLayout,
                            table: (0, pdfmakeData_1.relationships)(this.data.CfdiRelacionados),
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
                                            text: `${this.data.Complemento?.TimbreFiscalDigital?.UUID}`,
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
                                            text: `${this.data.Complemento?.TimbreFiscalDigital?.RfcProvCertif}`,
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
                                            text: `${this.data.Complemento.TimbreFiscalDigital?.NoCertificadoSAT}`,
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
                                            text: `${this.data.Complemento.TimbreFiscalDigital?.SelloSAT}`,
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
                                            text: `${this.data.Complemento.TimbreFiscalDigital?.FechaTimbrado}`,
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
                                            text: `${this.data.Complemento.TimbreFiscalDigital?.SelloCFD}`,
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
                return [{ columns: (0, pdfmakeData_1.footerPage)(currentPage, pageCount) }];
            },
            styles: pdfmake_config_1.pdfmakeStyles,
            defaultStyle: pdfmake_config_1.pdfmakeDefaultStyle,
        };
    }
    async createDocument(name, folderPath) {
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
    }
}
exports.CfdiPdf = CfdiPdf;
