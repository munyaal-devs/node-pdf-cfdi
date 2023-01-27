export type AttributesComprobanteImpuestosElement = {
    /*
    * Atributo condicional para expresar el total de los impuestos retenidos que se desprenden de los conceptos
    * expresados en el comprobante fiscal digital por Internet. No se permiten valores negativos. Es requerido cuando
    * en los conceptos se registren impuestos retenidos.
    * */
    TotalImpuestosRetenidos?: string;
    /*
    * Atributo condicional para expresar el total de los impuestos trasladados que se desprenden de los conceptos
    * expresados en el comprobante fiscal digital por Internet. No se permiten valores negativos. Es requerido cuando
    * en los conceptos se registren impuestos trasladados.
    * */
    TotalImpuestosTrasladados?: string;
}
