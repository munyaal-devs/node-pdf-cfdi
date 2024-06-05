export type AttributesComprobanteReceptorElement = {
    /**
    * Atributo requerido para registrar la Clave del Registro Federal de Contribuyentes correspondiente al contribuyente
    * receptor del comprobante.
    * */
    Rfc: string;
    /**
    * Atributo requerido para registrar el nombre(s), primer apellido, segundo apellido, según corresponda, denominación
    * o razón social del contribuyente, inscrito en el RFC, del receptor del comprobante.
    * */
    Nombre: string;
    /**
    * Atributo requerido para registrar el código postal del domicilio fiscal del receptor del comprobante.
    * */
    DomicilioFiscalReceptor: string;
    /**
    * Atributo condicional para registrar la clave del país de residencia para efectos fiscales del receptor del
    * comprobante, cuando se trate de un extranjero, y que es conforme con la especificación ISO 3166-1 alpha-3.
    * Es requerido cuando se incluya el complemento de comercio exterior o se registre el atributo NumRegIdTrib.
    * PaisEnum
    * */
    ResidenciaFiscal?: string;
    /**
    * Atributo condicional para expresar el número de registro de identidad fiscal del receptor cuando sea residente en
    * el extranjero. Es requerido cuando se incluya el complemento de comercio exterior.
    * */
    NumRegIdTrib?: string;
    /**
    * Atributo requerido para incorporar la clave del régimen fiscal del contribuyente receptor al que aplicará el
    * efecto fiscal de este comprobante.
    * RegimenFiscalEnum
    * */
    RegimenFiscalReceptor: string;
    /**
    * Atributo requerido para expresar la clave del uso que dará a esta factura el receptor del CFDI.
    * UsoCfdiEnum
    * */
    UsoCFDI: string;
};
