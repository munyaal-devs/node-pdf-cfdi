import { Table, TableCell } from "pdfmake/interfaces";
import { PagosPagoType } from "../../types/childs/Complementos/Pagos/Pago/PagosPago.type";
import { currency } from "../../helpers";
import { CatalogEnum, searchOption } from "@munyaal/cfdi-catalogs";
import { pdfmakeSubTableLayout } from "../../pdfmake.config";
import { PagosPagoDoctoRelacionadoType } from "../../types/childs/Complementos/Pagos/Pago/PagosPagoDoctoRelacionado.type";

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

    if (!!value.TipoCadPago) {
      bodyConcept.push(getTipoCadPago(value));
    }

    if (!!value.ImpuestosP) {
      bodyConcept.push(getImpuestosP(value));
    }

    if (!!value.DoctoRelacionado) {
      bodyConcept.push(getDoctoRelacionado(value));
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

const getTipoCadPago = (value: PagosPagoType) => {
  return [
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
            },
          ], [
            {
              text: `Certificado del Pago: ${value.CertPago}`,
              alignment: "left",
              fontSize: 4
            }
          ], [
            {
              text: `Cadena Original del Comprobante de Pago: ${value.CadPago}`,
              alignment: "left",
              fontSize: 4
            }
          ], [
            {
              text: `Sello del Comprobante de Pago: ${value.SelloPago}`,
              alignment: "left",
              fontSize: 4
            }
          ]
        ]
      }
    }, {}, {}, {}, {}
  ]
}

const getImpuestosP = (value: PagosPagoType) => {

  let ListRetencionesP: any[] = [];
  let ListTrasladosP: any[] = [];
  if (!!value.ImpuestosP) {
    ListRetencionesP = value.ImpuestosP.RetencionesP.map((ret) => [
      {
        text: `Impuesto: ${ret.ImpuestoP} - ${searchOption(ret.ImpuestoP || "", CatalogEnum.Impuesto)?.description}  Importe: ${ret.ImporteP} `,
        alignment: "left",
        fontSize: 4
      }
    ]);

    ListTrasladosP = value.ImpuestosP.TrasladosP.map((tras) => [
      {
        text: `Impuesto: ${tras.ImpuestoP} - ${searchOption(tras.ImpuestoP || "", CatalogEnum.Impuesto)?.description} TipoFactor: ${tras.TipoFactorP} Base: ${tras.BaseP} TasaOCuota: ${tras.TasaOCuotaP || ''} Importe: ${tras.ImporteP || ''}`,
        alignment: "left",
        fontSize: 4
      }
    ]);
  }

  return [
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
                  text: "Pago - Impuestos",
                },
              ],
              alignment: "center",
            },
          ],
          ListRetencionesP.length ? [
            {
              text: `Impuesto Retenidos`,
              alignment: "left",
              fontSize: 4
            }
          ] : [{}],
          ...ListRetencionesP,
          ListTrasladosP.length ? [
            {
              text: `Impuesto Trasladados`,
              alignment: "left",
              fontSize: 4
            }
          ] : [{}],
          ...ListTrasladosP
        ]
      }
    }, {}, {}, {}, {}
  ]
}

const getDoctoRelacionado = (value: PagosPagoType) => {
  return [
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
                  text: "Documentos Relacionados",
                },
              ],
              alignment: "center",
            },
          ],[
            {
              layout: "noBorders",
              table: getDoctoRelacionadoTable(value?.DoctoRelacionado || []),
            }
          ]
        ]
      }
    }, {}, {}, {}, {}
  ]
}

