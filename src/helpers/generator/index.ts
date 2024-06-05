import { Element, xml2js } from "xml-js";
import { getDataComplement } from "./getDataComplement";
import { getDataConcept } from "./getDataConcept";
import { getDataRelacionados } from "./getDataRelacionados";
import { ComprobanteType } from "../../types";

export { getDataComplement } from "./getDataComplement";
export { getDataConcept } from "./getDataConcept";

export const getData = (xml: string) => {
    const convert = xml2js(xml) as Element;
    let data = {} as ComprobanteType;
    const dataCfdiRelacionados = []
    if (convert.elements && convert.elements?.length > 0) {
        data = { ...convert.elements[0].attributes } as unknown as ComprobanteType;
        if (convert.elements[0].elements) {
            for (let index = 0; index < convert.elements[0].elements.length; index++) {
                switch (convert.elements[0].elements[index].name) {
                    case "cfdi:Emisor":
                        data = Object.assign(data, {
                            Emisor: { ...convert.elements[0].elements[index].attributes }
                        });
                        break;
                    case "cfdi:Receptor":
                        data = Object.assign(data, {
                            Receptor: { ...convert.elements[0].elements[index].attributes }
                        });
                        break;
                    case "cfdi:Conceptos":
                        data = Object.assign(data, {
                            Conceptos: getDataConcept(convert.elements[0].elements[index].elements || []),
                        });
                        break;
                    case "cfdi:Impuestos":
                        const elementCtp = convert.elements[0].elements[index].elements || [];
                        let Impuestos = { } as any;
                        if (elementCtp.length > 0) {
                            for (let j = 0; j < elementCtp.length; j++) {
                                switch (elementCtp[j].name) {
                                    case "cfdi:Traslados":
                                        Impuestos = Object.assign(Impuestos, {
                                            Traslados: [...elementCtp[j].elements?.map((e) => e.attributes) || []]
                                        });
                                        break;
                                    case "cfdi:Retenciones":
                                        Impuestos = Object.assign(Impuestos, {
                                            Retenciones: [...elementCtp[j].elements?.map((e) => e.attributes) || []]
                                        });
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }
                        data = Object.assign(data, {
                            Impuestos: { ...convert.elements[0].elements[index].attributes, ...Impuestos }
                        });
                        break;
                    case "cfdi:Complemento":
                        data = Object.assign(data, {
                            Complemento: getDataComplement(convert.elements[0].elements[index].elements || [])
                        });
                        break;
                    case "cfdi:CfdiRelacionados":
                        dataCfdiRelacionados.push(convert.elements[0].elements[index])
                        break;
                    default:
                        break;
                }
            }
            data = Object.assign(data, {
                CfdiRelacionados: getDataRelacionados(dataCfdiRelacionados || []),
            });
        }

    }
    
    return data;
}

export const getUrlQr = (data: any) => {
    const folio = `${data.Complemento.TimbreFiscalDigital.UUID}`;
    const emisor = `${data.Emisor.Rfc}`;
    const receptor = `${data.Receptor.Rfc}`
    
    const totalSplit = data.Total.split('.');

    const total = `${totalSplit[0].padStart(18, '0')}.${totalSplit[1] ? totalSplit[1].padEnd(6, '0') : '0'.padEnd(6, '0')}`
    const timbre = `${data.Complemento.TimbreFiscalDigital.SelloCFD.substring(data.Complemento.TimbreFiscalDigital.SelloCFD.length - 8)}`;

    return `?id=${folio}&re=${emisor}&rr=${receptor}&tt=${total}&fe=${timbre}`
}