export type ComprobanteComplementoPagosPagoImpuestosPTrasladoPElement = {
    /**
    * Atributo requerido para señalar la suma de los atributos BaseDR de los documentos relacionados del impuesto
    * trasladado. No se permiten valores negativos
    * */
    BaseP: string;
    /**
    * Atributo requerido para señalar la clave del tipo de impuesto trasladado conforme al monto del pago
    * ImpuestoEnum
    * */
    ImpuestoP: string;
    /**
    * Atributo requerido para señalar la clave del tipo de factor que se aplica a la base del impuesto
    * TipoFactorEnum
    * */
    TipoFactorP: string;
    /**
    * Atributo condicional para señalar el valor de la tasa o cuota del impuesto que se traslada en los documentos
    * relacionados
    * */
    TasaOCuotaP?: string;
    /**
    * Atributo condicional para señalar la suma del impuesto trasladado, agrupado por ImpuestoP, TipoFactorP y
    * TasaOCuotaP. No se permiten valores negativos
    * */
    ImporteP?: string;
};
