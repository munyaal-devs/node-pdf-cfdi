export type ComprobanteComplementoPagoElement = {
    /**
    * Atributo requerido para expresar la fecha y hora en la que el beneficiario recibe el pago. Se expresa en la forma
    * aaaa-mm-ddThh:mm:ss, de acuerdo con la especificación ISO 8601.En caso de no contar con la hora se debe registrar
    * 12:00:00.
    * */
    FechaPago: string;
    /**
    * Atributo requerido para expresar la clave de la forma en que se realiza el pago
    * FormaPagoEnum
    * */
    FormaDePagoP: string;
    /**
    * Atributo requerido para identificar la clave de la moneda utilizada para realizar el pago conforme a la especificación
    * ISO 4217. Cuando se usa moneda nacional se registra MXN. El atributo Pagos:PagosPago:Monto debe ser expresado en la
    * moneda registrada en este atributo
    * MonedaEnum
    * */
    MonedaP: string;
    /**
    * Atributo condicional para expresar el tipo de cambio de la moneda a la fecha en que se realizó el pago. El valor debe
    * reflejar el número de pesos mexicanos que equivalen a una unidad de la divisa señalada en el atributo MonedaP.
    * Es requerido cuando el atributo MonedaP es diferente a MXN
    * */
    TipoCambioP?: string;
    /**
    * Atributo requerido para expresar el importe del pago
    * */
    Monto: string;
    /**
    * Atributo condicional para expresar el número de cheque, número de autorización, número de referencia, clave de
    * rastreo en caso de ser SPEI, línea de captura o algún número de referencia análogo que identifique la operación
    * que ampara el pago efectuado
    * */
    NumOperacion?: string;
    /**
    * Atributo condicional para expresar la clave RFC de la entidad emisora de la cuenta origen, es decir, la operadora,
    * el banco, la institución financiera, emisor de monedero electrónico, etc., en caso de ser extranjero colocar XEXX010101000,
    * considerar las reglas de obligatoriedad publicadas en la página del SAT para éste atributo de acuerdo con el catálogo catCFDI:c_FormaPago
    * */
    RfcEmisorCtaOrd?: string;
    /**
    * Atributo condicional para expresar el nombre del banco ordenante, es requerido en caso de ser extranjero.
    * Considerar las reglas de obligatoriedad publicadas en la página del SAT para éste atributo de acuerdo con el
    * catálogo catCFDI:c_FormaPago
    * */
    NomBancoOrdExt?: string;
    /**
    * Atributo condicional para incorporar el número de la cuenta con la que se realizó el pago
    * */
    CtaOrdenante?: string;
    /**
    * Atributo condicional para expresar la clave RFC de la entidad operadora de la cuenta destino, es decir, la operadora,
    * el banco, la institución financiera, emisor de monedero electrónico, etc. Considerar las reglas de obligatoriedad publicadas
    * en la página del SAT para éste atributo de acuerdo con el catálogo catCFDI:c_FormaPago
    * */
    RfcEmisorCtaBen?: string;
    /**
    * Atributo condicional para incorporar el número de cuenta en donde se recibió el pago. Considerar las reglas de
    * obligatoriedad publicadas en la página del SAT para éste atributo de acuerdo con el catálogo catCFDI:c_FormaPago
    * */
    CtaBeneficiario?: string;
    /**
    * Atributo condicional para identificar la clave del tipo de cadena de pago que genera la entidad receptora del pago.
    * Considerar las reglas de obligatoriedad publicadas en la página del SAT para éste atributo de acuerdo con el catálogo
    * catCFDI:c_FormaPago
    * TipoCadenaPagoEnum
    * */
    TipoCadPago?: string;
    /**
    * Atributo condicional que sirve para incorporar el certificado que ampara al pago, como una cadena de texto en
    * formato base 64. Es requerido en caso de que el atributo TipoCadPago contenga información
    * */
    CertPago?: string;
    /**
    * Atributo condicional para expresar la cadena original del comprobante de pago generado por la entidad emisora de la
    * cuenta beneficiaria. Es requerido en caso de que el atributo TipoCadPago contenga información
    * */
    CadPago?: string;
    /**
    * Atributo condicional para integrar el sello digital que se asocie al pago. La entidad que emite el comprobante de pago,
    * ingresa una cadena original y el sello digital en una sección de dicho comprobante, este sello digital es el que se
    * debe registrar en este atributo. Debe ser expresado como una cadena de texto en formato base 64.
    * Es requerido en caso de que el atributo TipoCadPago contenga información
    * */
    SelloPago?: string;
}
