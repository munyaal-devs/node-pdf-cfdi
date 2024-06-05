"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataComplement = void 0;
const getDataComplement = (complement) => {
    var _a, _b, _c, _d;
    let Complemento = {};
    for (let index = 0; index < complement.length; index++) {
        switch (complement[index].name) {
            case "tfd:TimbreFiscalDigital":
                Complemento = Object.assign(Complemento, {
                    TimbreFiscalDigital: Object.assign({}, complement[index].attributes)
                });
                break;
            case "pago20:Pagos":
                const elementCtp = complement[index].elements || [];
                // convert.elements[0].elements[index].elements || [];
                let Pagos = Object.assign(Object.assign({}, complement[index].attributes), { Pago: [] });
                if (elementCtp.length > 0) {
                    for (let j = 0; j < elementCtp.length; j++) {
                        switch (elementCtp[j].name) {
                            case "pago20:Totales":
                                Pagos.Totales = elementCtp[j].attributes;
                                break;
                            case "pago20:Pago":
                                let ObjPagoPago = Object.assign(Object.assign({}, elementCtp[j].attributes), { DoctoRelacionado: [] });
                                const elementsPagoPago = elementCtp[j].elements || [];
                                for (let k = 0; k < elementsPagoPago.length; k++) {
                                    switch (elementsPagoPago[k].name) {
                                        case 'pago20:DoctoRelacionado':
                                            const DoctoRelacionado = Object.assign({}, elementsPagoPago[k].attributes);
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
                                                                        DoctoRelacionado.ImpuestosDR.TrasladosDR = ((_a = elementsPagoPagoDoctoRelaImp[m].elements) === null || _a === void 0 ? void 0 : _a.map((RetencionesDR) => {
                                                                            return Object.assign({}, RetencionesDR.attributes);
                                                                        })) || [];
                                                                        break;
                                                                    case 'pago20:TrasladosDR':
                                                                        DoctoRelacionado.ImpuestosDR.TrasladosDR = ((_b = elementsPagoPagoDoctoRelaImp[m].elements) === null || _b === void 0 ? void 0 : _b.map((TrasladosDR) => {
                                                                            return Object.assign({}, TrasladosDR.attributes);
                                                                        })) || [];
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
                                                            ObjPagoPago.ImpuestosP.TrasladosP = ((_c = elementsPagoPagoImpP[indexImp].elements) === null || _c === void 0 ? void 0 : _c.map((TrasladosP) => {
                                                                return Object.assign({}, TrasladosP.attributes);
                                                            })) || [];
                                                            break;
                                                        case 'pago20:RetencionesP':
                                                            ObjPagoPago.ImpuestosP.RetencionesP = ((_d = elementsPagoPagoImpP[indexImp].elements) === null || _d === void 0 ? void 0 : _d.map((RetencionesP) => {
                                                                return Object.assign({}, RetencionesP.attributes);
                                                            })) || [];
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
//# sourceMappingURL=getDataComplement.js.map