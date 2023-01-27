export type AttributesComprobanteCfdiRelacionadosCfdiRelacionadoElement = {
    /*
    * Atributo requerido para registrar el folio fiscal (UUID) de un CFDI relacionado con el presente comprobante, por
    * ejemplo: Si el CFDI relacionado es un comprobante de traslado que sirve para registrar el movimiento de la
    * mercancía. Si este comprobante se usa como nota de crédito o nota de débito del comprobante relacionado. Si este
    * comprobante es una devolución sobre el comprobante relacionado. Si éste sustituye a una factura cancelada.
    * */
    UUID: string;
}
