import { Column, Content, Table, TableCell, TDocumentDefinitions } from "pdfmake/interfaces";
import PdfMake from "pdfmake/build/pdfmake";
import { fontBase64 } from "./fonts/OpenSans/fontBase64";
import { fonts } from "./fonts/OpenSans/fontConfig";
import { writeFile } from "fs";
import {
    pdfmakeDefaultStyle,
    pdfmakeStyles,
    pdfmakeTableConceptLayout,
    pdfmakeTableLayout,
    pdfmakeTableZebraLayout
} from "./pdfmake.config";
import { currency } from "./helpers";

PdfMake.vfs = fontBase64;

export class CfdiPdf {
    private _definition!: TDocumentDefinitions;

    constructor() {
        this.buildDefinition();
    }

    private emisor(): Content {
        return [
            {text: 'MARIA WATEMBER TORRES', bold: true, fontSize: 10},
            '\n',
            'RFC: ',
            {text: 'WATM640917J45', bold: true},
            '\n\n',
            {text: 'Régimen fiscal: '},
            {
                text: '612 - Personas Físicas con Actividades Empresariales y Profesionales',
                bold: true,
            },
            '\n',
            {text: 'Número de certificado: '},
            {
                text: '30001000000400002333',
                bold: true,
            },
        ]
    }

