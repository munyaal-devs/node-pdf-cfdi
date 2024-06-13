"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataComplement = void 0;
const getDataComplement = (complement) => {
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
                let Pagos = { ...complement[index].attributes, Pago: [] };
                if (elementCtp.length > 0) {
                    for (let j = 0; j < elementCtp.length; j++) {
                        switch (elementCtp[j].name) {
                            case "pago20:Totales":
                                Pagos.Totales = elementCtp[j].attributes;
                                break;
                            case "pago20:Pago":
                                //let ObjPagoPago = { ...elementCtp[j].attributes, DoctoRelacionado: [] } as unknown as PagosPagoType;
                                let ObjPagoPago = {
                                    RfcEmisorCtaOrd: 'BBA830831LJ2',
                                    CtaOrdenante: '0100101',
                                    TipoCadPago: '01',
                                    CertPago: '00001000000512097613',
                                    CadPago: '||1|10062024|10062024|171442|40002|BBVA MEXICO|ALEX RAFAEL PECH SANCHEZ|40|012180015959552515|PESA9909047K1|BANAMEX|JAIRO GUILLERMO,LEON/VALDEZ|40|002694904137271458|LEVJ950301Q38|hot dog|0.00|100.00|NA|NA|0|0|NA|0|0.00|00001000000512097613||',
                                    SelloPago: 'dY3uU5CTFYPpXpc10vObRJKVJiQ3odG9gR4LtqkW/pIYJDkNILSzCSm+nsf/S75GGOQ5piwdh31HhEJPxmc8jdgGOS8fowwivnhX4tsIhmdxtQb0rrJz9OGkf/BDSSLhewGVVWts6aVn+EPViUbCPEGKo8i4OfClWlDTk6Mp0dEdSf5OlxxQhjXlO89Zk4RGTtQ8Hj7lYhVX88NhWeuUb4EXkf/keCuQRahZu5N5QRh0uZyiTzt94KPyyPCcdxmvAp9wqFVB1aGCLL6lQlnBB7fdhpnw6PilzqVcfyR9Gjuw8BoM5Bskc2opVjbaZY7bdt//8RefE9vXreymtek8xg==',
                                    ...elementCtp[j].attributes,
                                    DoctoRelacionado: []
                                };
                                const elementsPagoPago = elementCtp[j].elements || [];
                                for (let k = 0; k < elementsPagoPago.length; k++) {
                                    switch (elementsPagoPago[k].name) {
                                        case 'pago20:DoctoRelacionado':
                                            const DoctoRelacionado = { ...elementsPagoPago[k].attributes };
                                            const elementsPagoPagoDoctoRela = elementsPagoPago[k].elements || [];
                                            for (let l = 0; l < elementsPagoPagoDoctoRela.length; l++) {
                                                switch (elementsPagoPagoDoctoRela[l].name) {
                                                    case 'pago20:ImpuestosDR':
                                                        const elementsPagoPagoDoctoRelaImp = elementsPagoPagoDoctoRela[l].elements || [];
                                                        if (elementsPagoPagoDoctoRelaImp.length) {
                                                            DoctoRelacionado.ImpuestosDR = { RetencionesDR: [], TrasladosDR: [] };
                                                            for (let m = 0; m < elementsPagoPagoDoctoRelaImp.length; m++) {
                                                                switch (elementsPagoPagoDoctoRelaImp[m].name) {
                                                                    case 'pago20:RetencionesDR':
                                                                        DoctoRelacionado.ImpuestosDR.TrasladosDR = elementsPagoPagoDoctoRelaImp[m].elements?.map((RetencionesDR) => {
                                                                            return { ...RetencionesDR.attributes };
                                                                        }) || [];
                                                                        break;
                                                                    case 'pago20:TrasladosDR':
                                                                        DoctoRelacionado.ImpuestosDR.TrasladosDR = elementsPagoPagoDoctoRelaImp[m].elements?.map((TrasladosDR) => {
                                                                            return { ...TrasladosDR.attributes };
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
                                            ObjPagoPago.DoctoRelacionado.push(DoctoRelacionado);
                                            break;
                                        case 'pago20:ImpuestosP':
                                            const elementsPagoPagoImpP = elementsPagoPago[k].elements || [];
                                            if (elementsPagoPagoImpP.length) {
                                                ObjPagoPago.ImpuestosP = { RetencionesP: [], TrasladosP: [] };
                                                for (let indexImp = 0; indexImp < elementsPagoPagoImpP.length; indexImp++) {
                                                    switch (elementsPagoPagoImpP[indexImp].name) {
                                                        case 'pago20:TrasladosP':
                                                            ObjPagoPago.ImpuestosP.TrasladosP = elementsPagoPagoImpP[indexImp].elements?.map((TrasladosP) => {
                                                                return { ...TrasladosP.attributes };
                                                            }) || [];
                                                            break;
                                                        case 'pago20:RetencionesP':
                                                            ObjPagoPago.ImpuestosP.RetencionesP = elementsPagoPagoImpP[indexImp].elements?.map((RetencionesP) => {
                                                                return { ...RetencionesP.attributes };
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
                                Pagos.Pago.push(ObjPagoPago);
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
};
exports.getDataComplement = getDataComplement;
