import { ComprobanteConceptoParteInformacionAduaneraType } from "./Parte/ComprobanteConceptoParteInformacionAduanera.type";
import { AttributesComprobanteConceptoParteElement } from "../../elements/comprobante.cfdi.concepto.parte.element";
export type ComprobanteConceptoParteType = {
    InformacionAduanera: ComprobanteConceptoParteInformacionAduaneraType;
} & AttributesComprobanteConceptoParteElement;
