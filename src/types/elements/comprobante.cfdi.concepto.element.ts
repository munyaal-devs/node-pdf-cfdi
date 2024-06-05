
export type AttributesComprobanteConceptoElement = {
    /**
    * Atributo requerido para expresar la clave del producto o del servicio amparado por el presente concepto. Es
    * requerido y deben utilizar las claves del catálogo de productos y servicios, cuando los conceptos que registren
    * por sus actividades correspondan con dichos conceptos.
    * ClaveProdServType
    * */
    ClaveProdServ: string;
    /**
    * Atributo opcional para expresar el número de parte, identificador del producto o del servicio, la clave de
    * producto o servicio, SKU o equivalente, propia de la operación del emisor, amparado por el presente concepto.
    * Opcionalmente se puede utilizar claves del estándar GTIN
    * */
    NoIdentificacion?: string;
    /**
    * Atributo requerido para precisar la cantidad de bienes o servicios del tipo particular definido por el presente
    * concepto.
    * */
    Cantidad: string;
    /**
    * Atributo requerido para precisar la clave de unidad de medida estandarizada aplicable para la cantidad
    * expresada en el concepto. La unidad debe corresponder con la descripción del concepto.
    * ClaveUnidadType
    * */
    ClaveUnidad: string;
    /**
    * Atributo opcional para precisar la unidad de medida propia de la operación del emisor, aplicable para la cantidad
    * expresada en el concepto. La unidad debe corresponder con la descripción del concepto.
    * */
    Unidad?: string;
    /**
    * Atributo requerido para precisar la descripción del bien o servicio cubierto por el presente concepto.
    * */
    Descripcion: string;
    /**
    * Atributo requerido para precisar el valor o precio unitario del bien o servicio cubierto por el presente concepto.
    * */
    ValorUnitario: string;
    /**
    * Atributo requerido para precisar el importe total de los bienes o servicios del presente concepto. Debe ser
    * equivalente al resultado de multiplicar la cantidad por el valor unitario expresado en el concepto. No se
    * permiten valores negativos.
    * */
    Importe: string;
    /**
    * Atributo opcional para representar el importe de los descuentos aplicables al concepto. No se permiten valores
    * negativos.
    * */
    Descuento?: string;
    /**
    * Atributo requerido para expresar si la operación comercial es objeto o no de impuesto.
    * ObjetoImpEnum
    * */
    ObjetoImp: string;
}
