import { ClaveProdServType, ClaveUnidadType } from ".";
export type AttributesComprobanteConceptoElement = {
    ClaveProdServ: ClaveProdServType;
    NoIdentificacion?: string;
    Cantidad: string;
    ClaveUnidad: ClaveUnidadType;
    Unidad?: string;
    Descripcion: string;
    ValorUnitario: string;
    Importe: string;
    Descuento?: string;
    ObjetoImp: string;
};