const getDoctoRelacionadoTable = (value: PagosPagoDoctoRelacionadoType[]) => {
  const body: TableCell[][] = [];
  
  value.forEach((doc) => {
    body.push(
      [
        {
          text: [
            "UUID",
            "\n",
            {
              text: doc.IdDocumento,
              bold: true,
            },
          ],
          style: "tableCell",
          alignment: "left",
          colSpan: 2
        },
        {},
        {
          text: [
            "Serie",
            "\n",
            {
              text: doc.Serie || '',
              bold: true,
            },
          ],
          style: "tableCell",
          alignment: "left",
        },
        {
          text: [
            "Folio",
            "\n",
            {
              text: doc.Folio || '',
              bold: true,
            },
          ],
          style: "tableCell",
          alignment: "left",
        },
        {
          text: [
            "Moneda",
            "\n",
            {
              text: doc.MonedaDR || '',
              bold: true,
            },
          ],
          style: "tableCell",
          alignment: "left",
        },
        {
          text: [
            "Equivalencia",
            "\n",
            {
              text: doc.EquivalenciaDR || '',
              bold: true,
            },
          ],
          style: "tableCell",
          alignment: "left",
        },
      ],[
        {
          text: [
            "Objeto Impuesto",
            "\n",
            {
              text: `${doc.ObjetoImpDR} - ${searchOption(doc.ObjetoImpDR, CatalogEnum.ObjetoImp)?.description}`,
              bold: true,
            },
          ],
          colSpan: 2,
          style: "tableCell",
          alignment: "left",
        },
        {},
        {
          text: [
            "Número de Operación",
            "\n",
            {
              text: doc.NumParcialidad || '',
              bold: true,
            },
          ],
          style: "tableCell",
          alignment: "left",
        },
        {
          text: [
            "Saldo anterior",
            "\n",
            {
              text: `${currency(parseFloat(`${doc.ImpSaldoAnt || "0"}`))}`,
              bold: true,
            },
          ],
          style: "tableCell",
          alignment: "left",
        },
        {
          text: [
            "Pagado",
            "\n",
            {
              text: `${currency(parseFloat(`${doc.ImpPagado || "0"}`))}`,
              bold: true,
            },
          ],
          style: "tableCell",
          alignment: "left",
        },
        {
          text: [
            "Saldo insoluto",
            "\n",
            {
              text: `${currency(parseFloat(`${doc.ImpSaldoInsoluto || "0"}`))}`,
              bold: true,
            },
          ],
          style: "tableCell",
          alignment: "left",
        }
      ],
      getImpuestosDR(doc)
    );
  })
  
  return {
    widths: ["*", "*", "*", "*", "*", "*"],
    body
  };
}

const getImpuestosDR = (value: PagosPagoDoctoRelacionadoType) => {

  let ListRetencionesDR: any[] = [];
  let ListTrasladosDR: any[] = [];
  if (!!value.ImpuestosDR) {
    ListRetencionesDR = value.ImpuestosDR.RetencionesDR.map((ret) => [
      {
        text: `Impuesto: ${ret.ImpuestoDR} - ${searchOption(ret.ImpuestoDR || "", CatalogEnum.Impuesto)?.description} TipoFactor: ${ret.TipoFactorDR} Base: ${ret.BaseDR} TasaOCuota: ${ret.TasaOCuotaDR || ''} Importe: ${ret.ImporteDR || ''}`,
        alignment: "left",
        fontSize: 4
      }
    ]);

    ListTrasladosDR = value.ImpuestosDR.TrasladosDR.map((tras) => [
      {
        text: `Impuesto: ${tras.ImpuestoDR} - ${searchOption(tras.ImpuestoDR || "", CatalogEnum.Impuesto)?.description} TipoFactor: ${tras.TipoFactorDR} Base: ${tras.BaseDR} TasaOCuota: ${tras.TasaOCuotaDR || ''} Importe: ${tras.ImporteDR || ''}`,
        alignment: "left",
        fontSize: 4
      }
    ]);
  }

  return [
    {
      colSpan: 6,
      layout: pdfmakeSubTableLayout,
      table: {
        widths: ["*"],
        body: [
          [
            {
              text: [
                {
                  text: "Documentos Relacionados - Impuestos",
                },
              ],
              alignment: "center",
            },
          ],
          ListRetencionesDR.length ? [
            {
              text: `Impuesto Retenidos`,
              alignment: "left",
              fontSize: 4
            }
          ] : [{}],
          ...ListRetencionesDR,
          ListTrasladosDR.length ? [
            {
              text: `Impuesto Trasladados`,
              alignment: "left",
              fontSize: 4
            }
          ] : [{}],
          ...ListTrasladosDR
        ]
      }
    }, {}, {}, {}, {}, {}
  ]
}