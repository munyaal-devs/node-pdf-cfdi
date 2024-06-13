import { ComprobanteCfdiRelacionadosCfdiRelacionado } from "./childs/CfdiRelacionados/ComprobanteCfdiRelacionadosCfdiRelacionado.type";
import { AttributesComprobanteCfdiRelacionadosElement } from "./elements/comprobante.cfdi.relacionados.element";
export type ComprobanteCfdiRelacionadosType = {
    CfdiRelacionado: ComprobanteCfdiRelacionadosCfdiRelacionado[];
} & AttributesComprobanteCfdiRelacionadosElement;
