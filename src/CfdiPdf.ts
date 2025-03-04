import { Content, TDocumentDefinitions } from "pdfmake/interfaces";
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
import {
  emisor,
  folio,
  getLogo,
  payment,
  receptor,
  relationships,
  footerPage,
  summary,
} from "./pdfmakeData";
import { ComprobanteType } from "./types";
import { contents } from "./pdfmakeData/contents";

PdfMake.vfs = fontBase64;
PdfMake.fonts = fonts;

export class CfdiPdf {
  private _definition!: TDocumentDefinitions;
  private data!: ComprobanteType;
  private url: string = "https://verificacfdi.facturaelectronica.sat.gob.mx/default.aspx";
  private cadenaOriginal: string = "";
  private logo: string | undefined = undefined;

  constructor(xml: string, cadenaOriginal: string, pathLogo?: string) {
    this.cadenaOriginal = cadenaOriginal;
    this.data = getData(xml);
    this.url += getUrlQr(this.data);
    if (pathLogo) {
      this.logo = getLogo(pathLogo);
    }
    this.buildDefinition();
  }

  private buildDefinition() {
    this._definition = {
      pageSize: "LETTER",
      pageOrientation: "portrait",
      pageMargins: [25, 25],
      content: this.buildContent(),
      footer: (currentPage, pageCount) => [{ columns: footerPage(currentPage, pageCount) }],
      styles: pdfmakeStyles,
      defaultStyle: pdfmakeDefaultStyle,
    };
  }

  private buildContent(): Content[] {
    return [
      this.buildHeader(),
      "\n",
      this.buildReceptorPayment(),
      "\n",
      contents(this.data),
      summary(this.data),
      "\n",
      this.buildRelationships(),
      "\n",
      "\n",
      this.buildFooter(),
    ];
  }

  private buildHeader(): Content {
    return {
      columns: [
        this.logo ? { image: this.logo, fit: [80, 80], alignment: "left" } : [],
        {
          width: this.logo ? "45%" : "60%",
          text: emisor(this.data.Emisor, this.data.NoCertificado || ""),
        },
        {
          width: "40%",
          layout: pdfmakeTableLayout,
          table: folio({
            TipoDeComprobante: this.data.TipoDeComprobante,
            Serie: this.data?.Serie || "",
            Fecha: this.data?.Fecha,
            Folio: this.data?.Folio || "",
            LugarExpedicion: this.data.LugarExpedicion,
            VersionPago: this.data.Complemento.Pagos?.Version,
          }),
        },
      ],
    };
  }

  private buildReceptorPayment(): Content {
    return {
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
    };
  }

  private buildRelationships(): Content {
    return this.data.CfdiRelacionados.length
      ? {
          columns: [
            {
              width: "100%",
              layout: pdfmakeTableLayout,
              table: relationships(this.data.CfdiRelacionados),
            },
          ],
        }
      : [];
  }

  private buildFooter(): Content {
    return {
      columns: [
        { qr: `${this.url}`, fit: 130 },
        this.buildFooterTable1(),
        this.buildFooterTable2(),
        this.buildFooterTable3(),
      ],
    };
  }

  private buildFooterTable1(): Content {
    return {
      width: "40%",
      layout: pdfmakeTableZebraLayout,
      table: {
        headerRows: 1,
        widths: ["100%"],
        body: [
          [{ text: "Folio fiscal", fontSize: 4, lineHeight: 1.15 }],
          [{ text: `${this.data.Complemento?.TimbreFiscalDigital?.UUID}`, fontSize: 4, lineHeight: 1.15 }],
          [{ text: "RFC proveedor de certificación", fontSize: 4, lineHeight: 1.15 }],
          [{ text: `${this.data.Complemento?.TimbreFiscalDigital?.RfcProvCertif}`, fontSize: 4, lineHeight: 1.15 }],
          [{ text: "Cadena original del timbre", fontSize: 4, lineHeight: 1.15 }],
          [{ text: `${this.cadenaOriginal}`, fontSize: 4, lineHeight: 1.15 }],
        ],
      },
    } as Content;
  }

  private buildFooterTable2(): Content {
    return {
      width: "20%",
      layout: pdfmakeTableZebraLayout,
      table: {
        headerRows: 1,
        widths: ["100%"],
        body: [
          [{ text: "Número de certificado SAT", fontSize: 4, lineHeight: 1.15 }],
          [{ text: `${this.data.Complemento.TimbreFiscalDigital?.NoCertificadoSAT}`, fontSize: 4, lineHeight: 1.15 }],
          [{ text: "Sello digital del SAT", fontSize: 4, lineHeight: 1.15 }],
          [{ text: `${this.data.Complemento.TimbreFiscalDigital?.SelloSAT}`, fontSize: 4, lineHeight: 1.15 }],
        ],
      },
    } as Content;
  }

  private buildFooterTable3(): Content {
    return {
      width: "20%",
      layout: pdfmakeTableZebraLayout,
      table: {
        headerRows: 1,
        widths: ["100%"],
        body: [
          [{ text: "Fecha y hora de certificación", fontSize: 4, lineHeight: 1.15 }],
          [{ text: `${this.data.Complemento.TimbreFiscalDigital?.FechaTimbrado}`, fontSize: 4, lineHeight: 1.15 }],
          [{ text: "Sello digital del CFDI", fontSize: 4, lineHeight: 1.15 }],
          [{ text: `${this.data.Complemento.TimbreFiscalDigital?.SelloCFD}`, fontSize: 4, lineHeight: 1.15 }],
        ],
      },
    } as Content;
  }

  public async createDocument(name: string, folderPath: string): Promise<string> {
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

  public async getBuffer(): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = PdfMake.createPdf(this._definition, {}, fonts, fontBase64);

      doc.getBuffer((buffer) => {
        if (buffer) {
          resolve(buffer);
        } else {
          reject(new Error("Failed to generate PDF buffer"));
        }
      });
    });
  }
}
