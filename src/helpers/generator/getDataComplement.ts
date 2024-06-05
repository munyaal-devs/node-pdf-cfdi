import { Element } from "xml-js";
import { PagosType } from "../../types/childs/Complementos/Pagos/Pagos.type";
import { PagosTotalesType } from "../../types/childs/Complementos/Pagos/PagosTotales.type";
import { PagosPagoType } from "../../types/childs/Complementos/Pagos/Pago/PagosPago.type";
import { PagosPagoDoctoRelacionadoType } from "../../types/childs/Complementos/Pagos/Pago/PagosPagoDoctoRelacionado.type";
import { ComprobanteComplementoPagosPagoImpuestosDrTrasladosDrElement } from "../../types/elements/comprobante.complemento.pagos.pago.impuestos.dr.traslados.dr.element";
import { ComprobanteComplementoPagosPagoImpuestosDrRetencionesDrElement } from "../../types/elements/comprobante.complemento.pagos.pago.impuestos.dr.retenciones.dr.element";
import { ComprobanteComplementoPagosPagoImpuestosPTrasladoPElement } from "../../types/elements/comprobante.complemento.pagos.pago.impuestos.p.traslado.p.element";
import { ComprobanteComplementoPagosPagoImpuestosPRetencionPElement } from "../../types/elements/comprobante.complemento.pagos.pago.impuestos.p.retencion.p.element";

export const getDataComplement = (complement: Array<Element>) => {
    let Complemento = {};
    for (let index = 0; index < complement.length; index++) {
        switch (complement[index].name) {
            case "tfd:TimbreFiscalDigital":
                Complemento = Object.assign(Complemento, {
                    TimbreFiscalDigital: { ...complement[index].attributes }
                });
                break;
            case "pago20:Pagos":
                const elementCtp = complement[index].elements || [];
                // convert.elements[0].elements[index].elements || [];
                let Pagos = { ...complement[index].attributes, Pago: [] } as unknown as PagosType;
                if (elementCtp.length > 0) {
                    for (let j = 0; j < elementCtp.length; j++) {
                        switch (elementCtp[j].name) {
                            case "pago20:Totales":
                                Pagos.Totales = elementCtp[j].attributes as PagosTotalesType
                                break;
                            case "pago20:Pago":
                                let ObjPagoPago = { ...elementCtp[j].attributes, DoctoRelacionado: [] } as unknown as PagosPagoType;
                                const elementsPagoPago = elementCtp[j].elements || [];
                                for (let k = 0; k < elementsPagoPago.length; k++) {
                                    switch (elementsPagoPago[k].name) {
                                        case 'pago20:DoctoRelacionado':
                                            const DoctoRelacionado =  {...elementsPagoPago[k].attributes } as unknown as PagosPagoDoctoRelacionadoType
                                            const elementsPagoPagoDoctoRela = elementsPagoPago[k].elements || [];
                                            for (let l = 0; l < elementsPagoPagoDoctoRela.length; l++) {
                                                switch (elementsPagoPagoDoctoRela[l].name) {
                                                    case 'pago20:ImpuestosDR':
                                                        const elementsPagoPagoDoctoRelaImp = elementsPagoPagoDoctoRela[l].elements || [];
                                                        if(elementsPagoPagoDoctoRelaImp.length){
                                                            DoctoRelacionado.ImpuestosDR = { RetencionesDR: [], TrasladosDR: []};
                                                            for (let m = 0; m < elementsPagoPagoDoctoRelaImp.length; m++) {
                                                                switch (elementsPagoPagoDoctoRelaImp[m].name) {
                                                                    case 'pago20:RetencionesDR':
                                                                        DoctoRelacionado.ImpuestosDR.TrasladosDR = elementsPagoPagoDoctoRelaImp[m].elements?.map((RetencionesDR) => {
                                                                            return {...RetencionesDR.attributes} as ComprobanteComplementoPagosPagoImpuestosDrRetencionesDrElement
                                                                        }) || [];    
                                                                        break;
                                                                    case 'pago20:TrasladosDR': 
                                                                        DoctoRelacionado.ImpuestosDR.TrasladosDR = elementsPagoPagoDoctoRelaImp[m].elements?.map((TrasladosDR) => {
                                                                            return {...TrasladosDR.attributes} as ComprobanteComplementoPagosPagoImpuestosDrTrasladosDrElement
                                                                        }) || [];
                                                                        break;
                                                                    default:
                                                                        break;
                                                                }
                                                            }
                                                        }
                                                        break;
                                                
                                                    default:
                                                        break;
                                                }
                                            }
                                            ObjPagoPago.DoctoRelacionado.push(DoctoRelacionado)
                                            break;
                                        case 'pago20:ImpuestosP':
                                            const elementsPagoPagoImpP = elementsPagoPago[k].elements || [];
                                            if(elementsPagoPagoImpP.length){
                                                ObjPagoPago.ImpuestosP = { RetencionesP: [], TrasladosP: []};
                                                for (let indexImp = 0; indexImp < elementsPagoPagoImpP.length; indexImp++) {
                                                    switch (elementsPagoPagoImpP[indexImp].name) {
                                                        case 'pago20:TrasladosP':
                                                            ObjPagoPago.ImpuestosP.TrasladosP = elementsPagoPagoImpP[indexImp].elements?.map((TrasladosP) => {
                                                                return {...TrasladosP.attributes} as ComprobanteComplementoPagosPagoImpuestosPTrasladoPElement
                                                            }) || [];    
                                                            break;
                                                        case 'pago20:RetencionesP': 
                                                            ObjPagoPago.ImpuestosP.RetencionesP = elementsPagoPagoImpP[indexImp].elements?.map((RetencionesP) => {
                                                                return {...RetencionesP.attributes} as ComprobanteComplementoPagosPagoImpuestosPRetencionPElement
                                                            }) || [];
                                                            break;
                                                        default:
                                                            break;
                                                    }
                                                }
                                            }
                                            break;
                                        default:
                                            break;
                                    }                                    
                                }
                                Pagos.Pago.push(ObjPagoPago)
                                break;
                            default:
                                break;
                        }
                    }
                }

                Complemento = Object.assign(Complemento, {
                    Pagos
                });
                break;
            default:
                break;
        }
    }
    return Complemento;
}