import { ComprobanteImpuestosRetencionType } from "./childs/Impuestos/ComprobanteImpuestosRetencion.type";
import { ComprobanteImpuestosTrasladoType } from "./childs/Impuestos/ComprobanteImpuestosTraslado.type";
import { AttributesComprobanteImpuestosElement } from "./elements/comprobante.cfdi.impuestos.element";

export type ComprobanteImpuestosType = {
    Traslados: ComprobanteImpuestosTrasladoType[];
    Retenciones: ComprobanteImpuestosRetencionType[];
} & AttributesComprobanteImpuestosElement;