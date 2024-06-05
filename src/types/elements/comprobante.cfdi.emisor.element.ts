export type AttributesComprobanteEmisorElement = {
    /**
    * Atributo requerido para registrar la Clave del Registro Federal de Contribuyentes correspondiente al
    * contribuyente emisor del comprobante.
    * */
    Rfc: string;
    /**
    * Atributo requerido para registrar el nombre, denominación o razón social del contribuyente inscrito en el RFC,
    * del emisor del comprobante.
    * */
    Nombre: string;
    /**
    * Atributo requerido para incorporar la clave del régimen del contribuyente emisor al que aplicará el efecto
    * fiscal de este comprobante.
    * RegimenFiscalEnum
    * */
    RegimenFiscal: string;
    /**
    * Atributo condicional para expresar el número de operación proporcionado por el SAT cuando se trate de un
    * comprobante a través de un PCECFDI o un PCGCFDISP.
    * */
    FacAtrAdquirente?: string;
}
