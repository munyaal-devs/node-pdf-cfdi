import { Content } from "pdfmake/interfaces";
import { currency, getTotalText } from "../helpers";
import { pdfmakeTableLayout } from "../pdfmake.config";
import { ComprobanteType } from "../types";
import { TipoComprobanteEnum } from "../utils/enums/tipo.comprobante.enum";
import { ComprobanteComplementoPagosTotalesElement } from "../types/elements/comprobante.complemento.pagos.totales.element";

export const summary = (data: ComprobanteType): Content => {
  let bodyTitle = [
    [{ text: "Subtotal", alignment: "right" }],
    [{ text: "Descuento", alignment: "right" }],
    [{ text: "IVA Trasladado (16%)", alignment: "right" }],
  ];

  let bodyContent = [
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
  ];

  if (data.TipoDeComprobante == TipoComprobanteEnum.P) {
    bodyTitle = [];
    bodyContent = [];

    if (data.Complemento.Pagos?.Totales) {
      const { title, content } = getPagoTotales(data.Complemento.Pagos.Totales);
      bodyTitle.push(...title);
      bodyContent.push(...content);
    }
  }


  return [
    {
      columns: [
        {
          width: "*",
          layout: "noBorders",
          table: {
            widths: ["*"],
            body: bodyTitle,
          },
        },
        {
          width: 50,
          layout: "noBorders",
          table: {
            widths: ["*"],
            body: bodyContent,
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
                  text: currency(parseFloat(`${data.TipoDeComprobante ===  TipoComprobanteEnum.P ? data.Complemento.Pagos?.Totales.MontoTotalPagos :  data.Total}`)),
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
                  text: `${getTotalText(data.TipoDeComprobante ===  TipoComprobanteEnum.P ? data.Complemento.Pagos?.Totales.MontoTotalPagos || '0' :  data.Total)} ${data.Moneda
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

const getPagoTotales = (value: ComprobanteComplementoPagosTotalesElement) => {
  const totalesTitle = [];
  const totalesContent = [];
  if (value.TotalRetencionesIVA) {
    totalesTitle.push([{ text: "Retenciones IVA", alignment: "right" }]);
    totalesContent.push([{
      text: currency(
        isNaN(parseFloat(
          `${value.TotalRetencionesIVA}`
        ))
          ? 0
          : parseFloat(
            `${value.TotalRetencionesIVA}`
          )
      ),
      alignment: "right",
      bold: true,
    }]);
  }

  if (value.TotalRetencionesISR) {
    totalesTitle.push([{ text: "Retenciones ISR", alignment: "right" }]);
    totalesContent.push([{
      text: currency(
        isNaN(parseFloat(
          `${value.TotalRetencionesISR}`
        ))
          ? 0
          : parseFloat(
            `${value.TotalRetencionesISR}`
          )
      ),
      alignment: "right",
      bold: true,
    }]);
  }

  if (value.TotalRetencionesIEPS) {
    totalesTitle.push([{ text: "Retenciones IEPS", alignment: "right" }]);
    totalesContent.push([{
      text: currency(
        isNaN(parseFloat(
          `${value.TotalRetencionesIEPS}`
        ))
          ? 0
          : parseFloat(
            `${value.TotalRetencionesIEPS}`
          )
      ),
      alignment: "right",
      bold: true,
    }]);
  }

  if (value.TotalTrasladosBaseIVA16) {
    totalesTitle.push([{ text: "Traslados base IVA 16", alignment: "right" }]);
    totalesContent.push([{
      text: currency(
        isNaN(parseFloat(
          `${value.TotalTrasladosBaseIVA16}`
        ))
          ? 0
          : parseFloat(
            `${value.TotalTrasladosBaseIVA16}`
          )
      ),
      alignment: "right",
      bold: true,
    }]);
  }

  if (value.TotalTrasladosImpuestoIVA16) {
    totalesTitle.push([{ text: "Traslados impuesto IVA 16", alignment: "right" }]);
    totalesContent.push([{
      text: currency(
        isNaN(parseFloat(
          `${value.TotalTrasladosImpuestoIVA16}`
        ))
          ? 0
          : parseFloat(
            `${value.TotalTrasladosImpuestoIVA16}`
          )
      ),
      alignment: "right",
      bold: true,
    }]);
  }

  if (value.TotalTrasladosBaseIVA8) {
    totalesTitle.push([{ text: "Traslados base IVA 8", alignment: "right" }]);
    totalesContent.push([{
      text: currency(
        isNaN(parseFloat(
          `${value.TotalTrasladosBaseIVA8}`
        ))
          ? 0
          : parseFloat(
            `${value.TotalTrasladosBaseIVA8}`
          )
      ),
      alignment: "right",
      bold: true,
    }]);
  }

  if (value.TotalTrasladosImpuestoIVA8) {
    totalesTitle.push([{ text: "Traslados impuesto IVA 8", alignment: "right" }]);
    totalesContent.push([{
      text: currency(
        isNaN(parseFloat(
          `${value.TotalTrasladosImpuestoIVA8}`
        ))
          ? 0
          : parseFloat(
            `${value.TotalTrasladosImpuestoIVA8}`
          )
      ),
      alignment: "right",
      bold: true,
    }]);
  }

  if (value.TotalTrasladosBaseIVA0) {
    totalesTitle.push([{ text: "Traslados base IVA 0", alignment: "right" }]);
    totalesContent.push([{
      text: currency(
        isNaN(parseFloat(
          `${value.TotalTrasladosBaseIVA0}`
        ))
          ? 0
          : parseFloat(
            `${value.TotalTrasladosBaseIVA0}`
          )
      ),
      alignment: "right",
      bold: true,
    }]);
  }

  if (value.TotalTrasladosImpuestoIVA0) {
    totalesTitle.push([{ text: "Traslados impuesto IVA 0", alignment: "right" }]);
    totalesContent.push([{
      text: currency(
        isNaN(parseFloat(
          `${value.TotalTrasladosImpuestoIVA0}`
        ))
          ? 0
          : parseFloat(
            `${value.TotalTrasladosImpuestoIVA0}`
          )
      ),
      alignment: "right",
      bold: true,
    }]);
  }

  if (value.TotalTrasladosBaseIVAExento) {
    totalesTitle.push([{ text: "Traslados base IVA Exento", alignment: "right" }]);
    totalesContent.push([{
      text: currency(
        isNaN(parseFloat(
          `${value.TotalTrasladosBaseIVAExento}`
        ))
          ? 0
          : parseFloat(
            `${value.TotalTrasladosBaseIVAExento}`
          )
      ),
      alignment: "right",
      bold: true,
    }]);
  }

  return {
    title: totalesTitle,
    content: totalesContent
  };
}