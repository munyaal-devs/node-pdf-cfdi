import { ComprobanteCfdiRelacionadosType } from "./ComprobanteCfdiRelacionados.type";
import { ComprobanteComplementoType } from "./ComprobanteComplemento.type";
import { ComprobanteConceptoType } from "./ComprobanteConcepto.type";
import { ComprobanteEmisorType } from "./ComprobanteEmisor.type";
import { ComprobanteImpuestosType } from "./ComprobanteImpuestos.type";
import { ComprobanteInformacionGlobalType } from "./ComprobanteInformacionGlobal.type";
import { ComprobanteReceptorType } from "./ComprobanteReceptor.type";
import { AttributesComprobanteElement } from "./elements/comprobante.element";

export type ComprobanteType = {

     InformacionGlobal?: ComprobanteInformacionGlobalType;

     CfdiRelacionados: ComprobanteCfdiRelacionadosType[];
    
     Emisor: ComprobanteEmisorType;
    
     Receptor: ComprobanteReceptorType;
    
     Conceptos: ComprobanteConceptoType[];
    
     Impuestos?: ComprobanteImpuestosType;
    
     Complemento: ComprobanteComplementoType;

} & AttributesComprobanteElement