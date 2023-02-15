import { Element } from "xml-js";

export const getDataRelacionados = (ctp: Element[]) => {
    const Relacionados: any[] = [];
    for (let i = 0; i < ctp.length; i++) {
        if (ctp[i].name = "cfdi:CfdiRelacionados") {
            let objctp = {...ctp[i].attributes, CfdiRelacionado: []} as any;
            const elementCtpI = ctp[i].elements || [];
            if (elementCtpI.length > 0) {
                for (let j = 0; j < elementCtpI.length; j++) {
                    objctp.CfdiRelacionado.push(elementCtpI[j].attributes?.UUID || '')            
                }
            }
            Relacionados.push(objctp);
        }
    }

    return Relacionados;
}