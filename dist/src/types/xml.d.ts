import { ConceptoComplementoIeduElement } from "../complements";
import { AttributesComprobanteEmisorElement, AttributesComprobanteReceptorElement, AttributesComprobanteInformacionGlobalElement, AttributesComprobanteConceptoImpuestosTrasladosTrasladoElement, AttributesComprobanteConceptoImpuestosRetencionesRetencionElement, AttributesComprobanteCfdiRelacionadosConCfdiRelacionadoElement } from "./index";
export type ComprobanteJson = {
    InformacionGlobal?: AttributesComprobanteInformacionGlobalElement;
    CfdiRelacionados: ComprobanteCfdiRelacionados[];
    Emisor: AttributesComprobanteEmisorElement;
    Receptor: AttributesComprobanteReceptorElement;
    Conceptos: ComprobanteConcepto[];
    Impuestos?: any;
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
};
export type ComprobanteComplemento = {
    TimbreFiscalDigital: ComplementoTimbreFiscal;
};
export type ComplementoTimbreFiscal = {
    Version: string;
    UUID: string;
    FechaTimbrado: string;
    RfcProvCertif: string;
    SelloCFD: string;
    NoCertificadoSAT: string;
    SelloSAT: string;
};
export type ComprobanteConcepto = {
    Impuestos?: ComprobanteConceptoImpuestos;
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
export type ComprobanteConceptoImpuestos = {
    Traslados: AttributesComprobanteConceptoImpuestosTrasladosTrasladoElement[];
    Retenciones: AttributesComprobanteConceptoImpuestosRetencionesRetencionElement[];
};
export type ComprobanteCfdiRelacionados = {
    TipoRelacion: string;
    CfdiRelacionado: AttributesComprobanteCfdiRelacionadosConCfdiRelacionadoElement[];
};
export type ComprobanteConceptoComplementoConcepto = {
    iedu?: ConceptoComplementoIeduElement;
};
