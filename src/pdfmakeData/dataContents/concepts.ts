import { CatalogEnum, searchOption } from "@munyaal/cfdi-catalogs";
import { Table, TableCell } from "pdfmake/interfaces";
import { currency } from "../../helpers";
import { ComprobanteConceptoType } from "../../types";

export const concept = (value: ComprobanteConceptoType, withImpuestos: boolean): Table => {
  const table = [
    [
      {
        text: `${value.Descripcion}`,
      },
    ],
    [
      {
        text: `Código SAT: ${value.ClaveProdServ} Unidad SAT: ${value.ClaveUnidad
          } Objeto Impuesto: ${value.ObjetoImp} - ${searchOption(value.ObjetoImp, CatalogEnum.ObjetoImp)?.description
          }`,
        fontSize: 6,
        lineHeight: 1,
      },
    ],
  ];
  if (
    withImpuestos
  ) {
    table.push([
      {
        text: `Impuesto: ${searchOption(
          value.Impuestos?.Traslados[0].Impuesto || "",
          CatalogEnum.Impuesto
        )?.description
          } Tipo factor: ${value.Impuestos?.Traslados[0].TipoFactor || ""
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
  if (!!Object.getOwnPropertyNames(value.ComplementoConcepto).length) {
    if (!!Object.getOwnPropertyNames(value?.ComplementoConcepto?.iedu).length) {
      table.push([
        {
          text: `Alumno: ${value.ComplementoConcepto?.iedu?.nombreAlumno} CURP: ${value.ComplementoConcepto?.iedu?.CURP} Nivel educativo: ${value.ComplementoConcepto?.iedu?.nivelEducativo} Clave: ${value.ComplementoConcepto?.iedu?.autRVOE} RFC: ${value.ComplementoConcepto?.iedu?.rfcPago}`,
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

export const concepts = (Conceptos: ComprobanteConceptoType[], withImpuestos: boolean): Table => {
  const concepts: TableCell[][] = Conceptos.map((value: any) => [
    {
      layout: "noBorders",
      table: concept(value, withImpuestos),
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