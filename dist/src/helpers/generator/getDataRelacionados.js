"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataRelacionados = void 0;
const getDataRelacionados = (ctp) => {
    const Relacionados = [];
    for (let i = 0; i < ctp.length; i++) {
        if (ctp[i].name = "cfdi:CfdiRelacionados") {
            let objctp = { ...ctp[i].attributes, CfdiRelacionado: [] };
            const elementCtpI = ctp[i].elements || [];
            if (elementCtpI.length > 0) {
                for (let j = 0; j < elementCtpI.length; j++) {
                    objctp.CfdiRelacionado.push(elementCtpI[j].attributes?.UUID || '');
                }
            }
            Relacionados.push(objctp);
        }
    }
    return Relacionados;
};
exports.getDataRelacionados = getDataRelacionados;
