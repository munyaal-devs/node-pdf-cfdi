import { ComprobanteConceptoImpuestosRetencionType } from "./Impuestos/ComprobanteConceptoImpuestosRetencion.type";
import { ComprobanteConceptoImpuestosTrasladoType } from "./Impuestos/ComprobanteConceptoImpuestosTraslado.type";
export type ComprobanteConceptoImpuestosType = {
    Traslados: ComprobanteConceptoImpuestosTrasladoType[];
    Retenciones: ComprobanteConceptoImpuestosRetencionType[];
};