    private folio(): Table {
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
                            {text: 'A', bold: true,}
                        ],
                        style: 'tableCell',
                        alignment: 'left',
                    },
                    {
                        text: [
                            {text: 'Folio', style: 'tableCell'},
                            '\n',
                            {text: 'MYLF-190', bold: true}
                        ],
                        style: 'tableCell',
                        alignment: 'left',
                    }],
                [
                    {
                        width: '*',
                        text: [
                            'Lugar de emisión',
                            '\n',
                            {text: '77725', bold: true}
                        ],
                        style: 'tableCell',
                        alignment: 'left',
                    },
                    {
                        width: '*',
                        text: [
                            'Fecha y hora de emisión',
                            '\n',
                            {text: '21 Jul. 2022 - 12:50:28', bold: true}
                        ],
                        style: 'tableCell',
                        alignment: 'left',
                    }],
            ]
        }
    }

    private receptor(): Table {
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
                        text: 'CALEB ISAAC MORA DIAZ',
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
                            {text: 'MODC980924HK1', bold: true}
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
                            {text: '612 - Personas Físicas con Actividades Empresariales y Profesionales', bold: true}
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
                            {text: '77725', bold: true}
                        ],
                        style: 'tableCell',
                        alignment: 'left',
                    }
                ]
            ]
        }
    }

    private payment(): Table {
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
                            {text: 'G03 - Gastos en general', bold: true,}
                        ],
                        style: 'tableCell',
                        alignment: 'left',
                    },
                    {
                        text: [
                            {text: 'Exportación', style: 'tableCell'},
                            '\n',
                            {text: '01 - No aplica', bold: true}
                        ],
                        style: 'tableCell',
                        alignment: 'left',
                    }],
                [
                    {
                        width: '*',
                        text: [
                            'Método de pago',
                            '\n',
                            {text: 'PUE - Pago en una sola exhibición', bold: true}
                        ],
                        style: 'tableCell',
                        alignment: 'left',
                    },
                    {
                        width: '*',
                        text: [
                            'Forma de pago',
                            '\n',
                            {text: '01 - Efectivo', bold: true}
                        ],
                        style: 'tableCell',
                        alignment: 'left',
                    }],
            ]
        }
    }

    private concept(index: number): Table {
        return {
            widths: ['*'],
            body: [
                [{
                    text: `Producto ${index + 1}`,
                }],
                [{
                    text: 'Código SAT: 95141904 Unidad SAT: H87 Objeto Impuesto: 02 - Sí objeto de impuesto',
                    fontSize: 6,
                    lineHeight: 1
                }],
                [{
                    text: 'Impuesto: IVA Tipo factor: Tasa Tasa o cuota: 0.16 Base: $ 107.76 Importe: $ 17.24',
                    fontSize: 6,
                    lineHeight: 1
                }]
            ]
        }
    }

    private concepts(): Table {
        const concepts: TableCell[][] = [1, 2, 3, 4].map(value => (
            [
                {
                    layout: 'noBorders',
                    table: this.concept(value)
                },
                {
                    text: currency(107.76),
                    alignment: 'right',
                },
                {
                    text: (1).toFixed(2),
                    alignment: 'right',
                },
                {
                    text: currency(107.76),
                    alignment: 'right',
                },
                {
                    text: currency(7.76),
                    alignment: 'right',
                }
            ]
        ))

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
        }
    }

    private summary(): Content {
        return [
            {
                columns: [
                    {
                        width: '*',
                        layout: 'noBorders',
                        table: {
                            widths: ['*'],
                            body: [
                                [{text: 'Subtotal', alignment: 'right'}],
                                [{text: 'Descuento', alignment: 'right'}],
                                [{text: 'IVA Trasladado (16%)', alignment: 'right'}],
                            ]
                        }
                    },
                    {
                        width: 50,
                        layout: 'noBorders',
                        table: {
                            widths: ['*'],
                            body: [
                                [{text: currency(431.04), alignment: 'right', bold: true}],
                                [{text: currency(31.04), alignment: 'right', bold: true}],
                                [{text: currency(64), alignment: 'right', bold: true}],
                            ]
                        }
                    },
                ]
            },
            {
                layout: pdfmakeTableLayout,
                table: {
                    widths: ['*'],
                    body: [
                        [
                            {
                                fontSize: 10,
                                text: [
                                    {text: 'Total '},
                                    {text: currency(464), bold: true}
                                ],
                                alignment: 'right'
                            },
                        ]
                    ]
                }
            }
        ]
    }

    private footer(currentPage: number, pageCount: number): Column[] {
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
        ]
    }

    private buildDefinition() {
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
                            layout: pdfmakeTableLayout,
                            table: this.folio()
                        }
                    ]
                },
                '\n',
                {
                    columns: [
                        {
                            width: '50%',
                            layout: pdfmakeTableLayout,
                            table: this.receptor()
                        },
                        {
                            width: '50%',
                            layout: pdfmakeTableLayout,
                            table: this.payment()
                        }
                    ]
                },
                '\n',
                {
                    layout: pdfmakeTableConceptLayout,
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
                            layout: pdfmakeTableZebraLayout,
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
                                        text: '1cbec0ea-6a29-4628-a822-9a170e20cd4e',
                                        fontSize: 4,
                                        lineHeight: 1.15
                                    }],
                                    [{
                                        text: 'RFC proveedor de certificación',
                                        fontSize: 4,
                                        lineHeight: 1.15
                                    }],
                                    [{
                                        text: 'SPR190613I52',
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
                            layout: pdfmakeTableZebraLayout,
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
                                        text: '30001000000400002495',
                                        fontSize: 4,
                                        lineHeight: 1.15
                                    }],
                                    [{
                                        text: 'Sello digital del SAT',
                                        fontSize: 4,
                                        lineHeight: 1.15
                                    }],
                                    [{
                                        text: 'QSbEuH9+qJ1uA2S7z04nsFT/hufLYg5xPFXsgtMZwdrjLT/23MZVx326xhhQbbhFAIaFby9sbNeh8+z+WO9ZzAz1Ez2kUXIvBecfDDpU3oz2e+WwNkb+Qmuv3TdI0wAp8If47OUvR8FfKckA0LSNA3rwXDFNHPfvi6WlXA0J6jPrkrOlw+t7Vq3aDpgaXPWS8EyQld2UwbN2GYG+dAiIw+dCR92jn3PbehxgHl46m9fwihosSHPfrDZMlumqA98tt+19GlHVrzOx8a/bSZVT5kxIYwGs2w0kSjR57zd6aeWUtxYgGEXAU9Q/hhxmy2UNtnBNuPqryBn0G1Ei3pC5Wg==',
                                        fontSize: 4,
                                        lineHeight: 1.15
                                    }]
                                ]
                            }
                        },
                        {
                            width: '20%',
                            layout: pdfmakeTableZebraLayout,
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
                                        text: '21 Jul. 2022 - 12:50:50',
                                        fontSize: 4,
                                        lineHeight: 1.15
                                    }],
                                    [{
                                        text: 'Sello digital del CFDI',
                                        fontSize: 4,
                                        lineHeight: 1.15
                                    }],
                                    [{
                                        text: 'VwGGm5IWxdBM1W68cnUdE2t7AF32+GbrgBAMOKLdroOTbMF08PLL8FG9FCL09mywdjjMHiXk6uAlyk/EtOgbYNDCHpcjRWDtgKSHBvMQ+4wcxu6rNi2RfATa1rbbPhNa0zeFhphTjaZi8bWbEOJene0yuXK87EQwGMZylTXfSe71dEoio9kbABM7PBPkznvmUn276YQ4yQEFo2bqpSn2KbzBkqFxQZuKHiSueG4ml3vNIe960WRTyR0BtuUyVassyioGmJqOa9EXB9Uyv/8MPsFPNOFiIYZ6x4D/uq0fdleTBZ331nvp0vdzSlgQKyZVGjxkrDVS3symnU+K9vfPDA==',
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
                    {columns: this.footer(currentPage, pageCount)}
                ]
            },
            styles: pdfmakeStyles,
            defaultStyle: pdfmakeDefaultStyle
        }
    }

    public createDocument() {
        const doc = PdfMake.createPdf(this._definition, {}, fonts);

        doc.getBase64(base => {
            writeFile(`${process.cwd()}/src/pdfs/${new Date().getTime()}.pdf`, base, 'base64', error => {
                if (error) {
                    throw error;
                } else {
                    console.log('base64 saved!');
                }
            });
        })
    }
}
