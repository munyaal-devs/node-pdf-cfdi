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
const xml_js_1 = require("xml-js");
const cfdi_catalogs_1 = require("@munyaal/cfdi-catalogs");
const src_1 = require("@munyaal/cfdi-catalogs/dist/src");
pdfmake_1.default.vfs = fontBase64_1.fontBase64;
class CfdiPdf {
    _definition;
    data;
    constructor(xml
    // pedir cadena original del timbre
    ) {
        this.getData(xml);
        this.buildDefinition();
    }
    getData(xml) {
        const convert = (0, xml_js_1.xml2js)(xml);
        convert.elements;
        if (convert.elements && convert.elements?.length > 0) {
            this.data = { ...convert.elements[0].attributes };
            if (convert.elements[0].elements) {
                for (let index = 0; index < convert.elements[0].elements.length; index++) {
                    switch (convert.elements[0].elements[index].name) {
                        case "cfdi:Emisor":
                            this.data.Emisor = { ...convert.elements[0].elements[index].attributes };
                            break;
                        case "cfdi:Receptor":
                            this.data.Receptor = { ...convert.elements[0].elements[index].attributes };
                            break;
                        case "cfdi:Conceptos":
                            this.data = Object.assign(this.data, {
                                Conceptos: [],
                            });
                            this.getDataConcept(convert.elements[0].elements[index].elements || []);
                            break;
                        case "cfdi:Impuestos":
                            this.data.Impuestos = { ...convert.elements[0].elements[index].attributes };
                            break;
                        case "cfdi:Complemento":
                            this.getDataComplement(convert.elements[0].elements[index].elements || []);
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    }
    getDataComplement(complement) {
        for (let index = 0; index < complement.length; index++) {
            switch (complement[index].name) {
                case "tfd:TimbreFiscalDigital":
                    this.data = Object.assign(this.data, {
                        Complemento: {
                            TimbreFiscalDigital: { ...complement[index].attributes }
                        },
                    });
                    break;
                default:
                    break;
            }
        }
    }
    getDataConcept(ctp) {
        for (let i = 0; i < ctp.length; i++) {
            if (ctp[i].name = "cfdi:Concepto") {
                let objctp = { ...ctp[i].attributes };
                const elementCtpI = ctp[i].elements || [];
                if (elementCtpI.length > 0) {
                    for (let j = 0; j < elementCtpI.length; j++) {
                        switch (elementCtpI[j].name) {
                            case "cfdi:ComplementoConcepto":
                                const elementCtpJ = elementCtpI[j].elements || [];
                                if (elementCtpJ.length > 0)
                                    for (let k = 0; k < elementCtpJ.length; k++) {
                                        switch (elementCtpJ[k].name) {
                                            case "iedu:instEducativas":
                                                objctp = Object.assign(objctp, {
                                                    ComplementoConcepto: {
                                                        iedu: { ...elementCtpJ[k].attributes }
                                                    }
                                                });
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                break;
                            default:
                                break;
                        }
                    }
                }
                this.data.Conceptos.push(objctp);
            }
        }
    }
    emisor() {
        return [
            { text: `${this.data.Emisor.Nombre}`, bold: true, fontSize: 10 },
            '\n',
            'RFC: ',
            { text: `${this.data.Emisor.Rfc}`, bold: true },
            '\n\n',
            { text: 'Régimen fiscal: ' },
            {
                text: `${this.data.Emisor.RegimenFiscal} - ${(0, cfdi_catalogs_1.searchOption)(this.data.Emisor.RegimenFiscal, src_1.CatalogEnum.RegimenFiscal)?.description}`,
                bold: true,
            },
            '\n',
            { text: 'Número de certificado: ' },
            {
                text: `${this.data.NoCertificado}`,
                bold: true,
            },
        ];
    }
    folio() {
        return {
            widths: ['*', '*'],
            body: [
                [{
                        text: 'CFDI de Ingreso',
                        alignment: 'center',
                        style: 'tableCell',
                        marginTop: 0.15,
                        colSpan: 2,
                        bold: true
                    }, {}],
                [
                    {
                        text: [
                            'Serie',
                            '\n',
                            { text: `${this.data.Serie}`, bold: true, }
                        ],
                        style: 'tableCell',
                        alignment: 'left',
                    },
                    {
                        text: [
                            { text: 'Folio', style: 'tableCell' },
                            '\n',
                            { text: `${this.data.Folio}`, bold: true }
                        ],
                        style: 'tableCell',
                        alignment: 'left',
                    }
                ],
                [
                    {
                        width: '*',
                        text: [
                            'Lugar de emisión',
                            '\n',
                            { text: `${this.data.LugarExpedicion}`, bold: true }
                        ],
                        style: 'tableCell',
                        alignment: 'left',
                    },
                    {
                        width: '*',
                        text: [
                            'Fecha y hora de emisión',
                            '\n',
                            { text: `${this.data.Fecha}`, bold: true }
                        ],
                        style: 'tableCell',
                        alignment: 'left',
                    }
                ],
            ]
        };
    }
    receptor() {
        return {
            widths: ['*'],
            body: [
                [{
                        text: 'Información del cliente',
                        alignment: 'left',
                        style: 'tableCell',
                        marginTop: 0.15,
                        bold: true
                    }],
                [
                    {
                        text: `${this.data.Receptor.Nombre}`,
                        bold: true,
                        style: 'tableCell',
                        alignment: 'left',
                    }
                ],
                [
                    {
                        width: '*',
                        text: [
                            'RFC: ',
                            { text: `${this.data.Receptor.Rfc}`, bold: true }
                        ],
                        style: 'tableCell',
                        alignment: 'left',
                    }
                ],
                [
                    {
                        width: '*',
                        text: [
                            'Régimen Fiscal: ',
                            { text: `${this.data.Receptor.RegimenFiscalReceptor} - ${(0, cfdi_catalogs_1.searchOption)(this.data.Receptor.RegimenFiscalReceptor, src_1.CatalogEnum.RegimenFiscal)?.description}`, bold: true }
                        ],
                        style: 'tableCell',
                        alignment: 'left',
                    }
                ],
                [
                    {
                        width: '*',
                        text: [
                            'Domicilio fiscal: ',
                            { text: `${this.data.Receptor.DomicilioFiscalReceptor}`, bold: true }
                        ],
                        style: 'tableCell',
                        alignment: 'left',
                    }
                ]
            ]
        };
    }
    payment() {
        return {
            widths: ['*', '*'],
            body: [
                [{
                        text: 'Información del pago',
                        alignment: 'left',
                        style: 'tableCell',
                        marginTop: 0.15,
                        colSpan: 2,
                        bold: true
                    }, {}],
                [
                    {
                        text: [
                            'Uso del CFDI',
                            '\n',
                            { text: `${this.data.Receptor.UsoCFDI} - ${(0, cfdi_catalogs_1.searchOption)(this.data.Receptor.UsoCFDI, src_1.CatalogEnum.UsoCFDI)?.description}`, bold: true, }
                        ],
                        style: 'tableCell',
                        alignment: 'left',
                    },
                    {
                        text: [
                            { text: 'Exportación', style: 'tableCell' },
                            '\n',
                            { text: `${this.data.Exportacion}`, bold: true }
                        ],
                        style: 'tableCell',
                        alignment: 'left',
                    }
                ],
                [
                    {
                        width: '*',
                        text: [
                            'Método de pago',
                            '\n',
                            { text: `${this.data.MetodoPago} - ${(0, cfdi_catalogs_1.searchOption)(this.data.MetodoPago || "", src_1.CatalogEnum.MetodoPago)?.description}`, bold: true }
                        ],
                        style: 'tableCell',
                        alignment: 'left',
                    },
                    {
                        width: '*',
                        text: [
                            'Forma de pago',
                            '\n',
                            { text: `${this.data.FormaPago} - ${(0, cfdi_catalogs_1.searchOption)(this.data.FormaPago || "", src_1.CatalogEnum.FormaPago)?.description}`, bold: true }
                        ],
                        style: 'tableCell',
                        alignment: 'left',
                    }
                ],
            ]
        };
    }
    concept(value) {
        const table = [
            [{
                    text: `${value.Descripcion}`,
                }],
            [{
                    text: `Código SAT: ${value.ClaveProdServ} Unidad SAT: ${value.ClaveUnidad} Objeto Impuesto: ${value.ObjetoImp} - ${(0, cfdi_catalogs_1.searchOption)(value.ObjetoImp, src_1.CatalogEnum.ObjetoImp)?.description}`,
                    fontSize: 6,
                    lineHeight: 1
                }],
            [{
                    text: `Impuesto: IVA Tipo factor: Tasa Tasa o cuota: 0.16 Base: $ 107.76 Importe: $ 17.24`,
                    fontSize: 6,
                    lineHeight: 1
                }]
        ];
        if (value.ComplementoConcepto) {
            if (value.ComplementoConcepto.iedu) {
                table.push([
                    {
                        text: `Alumno: ${value.ComplementoConcepto.iedu.nombreAlumno} | CURP: ${value.ComplementoConcepto.iedu.CURP} | Nivel educativo: ${value.ComplementoConcepto.iedu.nivelEducativo} | Clave: ${value.ComplementoConcepto.iedu.autRVOE} | RFC: ${value.ComplementoConcepto.iedu.rfcPago}`,
                        fontSize: 6,
                        lineHeight: 1
                    }
                ]);
            }
        }
        return {
            widths: ['*'],
            body: table
        };
    }
    concepts() {
        const concepts = this.data.Conceptos.map(value => ([
            {
                layout: 'noBorders',
                table: this.concept(value)
            },
            {
                text: (0, helpers_1.currency)(parseFloat(`${value.ValorUnitario}`)),
                alignment: 'right',
            },
            {
                text: value.Cantidad,
                alignment: 'right',
            },
            {
                text: (0, helpers_1.currency)(parseFloat(`${value.Importe}`)),
                alignment: 'right',
            },
            {
                text: (0, helpers_1.currency)(parseFloat(`${value.Descuento}`)),
                alignment: 'right',
            }
        ]));
        return {
            widths: ['*', 45, 45, 45, 45],
            body: [
                [
                    {
                        text: 'Descripción',
                        alignment: 'left',
                        style: 'tableCell',
                        marginTop: 6,
                        bold: true
                    },
                    {
                        text: 'Valor unitario',
                        alignment: 'right',
                        style: 'tableCell',
                        marginTop: 0.15,
                        bold: true
                    },
                    {
                        text: 'Cantidad',
                        alignment: 'right',
                        style: 'tableCell',
                        marginTop: 6,
                        bold: true
                    },
                    {
                        text: 'Importe',
                        alignment: 'right',
                        style: 'tableCell',
                        marginTop: 6,
                        bold: true
                    },
                    {
                        text: 'Descuento',
                        alignment: 'right',
                        style: 'tableCell',
                        marginTop: 6,
                        bold: true
                    },
                ],
                ...concepts
            ]
        };
    }
    summary() {
        return [
            {
                columns: [
                    {
                        width: '*',
                        layout: 'noBorders',
                        table: {
                            widths: ['*'],
                            body: [
                                [{ text: 'Subtotal', alignment: 'right' }],
                                [{ text: 'Descuento', alignment: 'right' }],
                                [{ text: 'IVA Trasladado (16%)', alignment: 'right' }],
                            ]
                        }
                    },
                    {
                        width: 50,
                        layout: 'noBorders',
                        table: {
                            widths: ['*'],
                            body: [
                                [{ text: (0, helpers_1.currency)(parseFloat(`${this.data.SubTotal}`)), alignment: 'right', bold: true }],
                                [{ text: (0, helpers_1.currency)(parseFloat(`${this.data.Descuento}`)), alignment: 'right', bold: true }],
                                [{ text: (0, helpers_1.currency)(parseFloat(`${this.data.Impuestos?.TotalImpuestosTrasladados}`)), alignment: 'right', bold: true }],
                            ]
                        }
                    },
                ]
            },
            {
                layout: pdfmake_config_1.pdfmakeTableLayout,
                table: {
                    widths: ['*'],
                    body: [
                        [
                            {
                                fontSize: 10,
                                text: [
                                    { text: 'Total ' },
                                    { text: (0, helpers_1.currency)(parseFloat(`${this.data.Total}`)), bold: true }
                                ],
                                alignment: 'right'
                            },
                        ]
                    ]
                }
            }
        ];
    }
    footer(currentPage, pageCount) {
        return [
            {
                width: 80,
                alignment: 'left',
                marginLeft: 25,
                fontSize: 6,
                text: `Munyaal Apps`,
            },
            {
                width: '*',
                alignment: 'center',
                fontSize: 6,
                text: `Este documento es una representación impresa de un CFDI versión 4.0`,
            },
            {
                width: 80,
                alignment: 'right',
                marginRight: 25,
                fontSize: 6,
                text: `Página ${currentPage} de ${pageCount}`,
            }
        ];
    }
    buildDefinition() {
        this._definition = {
            pageSize: 'LETTER',
            pageOrientation: 'portrait',
            pageMargins: [25, 25],
            content: [
                {
                    columns: [
                        {
                            width: '60%',
                            text: this.emisor(),
                        },
                        {
                            width: '40%',
                            layout: pdfmake_config_1.pdfmakeTableLayout,
                            table: this.folio()
                        }
                    ]
                },
                '\n',
                {
                    columns: [
                        {
                            width: '50%',
                            layout: pdfmake_config_1.pdfmakeTableLayout,
                            table: this.receptor()
                        },
                        {
                            width: '50%',
                            layout: pdfmake_config_1.pdfmakeTableLayout,
                            table: this.payment()
                        }
                    ]
                },
                '\n',
                {
                    layout: pdfmake_config_1.pdfmakeTableConceptLayout,
                    table: this.concepts()
                },
                this.summary(),
                '\n',
                '\n',
                {
                    columns: [
                        {
                            width: '20%',
                            text: ''
                        },
                        {
                            width: '40%',
                            layout: pdfmake_config_1.pdfmakeTableZebraLayout,
                            table: {
                                headerRows: 1,
                                widths: ['100%'],
                                body: [
                                    [{
                                            text: 'Folio fiscal',
                                            fontSize: 4,
                                            lineHeight: 1.15
                                        }],
                                    [{
                                            text: `${this.data.Complemento.TimbreFiscalDigital.UUID}`,
                                            fontSize: 4,
                                            lineHeight: 1.15
                                        }],
                                    [{
                                            text: 'RFC proveedor de certificación',
                                            fontSize: 4,
                                            lineHeight: 1.15
                                        }],
                                    [{
                                            text: `${this.data.Complemento.TimbreFiscalDigital.RfcProvCertif}`,
                                            fontSize: 4,
                                            lineHeight: 1.15
                                        }],
                                    [{
                                            text: 'Cadena original del timbre',
                                            fontSize: 4,
                                            lineHeight: 1.15
                                        }],
                                    [{
                                            text: '||1.1|1cbec0ea-6a29-4628-a822-9a170e20cd4e|2022-07-21T12:50:50|SPR190613I52|VwGGm5IWxdBM1W68cnUdE2t7AF32+GbrgBAMOKLdroOTbMF08PLL8FG9FCL09mywdjjMHiXk6uAlyk/EtOgbYNDCHpcjRWDtgKSHBvMQ+4wcxu6rNi2RfATa1rbbPhNa0zeFhphTjaZi8bWbEOJene0yuXK87EQwGMZylTXfSe71dEoio9kbABM7PBPkznvmUn276YQ4yQEFo2bqpSn2KbzBkqFxQZuKHiSueG4ml3vNIe960WRTyR0BtuUyVassyioGmJqOa9EXB9Uyv/8MPsFPNOFiIYZ6x4D/uq0fdleTBZ331nvp0vdzSlgQKyZVGjxkrDVS3symnU+K9vfPDA==|30001000000400002495||',
                                            fontSize: 4,
                                            lineHeight: 1.15
                                        }]
                                ]
                            }
                        },
                        {
                            width: '20%',
                            layout: pdfmake_config_1.pdfmakeTableZebraLayout,
                            table: {
                                headerRows: 1,
                                widths: ['100%'],
                                body: [
                                    [{
                                            text: 'Número de certificado SAT',
                                            fontSize: 4,
                                            lineHeight: 1.15
                                        }],
                                    [{
                                            text: `${this.data.Complemento.TimbreFiscalDigital.NoCertificadoSAT}`,
                                            fontSize: 4,
                                            lineHeight: 1.15
                                        }],
                                    [{
                                            text: 'Sello digital del SAT',
                                            fontSize: 4,
                                            lineHeight: 1.15
                                        }],
                                    [{
                                            text: `${this.data.Complemento.TimbreFiscalDigital.SelloSAT}`,
                                            fontSize: 4,
                                            lineHeight: 1.15
                                        }]
                                ]
                            }
                        },
                        {
                            width: '20%',
                            layout: pdfmake_config_1.pdfmakeTableZebraLayout,
                            table: {
                                headerRows: 1,
                                widths: ['100%'],
                                body: [
                                    [{
                                            text: 'Fecha y hora de certificación',
                                            fontSize: 4,
                                            lineHeight: 1.15
                                        }],
                                    [{
                                            text: `${this.data.Complemento.TimbreFiscalDigital.FechaTimbrado}`,
                                            fontSize: 4,
                                            lineHeight: 1.15
                                        }],
                                    [{
                                            text: 'Sello digital del CFDI',
                                            fontSize: 4,
                                            lineHeight: 1.15
                                        }],
                                    [{
                                            text: `${this.data.Complemento.TimbreFiscalDigital.SelloCFD}`,
                                            fontSize: 4,
                                            lineHeight: 1.15
                                        }]
                                ]
                            }
                        },
                    ]
                },
            ],
            footer: (currentPage, pageCount) => {
                return [
                    { columns: this.footer(currentPage, pageCount) }
                ];
            },
            styles: pdfmake_config_1.pdfmakeStyles,
            defaultStyle: pdfmake_config_1.pdfmakeDefaultStyle
        };
    }
    createDocument() {
        const doc = pdfmake_1.default.createPdf(this._definition, {}, fontConfig_1.fonts);
        doc.getBase64(base => {
            (0, fs_1.writeFile)(`${process.cwd()}/src/pdfs/${new Date().getTime()}.pdf`, base, 'base64', error => {
                if (error) {
                    throw error;
                }
                else {
                    console.log('base64 saved!');
                }
            });
        });
    }
}
exports.CfdiPdf = CfdiPdf;
