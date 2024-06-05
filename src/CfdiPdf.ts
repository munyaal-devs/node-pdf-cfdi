import {
  Column,
  Content,
  Table,
  TableCell,
  TDocumentDefinitions,
} from "pdfmake/interfaces";
import PdfMake from "pdfmake/build/pdfmake";
import { fontBase64 } from "./fonts/OpenSans/fontBase64";
import { fonts } from "./fonts/OpenSans/fontConfig";
import { writeFile, readFileSync } from "fs";
import {
  pdfmakeDefaultStyle,
  pdfmakeStyles,
  pdfmakeTableConceptLayout,
  pdfmakeTableLayout,
  pdfmakeTableZebraLayout,
} from "./pdfmake.config";
import { currency, getTotalText, getData, getUrlQr } from "./helpers";
import { searchOption } from "@munyaal/cfdi-catalogs";
import { CatalogEnum } from "@munyaal/cfdi-catalogs/dist/src";
import { emisor, folio, getLogo } from "./pdfmakeData";
import { ComprobanteType } from "./types";

PdfMake.vfs = fontBase64;
PdfMake.fonts = fonts;

export class CfdiPdf {
  private _definition!: TDocumentDefinitions;
  private data!: ComprobanteType;
  private url: string =
    "https://verificacfdi.facturaelectronica.sat.gob.mx/default.aspx";
  private cadenaOriginal: string = "";
  private logo: string | undefined = undefined;

  constructor(xml: string, cadenaOriginal: string, pathLogo?: string) {
    this.cadenaOriginal = cadenaOriginal;
    this.data = getData(xml);
    this.url += getUrlQr(this.data);
    if (pathLogo != undefined && pathLogo != "") {
      this.logo = getLogo(pathLogo);
    }
    this.buildDefinition();
  }

