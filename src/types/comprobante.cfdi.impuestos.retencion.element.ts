export type AttributesComprobanteImpuestosRetencionesRetencionElement = {
    /*
    * Atributo requerido para señalar la clave del tipo de impuesto retenido.
    * */
    Impuesto: string;
    /*
    * Atributo requerido para señalar el monto del impuesto retenido. No se permiten valores negativos.
    * */
    Importe: string;
}
