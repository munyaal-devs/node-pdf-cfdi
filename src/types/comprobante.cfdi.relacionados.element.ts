export type AttributesComprobanteCfdiRelacionadosElement = {
    /*
    * Atributo requerido para indicar la clave de la relación que existe entre éste que se está generando y el o los
    * CFDI previos
    * */
    TipoRelacion: string;
}

export type AttributesComprobanteCfdiRelacionadosConCfdiRelacionadoElement =
    AttributesComprobanteCfdiRelacionadosElement
    & {
    /*
    * Atributo requerido para registrar el folio fiscal (UUID) de los CFDIs relacionados con el presente comprobante
    * */
    CfdiRelacionado: string[];
}
