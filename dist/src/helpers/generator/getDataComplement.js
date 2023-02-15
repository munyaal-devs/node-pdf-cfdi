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
            default:
                break;
        }
    }
    return Complemento;
};
exports.getDataComplement = getDataComplement;
