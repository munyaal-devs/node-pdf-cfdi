export type AttributesComprobanteConceptoACuentaTercerosElement = {
    /**
    * Atributo requerido para registrar la Clave del Registro Federal de Contribuyentes del contribuyente Tercero, a
    * cuenta del que se realiza la operación.
    * */
    RfcACuentaTerceros: string;
    /**
    * Atributo requerido para registrar el nombre, denominación o razón social del contribuyente Tercero correspondiente
    * con el Rfc, a cuenta del que se realiza la operación.
    * */
    NombreACuentaTerceros: string;
    /**
    * Atributo requerido para incorporar la clave del régimen del contribuyente Tercero, a cuenta del que se realiza
    * la operación.
    * RegimenFiscalEnum
    * */
    RegimenFiscalACuentaTerceros: string;
    /**
    * Atributo requerido para incorporar el código postal del domicilio fiscal del Tercero, a cuenta del que se realiza
    * la operación.
    * */
    DomicilioFiscalACuentaTerceros: string;
};
