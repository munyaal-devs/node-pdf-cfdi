import { Content, Table } from "pdfmake/interfaces";
import { ComprobanteEmisorType } from "../types";
export declare const getLogo: (path: string) => string | undefined;
export declare const emisor: (Emisor: ComprobanteEmisorType, NoCertificado: string) => Content;
export declare const folio: (data: {
    TipoDeComprobante: string;
    Serie: string;
    Folio: string;
    LugarExpedicion: string;
    Fecha: string;
    VersionPago?: string;
}) => Table;
