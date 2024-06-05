export type ComprobanteComplementoPagosPagoImpuestosPRetencionPElement = {
    /**
    * Atributo requerido para señalar la clave del tipo de impuesto retenido conforme al monto del pago
    * ImpuestoEnum;
    * */
    ImpuestoP: string;
    /**
    * Atributo requerido para señalar el importe del impuesto retenido conforme al monto del pago. No se permiten
    * valores negativos
    * */
    ImporteP: string;
};
