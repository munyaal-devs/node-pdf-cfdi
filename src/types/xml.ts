import { 
    AttributesComprobanteConceptoElement,
    AttributesComprobanteEmisorElement ,
    AttributesComprobanteImpuestosElement,
    AttributesComprobanteReceptorElement,
    AttributesComprobanteInformacionGlobalElement,
    AttributesComprobanteConceptoParteElement,
    AttributesComprobanteConceptoCuentaPredialElement,
    AttributesComprobanteConceptoInformacionAduaneraElement,
    AttributesComprobanteConceptoACuentaTercerosElement,
    AttributesComprobanteConceptoImpuestosTrasladosTrasladoElement,
    AttributesComprobanteConceptoImpuestosRetencionesRetencionElement,
    AttributesComprobanteCfdiRelacionadosConCfdiRelacionadoElement,
} from "./index";

export type ComprobanteJson = {
InformacionGlobal?: AttributesComprobanteInformacionGlobalElement;
CfdiRelacionados: ComprobanteCfdiRelacionados[];
Emisor: AttributesComprobanteEmisorElement;
Receptor: AttributesComprobanteReceptorElement;
Conceptos: AttributesComprobanteConceptoElement[];
Impuestos?: AttributesComprobanteImpuestosElement;
Complemento: ComprobanteComplemento;
Version: string;
Serie?: string;
Folio?: string;
Fecha: string;
Sello?: string;
FormaPago?: string;
NoCertificado?: string;
Certificado?: string;
CondicionesDePago?: string;
SubTotal: string;
Descuento?: string;
Moneda: string;
TipoCambio?: string;
Total: string;
TipoDeComprobante: string;
Exportacion: string;
MetodoPago?: string;
LugarExpedicion: string;
Confirmacion?: string;
}

type ComprobanteComplemento = {
    Impuestos?: ComprobanteConceptoImpuestos;
    ACuentaTerceros?: AttributesComprobanteConceptoACuentaTercerosElement;
    InformacionAduanera: AttributesComprobanteConceptoInformacionAduaneraElement[];
    CuentaPredial: AttributesComprobanteConceptoCuentaPredialElement[];
    Parte: AttributesComprobanteConceptoParteElement[];
    ComplementoConcepto?: ComprobanteConceptoComplementoConcepto;
    ClaveProdServ: string;
    NoIdentificacion?: string;
    Cantidad: string;
    ClaveUnidad: string;
    Unidad?: string;
    Descripcion: string;
    ValorUnitario: string;
    Importe: string;
    Descuento?: string;
    ObjetoImp: string;
};

type ComprobanteConceptoImpuestos = {
    Traslados: AttributesComprobanteConceptoImpuestosTrasladosTrasladoElement[];
    Retenciones: AttributesComprobanteConceptoImpuestosRetencionesRetencionElement[];
};

type ComprobanteCfdiRelacionados = {
    TipoRelacion: string;
    CfdiRelacionado: AttributesComprobanteCfdiRelacionadosConCfdiRelacionadoElement[];
}


type ComprobanteConceptoComplementoConcepto = {
    //iedu?: Iedu
}
