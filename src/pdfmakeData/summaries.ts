import { Content } from "pdfmake/interfaces";
import { currency, getTotalText } from "../helpers";
import { pdfmakeTableLayout } from "../pdfmake.config";
import { ComprobanteType } from "../types";

export const summary = (data: ComprobanteType): Content => {
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
                    text: currency(parseFloat(`${data.SubTotal}`)),
                    alignment: "right",
                    bold: true,
                  },
                ],
                [
                  {
                    text: currency(
                      isNaN(parseFloat(
                        `${data.Descuento}`
                      ))
                      ? 0 
                      : parseFloat(`${data.Descuento}`)
                    ),
                    alignment: "right",
                    bold: true,
                  },
                ],
                [
                  {
                    text: currency(
                      isNaN(parseFloat(
                        `${data.Impuestos?.TotalImpuestosTrasladados}`
                      ))
                      ? 0
                      : parseFloat(
                        `${data.Impuestos?.TotalImpuestosTrasladados}`
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
                    text: currency(parseFloat(`${data.Total}`)),
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
                    text: `${getTotalText(data.Total)} ${
                      data.Moneda
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