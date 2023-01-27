import { CodigoPostalType } from "./codigo.postal.type";
export type AttributesComprobanteReceptorElement = {
    Rfc: string;
    Nombre: string;
    DomicilioFiscalReceptor: CodigoPostalType;
    ResidenciaFiscal?: string;
    NumRegIdTrib?: string;
    RegimenFiscalReceptor: string;
    UsoCFDI: string;
};
