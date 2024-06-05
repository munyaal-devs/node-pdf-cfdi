export type AttributesComprobanteConceptoImpuestosTrasladosTrasladoElement = {
    /**
    * Atributo requerido para señalar la base para el cálculo del impuesto, la determinación de la base se realiza de
    * acuerdo con las disposiciones fiscales vigentes. No se permiten valores negativos.
    * */
    Base: string;
    /**
    * Atributo requerido para señalar la clave del tipo de impuesto trasladado aplicable al concepto.
    * ImpuestoEnum
    * */
    Impuesto: string;
    /**
    * Atributo requerido para señalar la clave del tipo de factor que se aplica a la base del impuesto.
    * TipoFactorEnum
    * */
    TipoFactor: string;
    /**
    * Atributo condicional para señalar el valor de la tasa o cuota del impuesto que se traslada para el presente
    * concepto. Es requerido cuando el atributo TipoFactor tenga una clave que corresponda a Tasa o Cuota.
    * */
    TasaOCuota?: string;
    /**
    * Atributo condicional para señalar el importe del impuesto trasladado que aplica al concepto. No se permiten
    * valores negativos. Es requerido cuando TipoFactor sea Tasa o Cuota.
    * */
    Importe?: string;
};
