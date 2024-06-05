export type AttributesComprobanteImpuestosTrasladosTrasladoElement = {
    /**
    * Atributo requerido para señalar la suma de los atributos Base de los conceptos del impuesto trasladado. No se
    * permiten valores negativos.
    * */
    Base: string;
    /**
    * Atributo requerido para señalar la clave del tipo de impuesto trasladado.
    * ImpuestoEnum
    * */
    Impuesto: string;
    /**
    * Atributo requerido para señalar la clave del tipo de factor que se aplica a la base del impuesto.
    * TipoFactorEnum
    * */
    TipoFactor: string;
    /**
    * Atributo condicional para señalar el valor de la tasa o cuota del impuesto que se traslada por los conceptos
    * amparados en el comprobante.
    * */
    TasaOCuota?: string;
    /**
    * Atributo condicional para señalar la suma del importe del impuesto trasladado, agrupado por impuesto, TipoFactor
    * y TasaOCuota. No se permiten valores negativos.
    * */
    Importe?: string;
}
