import { CatalogEnum, searchOption } from "@munyaal/cfdi-catalogs";
import { Table, TableCell } from "pdfmake/interfaces";
import { ComprobanteCfdiRelacionadosType } from "../types";

export const relationship = (value: ComprobanteCfdiRelacionadosType): Table => {
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

export const relationships = (CfdiRelacionados: ComprobanteCfdiRelacionadosType[]): Table => {
    const concepts: TableCell[][] = CfdiRelacionados.map(
      (value: ComprobanteCfdiRelacionadosType) => [
        {
          layout: "noBorders",
          table: relationship(value),
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