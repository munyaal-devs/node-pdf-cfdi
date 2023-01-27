import { ClaveProdServType } from ".";
export type AttributesComprobanteConceptoParteElement = {
    ClaveProdServ: ClaveProdServType;
    NoIdentificacion?: string;
    Cantidad: string;
    Unidad?: string;
    Descripcion: string;
    ValorUnitario?: string;
    Importe?: string;
};
