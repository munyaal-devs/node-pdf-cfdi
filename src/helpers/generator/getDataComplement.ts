import { Element } from "xml-js";
export const getDataComplement = (complement: Array<Element>) =>{
    let Complemento = {};
    for (let index = 0; index < complement.length; index++) {
        switch (complement[index].name) {
            case "tfd:TimbreFiscalDigital":
                Complemento = Object.assign(Complemento, {
                        TimbreFiscalDigital: {...complement[index].attributes}
                });
                break;
            default:
                break;
        }
    }
    return Complemento;
}