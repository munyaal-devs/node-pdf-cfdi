import { Table, TableCell } from "pdfmake/interfaces";
import { PagosPagoType } from "../../types/childs/Complementos/Pagos/Pago/PagosPago.type";
import { currency } from "../../helpers";
import { CatalogEnum, searchOption } from "@munyaal/cfdi-catalogs";
import { pdfmakeSubTableLayout } from "../../pdfmake.config";

export const pagos = (Pagos: PagosPagoType[]) => {
  const concepts: any = []
  Pagos.forEach((value: PagosPagoType) => {
    const bodyConcept: any[] = [
      [
        {
          text: value.NumOperacion || '',
          alignment: "center",
          style: "tableCell",
          marginTop: 1.5
        },
        {
          layout: "noBorders",
          table: getPayment(value),
        },
        {
          text: value.MonedaP,
          alignment: "right",
          style: "tableCell",
          marginTop: 1.5
        },
        {
          text: value.TipoCambioP || '',
          alignment: "right",
          style: "tableCell",
          marginTop: 1.5
        },
        {
          text: currency(
            isNaN(parseFloat(
              `${value.Monto}`
            ))
              ? 0
              : parseFloat(`${value.Monto}`)
          ),
          alignment: "right",
          style: "tableCell",
          marginTop: 1.5
        },
      ]
    ];

    if(value.TipoCadPago){
      bodyConcept.push(
        [
          {
            colSpan: 5,
            layout: pdfmakeSubTableLayout,
            table: {
              widths: ["*"],
              body: [
                [
                  {
                    text: [
                      {
                        text: "Información del SPEI",
                      },
                    ],
                    alignment: "center",
                    fontSize: 4
                  },
                ],[
                  {
                    text: `Certificado del Pago: ${ value.CertPago}`,
                    alignment: "left",
                    fontSize: 4
                  }
                ],[
                  {
                    text: `Cadena Original del Comprobante de Pago: ${ value.CadPago}`,
                    alignment: "left",
                    fontSize: 4
                  }
                ],[
                  {
                    text: `Sello del Comprobante de Pago: ${ value.SelloPago}`,
                    alignment: "left",
                    fontSize: 4
                  }
                ]
              ]
            }
          }, {}, {}, {}, {}
        ]
      )
    }

    concepts.push([
      {
        colSpan: 5,
        layout: "noBorders",
        table: {
          widths: [45, "*", 45, 45, 45],
          body: bodyConcept
        } as Table
      }, {}, {}, {}, {}
    ])
  });

  return {
    widths: [45, "*", 45, 45, 45],
    body: [
      [
        {
          text: "Número de Operación",
          alignment: "left",
          style: "tableCell",
          marginTop: 0.15,
          bold: true,
        },
        {
          text: "Detalles",
          alignment: "left",
          style: "tableCell",
          marginTop: 6,
          bold: true,
        },
        {
          text: "Moneda",
          alignment: "right",
          style: "tableCell",
          marginTop: 6,
          bold: true,
        },
        {
          text: "Tipo de cambio",
          alignment: "right",
          style: "tableCell",
          marginTop: 0.15,
          bold: true,
        },
        {
          text: "Monto",
          alignment: "right",
          style: "tableCell",
          marginTop: 6,
          bold: true,
        },
      ],
      ...concepts,
    ]
  };
}

export const getPayment = (value: PagosPagoType): Table => {
  const body: TableCell[][] = [
    [
      {
        text: [
          "Fecha de pago",
          "\n",
          {
            text: value.FechaPago,
            bold: true,
          },
        ],
        style: "tableCell",
        alignment: "left",
      },
      {
        text: [
          "Método de pago",
          "\n",
          {
            text: `${value.FormaDePagoP} - ${searchOption(
              value.FormaDePagoP || "",
              CatalogEnum.FormaPago
            )?.description
              }`,
            bold: true,
          },
        ],
        style: "tableCell",
        alignment: "left",
      },
    ],
  ];

  if (value.RfcEmisorCtaOrd || value.CtaOrdenante || value.NomBancoOrdExt ||
    value.RfcEmisorCtaBen || value.CtaBeneficiario) {

    body.push(
      [
        {
          text: `RFC Emisor Cuenta Ordenante: ${value.RfcEmisorCtaOrd || ''}`
        },
        {
          text: `RFC Emisor Cuenta Beneficiario: ${value.RfcEmisorCtaBen || ''}`
        },
      ], [
      {
        text: `Cuenta Ordenante: ${value.CtaOrdenante || ''}`
      },
      {
        text: `Cuenta Beneficiario: ${value.CtaBeneficiario || ''}`
      },
    ],
      [
        {
          text: [
            "Nombre del Banco Extranjero:",
            "\n",
            value.NomBancoOrdExt || ''
          ],
          style: "tableCell",
          alignment: "left",
        },
        {

        },
      ]
    );
  }


  return {
    widths: ["*", "*"],
    body
  };
}