  private receptor(): Table {
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
                text: `${this.data.Receptor.RegimenFiscalReceptor} - ${
                  searchOption(
                    this.data.Receptor.RegimenFiscalReceptor,
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

  private payment(): Table {
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
                text: `${this.data.Receptor.UsoCFDI} - ${
                  searchOption(this.data.Receptor.UsoCFDI, CatalogEnum.UsoCFDI)
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
              { text: `${this.data.Exportacion} - ${searchOption(this.data.Exportacion, CatalogEnum.Exportacion)
                ?.description}`, bold: true },
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
                text: `${this.data.MetodoPago} - ${
                  searchOption(
                    this.data.MetodoPago || "",
                    CatalogEnum.MetodoPago
                  )?.description
                }`,
                bold: true,
              },
            ],
            style: "tableCell",
            alignment: "left",
          } : { },
          this.data.FormaPago ? {
            width: "*",
            text: [
              "Forma de pago",
              "\n",
              {
                text: `${this.data.FormaPago} - ${
                  searchOption(this.data.FormaPago || "", CatalogEnum.FormaPago)
                    ?.description
                }`,
                bold: true,
              },
            ],
            style: "tableCell",
            alignment: "left",
          } : { },
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
        ] : [{},{}],
      ],
    };
  }

  private concept(value: any): Table {
    const table = [
      [
        {
          text: `${value.Descripcion}`,
        },
      ],
      [
        {
          text: `Código SAT: ${value.ClaveProdServ} Unidad SAT: ${
            value.ClaveUnidad
          } Objeto Impuesto: ${value.ObjetoImp} - ${
            searchOption(value.ObjetoImp, CatalogEnum.ObjetoImp)?.description
          }`,
          fontSize: 6,
          lineHeight: 1,
        },
      ],
    ];
    if (
      parseFloat(this.data.Impuestos?.TotalImpuestosTrasladados || "0") != 0
    ) {
      table.push([
        {
          text: `Impuesto: ${
            searchOption(
              value.Impuestos?.Traslados[0].Impuesto || "",
              CatalogEnum.Impuesto
            )?.description
          } Tipo factor: ${
            value.Impuestos?.Traslados[0].TipoFactor || ""
          } Tasa o cuota: ${parseFloat(
            value.Impuestos?.Traslados[0].TasaOCuota || ""
          ).toFixed(2)} Base: ${currency(
            parseFloat(`${value.Impuestos?.Traslados[0].Base || ""}`)
          )} Importe: ${currency(
            parseFloat(`${value?.Impuestos?.Traslados[0].Importe || ""}`)
          )}`,
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

  private concepts(): Table {
    const concepts: TableCell[][] = this.data.Conceptos.map((value: any) => [
      {
        layout: "noBorders",
        table: this.concept(value),
      },
      {
        text: currency(parseFloat(`${value.ValorUnitario}`)),
        alignment: "right",
      },
      {
        text: value.Cantidad,
        alignment: "right",
      },
      {
        text: currency(parseFloat(`${value.Importe}`)),
        alignment: "right",
      },
      {
        text: currency(
          isNaN(parseFloat(
            `${value.Descuento}`
          ))
          ? 0 
          : parseFloat(`${value.Descuento}`)
        ),
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

  private relationship(value: any): Table {
    const table = [
      [
        {
          text: `${value.TipoRelacion} - ${
            searchOption(value.TipoRelacion, CatalogEnum.TipoRelacion)
              ?.description
          }`,
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
      ] as any);
    }

    return {
      widths: ["*"],
      body: table,
    };
  }

  private relationships(): Table {
    const concepts: TableCell[][] = this.data.CfdiRelacionados.map(
      (value: any) => [
        {
          layout: "noBorders",
          table: this.relationship(value),
        },
      ]
    );

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

  private summary(): Content {
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
                    text: currency(parseFloat(`${this.data.SubTotal}`)),
                    alignment: "right",
                    bold: true,
                  },
                ],
                [
                  {
                    text: currency(
                      isNaN(parseFloat(
                        `${this.data.Descuento}`
                      ))
                      ? 0 
                      : parseFloat(`${this.data.Descuento}`)
                    ),
                    alignment: "right",
                    bold: true,
                  },
                ],
                [
                  {
                    text: currency(
                      isNaN(parseFloat(
                        `${this.data.Impuestos?.TotalImpuestosTrasladados}`
                      ))
                      ? 0
                      : parseFloat(
                        `${this.data.Impuestos?.TotalImpuestosTrasladados}`
                      )
                    ),
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
        layout: pdfmakeTableLayout,
        table: {
          widths: ["*"],
          body: [
            [
              {
                fontSize: 10,
                text: [
                  { text: "Total " },
                  {
                    text: currency(parseFloat(`${this.data.Total}`)),
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
                    text: `${getTotalText(this.data.Total)} ${
                      this.data.Moneda
                    }`,
                  },
                ],
              },
            ],
          ],
        },
      },
    ];
  }

  private footer(currentPage: number, pageCount: number): Column[] {
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

  private buildDefinition() {
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
              text: emisor(this.data.Emisor, this.data.NoCertificado || ''),
            },
            {
              width: "40%",
              layout: pdfmakeTableLayout,
              table: folio({
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
              layout: pdfmakeTableLayout,
              table: this.receptor(),
            },
            {
              width: "50%",
              layout: pdfmakeTableLayout,
              table: this.payment(),
            },
          ],
        },
        "\n",
        {
          layout: pdfmakeTableConceptLayout,
          table: this.concepts(),
        },
        this.summary(),
        "\n",
        {
          columns: !this.data.CfdiRelacionados.length ? [] : [
            {
              width: "100%",
              layout: pdfmakeTableLayout,
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
              layout: pdfmakeTableZebraLayout,
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
              layout: pdfmakeTableZebraLayout,
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
              layout: pdfmakeTableZebraLayout,
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
        return [{ columns: this.footer(currentPage, pageCount) }];
      },
      styles: pdfmakeStyles,
      defaultStyle: pdfmakeDefaultStyle,
    };
  }

  public async createDocument(name: string, folderPath: string) {
    return new Promise((resolve, reject) => {
      const doc = PdfMake.createPdf(this._definition, {}, fonts, fontBase64);

      doc.getBase64((base) => {
        writeFile(`${folderPath}/${name}.pdf`, base, "base64", (error) => {
          if (error) {
            console.error(error);
            reject(error);
          } else {
            resolve(`${folderPath}/${name}.pdf`);
          }
        });
      });
    });
  }
}
