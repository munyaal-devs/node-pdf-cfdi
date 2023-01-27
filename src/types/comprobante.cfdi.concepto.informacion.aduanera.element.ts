export type AttributesComprobanteConceptoInformacionAduaneraElement = {
    /*
    * Atributo requerido para expresar el número del pedimento que ampara la importación del bien que se expresa en el
    * siguiente formato: últimos 2 dígitos del año de validación seguidos por dos espacios, 2 dígitos de la aduana de
    * despacho seguidos por dos espacios, 4 dígitos del número de la patente seguidos por dos espacios, 1 dígito que
    * corresponde al último dígito del año en curso, salvo que se trate de un pedimento consolidado iniciado en el año
    * inmediato anterior o del pedimento original de una rectificación, seguido de 6 dígitos de la numeración
    * progresiva por aduana.
    * */
    NumeroPedimento: string;
}
