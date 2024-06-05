"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataConcept = void 0;
const getDataConcept = (ctp) => {
    var _a, _b;
    const Conceptos = [];
    for (let i = 0; i < ctp.length; i++) {
        if (ctp[i].name == "cfdi:Concepto") {
            let objctp = Object.assign({}, ctp[i].attributes);
            const elementCtpI = ctp[i].elements || [];
            if (elementCtpI.length > 0) {
                for (let j = 0; j < elementCtpI.length; j++) {
                    let ComplementoConcepto = { iedu: {} };
                    let Impuestos = { Retenciones: [], Traslados: [] };
                    const elementCtpJ = elementCtpI[j].elements || [];
                    if (elementCtpJ.length > 0) {
                        switch (elementCtpI[j].name) {
                            case "cfdi:ComplementoConcepto":
                                for (let k = 0; k < elementCtpJ.length; k++) {
                                    switch (elementCtpJ[k].name) {
                                        case "iedu:instEducativas":
                                            ComplementoConcepto.iedu = Object.assign({}, elementCtpJ[k].attributes);
                                            break;
                                        default:
                                            break;
                                    }
                                }
                                break;
                            case "cfdi:Impuestos":
                                for (let k = 0; k < elementCtpJ.length; k++) {
                                    switch (elementCtpJ[k].name) {
                                        case "cfdi:Traslados":
                                            Impuestos.Traslados = [...((_a = elementCtpJ[k].elements) === null || _a === void 0 ? void 0 : _a.map((e) => e.attributes)) || []];
                                            break;
                                        case "cfdi:Retenciones":
                                            Impuestos.Retenciones = [...((_b = elementCtpJ[k].elements) === null || _b === void 0 ? void 0 : _b.map((e) => e.attributes)) || []];
                                            break;
                                        default:
                                            break;
                                    }
                                }
                                break;
                            default:
                                break;
                        }
                        objctp = Object.assign(objctp, {
                            ComplementoConcepto,
                            Impuestos
                        });
                    }
                }
            }
            Conceptos.push(objctp);
        }
    }
    return Conceptos;
};
exports.getDataConcept = getDataConcept;
//# sourceMappingURL=getDataConcept.js.map