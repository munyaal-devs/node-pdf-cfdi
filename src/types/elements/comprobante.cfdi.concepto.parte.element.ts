export type AttributesComprobanteConceptoParteElement = {
    /**
    * Atributo requerido para expresar la clave del producto o del servicio amparado por la presente parte. Es
    * requerido y deben utilizar las claves del catálogo de productos y servicios, cuando los conceptos que registren
    * por sus actividades correspondan con dichos conceptos.
    * ClaveProdServType
    * */
    ClaveProdServ: string;
    /**
    * Atributo opcional para expresar el número de serie, número de parte del bien o identificador del producto o del
    * servicio amparado por la presente parte. Opcionalmente se puede utilizar claves del estándar GTIN.
    * */
    NoIdentificacion?: string;
    /**
    * Atributo requerido para precisar la cantidad de bienes o servicios del tipo particular definido por la presente
    * parte.
    * */
    Cantidad: string;
    /**
    * Atributo opcional para precisar la unidad de medida propia de la operación del emisor, aplicable para la cantidad
    * expresada en la parte. La unidad debe corresponder con la descripción de la parte.
    * */
    Unidad?: string;
    /**
    * Atributo requerido para precisar la descripción del bien o servicio cubierto por la presente parte.
    * */
    Descripcion: string;
    /**
    * Atributo opcional para precisar el valor o precio unitario del bien o servicio cubierto por la presente parte.
    * No se permiten valores negativos.
    * */
    ValorUnitario?: string;
    /**
    * Atributo opcional para precisar el importe total de los bienes o servicios de la presente parte. Debe ser
    * equivalente al resultado de multiplicar la cantidad por el valor unitario expresado en la parte. No se permiten
    * valores negativos.
    * */
    Importe?: string;
}
