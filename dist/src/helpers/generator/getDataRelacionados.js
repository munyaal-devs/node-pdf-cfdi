"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataRelacionados = void 0;
const getDataRelacionados = (ctp) => {
    var _a;
    const Relacionados = [];
    for (let i = 0; i < ctp.length; i++) {
        if (ctp[i].name = "cfdi:CfdiRelacionados") {
            let objctp = Object.assign(Object.assign({}, ctp[i].attributes), { CfdiRelacionado: [] });
            const elementCtpI = ctp[i].elements || [];
            if (elementCtpI.length > 0) {
                for (let j = 0; j < elementCtpI.length; j++) {
                    objctp.CfdiRelacionado.push(((_a = elementCtpI[j].attributes) === null || _a === void 0 ? void 0 : _a.UUID) || '');
                }
            }
            Relacionados.push(objctp);
        }
    }
    return Relacionados;
};
exports.getDataRelacionados = getDataRelacionados;
//# sourceMappingURL=getDataRelacionados.js.map