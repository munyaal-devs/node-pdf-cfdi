export type ComprobanteComplementoPagosPagoImpuestosDrRetencionesDrElement = {
    /**
    * Atributo requerido para señalar la base para el cálculo de la retención conforme al monto del pago, aplicable al
    * documento relacionado, la determinación de la base se realiza de acuerdo con las disposiciones fiscales vigentes.
    * No se permiten valores negativos.
    * */
    BaseDR: string;
    /**
    * Atributo requerido para señalar la clave del tipo de impuesto retenido conforme al monto del pago, aplicable al
    * documento relacionado
    * ImpuestoEnum
    * */
    ImpuestoDR: string;
    /**
    * Atributo requerido para señalar la clave del tipo de factor que se aplica a la base del impuesto
    * TipoFactorEnum
    * */
    TipoFactorDR: string;
    /**
    * Atributo requerido para señalar el valor de la tasa o cuota del impuesto que se retiene
    * */
    TasaOCuotaDR: string;
    /**
    * Atributo requerido para señalar el importe del impuesto retenido conforme al monto del pago, aplicable al
    * documento relacionado. No se permiten valores negativos
    * */
    ImporteDR: string;
}
