export type ComprobanteComplementoPagosTotalesElement = {
    /**
    * Atributo condicional para expresar el total de los impuestos retenidos de IVA que se desprenden de los pagos.
    * No se permiten valores negativos
    * */
    TotalRetencionesIVA?: string;
    /**
    * Atributo condicional para expresar el total de los impuestos retenidos de ISR que se desprenden de los pagos.
    * No se permiten valores negativos
    * */
    TotalRetencionesISR?: string;
    /**
    * Atributo condicional para expresar el total de los impuestos retenidos de IEPS que se desprenden de los pagos.
    * No se permiten valores negativos.
    * */
    TotalRetencionesIEPS?: string;
    /**
    * Atributo condicional para expresar el total de la base de IVA trasladado a la tasa del 16% que se desprende de los pagos.
    * No se permiten valores negativos.
    * */
    TotalTrasladosBaseIVA16?: string;
    /**
    * Atributo condicional para expresar el total de los impuestos de IVA trasladado a la tasa del 16% que se desprenden de los pagos.
    * No se permiten valores negativos
    * */
    TotalTrasladosImpuestoIVA16?: string;
    /**
    * Atributo condicional para expresar el total de la base de IVA trasladado a la tasa del 8% que se desprende de los pagos.
    * No se permiten valores negativos.
    * */
    TotalTrasladosBaseIVA8?: string;
    /**
    * Atributo condicional para expresar el total de los impuestos de IVA trasladado a la tasa del 8% que se desprenden de los pagos.
    * No se permiten valores negativos.
    * */
    TotalTrasladosImpuestoIVA8?: string;
    /**
    * Atributo condicional para expresar el total de la base de IVA trasladado a la tasa del 0% que se desprende de los pagos.
    * No se permiten valores negativos
    * */
    TotalTrasladosBaseIVA0?: string;
    /**
    * Atributo condicional para expresar el total de los impuestos de IVA trasladado a la tasa del 0% que se desprenden de los pagos.
    * No se permiten valores negativos
    * */
    TotalTrasladosImpuestoIVA0?: string;
    /**
    * Atributo condicional para expresar el total de la base de IVA trasladado exento que se desprende de los pagos.
    * No se permiten valores negativos.
    * */
    TotalTrasladosBaseIVAExento?: string;
    /**
    * Atributo requerido para expresar el total de los pagos que se desprenden de los nodos PagosPago.
    * No se permiten valores negativos
    * */
    MontoTotalPagos: string;
};
