import { ComprobanteConceptoACuentaTercerosType } from "./childs/Conceptos/ComprobanteConceptoACuentaTerceros.type";
import { ComprobanteConceptoComplementoConceptoType } from "./childs/Conceptos/Complementos/ComprobanteConceptoComplementoConcepto.type";
import { ComprobanteConceptoCuentaPredialType } from "./childs/Conceptos/ComprobanteConceptoCuentaPredial.type";
import { ComprobanteConceptoImpuestosType } from "./childs/Conceptos/ComprobanteConceptoImpuestos.type";
import { ComprobanteConceptoInformacionAduaneraType } from "./childs/Conceptos/ComprobanteConceptoInformacionAduanera.type";
import { ComprobanteConceptoParteType } from "./childs/Conceptos/ComprobanteConceptoParte.type";
import { AttributesComprobanteConceptoElement } from "./elements/comprobante.cfdi.concepto.element";
export type ComprobanteConceptoType = {
    Impuestos?: ComprobanteConceptoImpuestosType;
    ACuentaTerceros?: ComprobanteConceptoACuentaTercerosType;
    InformacionAduanera: ComprobanteConceptoInformacionAduaneraType[];
    CuentaPredial: ComprobanteConceptoCuentaPredialType[];
    Parte: ComprobanteConceptoParteType[];
    ComplementoConcepto?: ComprobanteConceptoComplementoConceptoType;
} & AttributesComprobanteConceptoElement;
