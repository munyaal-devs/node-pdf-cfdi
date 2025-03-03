import {
  Content,
  TDocumentDefinitions,
} from "pdfmake/interfaces";
import PdfMake from "pdfmake/build/pdfmake";
import { fontBase64 } from "./fonts/OpenSans/fontBase64";
import { fonts } from "./fonts/OpenSans/fontConfig";
import { writeFile } from "fs";
import {
  pdfmakeDefaultStyle,
  pdfmakeStyles,
  pdfmakeTableLayout,
  pdfmakeTableZebraLayout,
} from "./pdfmake.config";
import { getData, getUrlQr } from "./helpers";
import { emisor, folio, getLogo, payment, receptor, relationships, footerPage, summary} from "./pdfmakeData";
import { ComprobanteType } from "./types";
import { contents } from "./pdfmakeData/contents";

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
              table: receptor(this.data.Receptor),
            },
            {
              width: "50%",
              layout: pdfmakeTableLayout,
              table: payment(this.data),
            },
          ],
        },
        "\n",
        contents(this.data),
        summary(this.data),
        "\n",
        {
          columns: !this.data.CfdiRelacionados.length ? [] : [
            {
              width: "100%",
              layout: pdfmakeTableLayout,
              table: relationships(this.data.CfdiRelacionados),
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
        return [{ columns: footerPage(currentPage, pageCount) }];
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
