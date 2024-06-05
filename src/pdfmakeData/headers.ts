import { CatalogEnum, searchOption } from "@munyaal/cfdi-catalogs";
import { readFileSync } from "fs";
import { Content, Table } from "pdfmake/interfaces";
import { ComprobanteEmisorType } from "../types";
import { TipoComprobanteEnum } from "../utils/enums/tipo.comprobante.enum";

export const getLogo = (path: string) => {
  try {
    const logo = readFileSync(`${path}`);
    return `data:image/jpg;base64, ${logo.toString("base64")}`;
  } catch (e) {
    console.error({
      status: "ERROR: 001",
      process: "No se pudo obtener el archivo",
      solutions: [`Valida la existencia del archivo ${path}`],
      error: e,
    });
    return undefined;
  }
}

export const emisor = (Emisor: ComprobanteEmisorType, NoCertificado: string): Content => {
  return [
    { text: `${Emisor.Nombre}`, bold: true, fontSize: 10 },
    "\n",
    "RFC: ",
    { text: `${Emisor.Rfc}`, bold: true },
    "\n\n",
    { text: "Régimen fiscal: " },
    {
      text: `${Emisor.RegimenFiscal} - ${searchOption(
        Emisor.RegimenFiscal,
        CatalogEnum.RegimenFiscal
      )?.description
        }`,
      bold: true,
    },
    "\n",
    { text: "Número de certificado: " },
    {
      text: `${NoCertificado}`,
      bold: true,
    },
  ];
}

export const folio = (data: {
  TipoDeComprobante: string;
  Serie: string;
  Folio: string;
  LugarExpedicion: string;
  Fecha: string;
  VersionPago?: string;

}): Table => {
  const { TipoDeComprobante, Folio, Serie, Fecha, LugarExpedicion, VersionPago } = data;
  let labelTipoComprobante = TipoDeComprobante == TipoComprobanteEnum.P 
  ? `Recibo electrónico de pagos ${VersionPago}`
  : `CFDI de ${searchOption(
    TipoDeComprobante,
    CatalogEnum.TipoDeComprobante
  )?.description}`


  return {
    widths: ["*", "*"],
    body: [
      [
        {
          text: labelTipoComprobante,
          alignment: "center",
          style: "tableCell",
          marginTop: 0.15,
          colSpan: 2,
          bold: true,
        },
        {},
      ],
      [
        {
          text: ["Serie", "\n", { text: `${Serie}`, bold: true }],
          style: "tableCell",
          alignment: "left",
        },
        {
          text: [
            { text: "Folio", style: "tableCell" },
            "\n",
            { text: `${Folio}`, bold: true },
          ],
          style: "tableCell",
          alignment: "left",
        },
      ],
      [
        {
          width: "*",
          text: [
            "Lugar de emisión",
            "\n",
            { text: `${LugarExpedicion}`, bold: true },
          ],
          style: "tableCell",
          alignment: "left",
        },
        {
          width: "*",
          text: [
            "Fecha y hora de emisión",
            "\n",
            { text: `${Fecha}`, bold: true },
          ],
          style: "tableCell",
          alignment: "left",
        },
      ],
    ],
  };
}