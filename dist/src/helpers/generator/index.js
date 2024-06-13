"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlQr = exports.getData = exports.getDataConcept = exports.getDataComplement = void 0;
const xml_js_1 = require("xml-js");
const getDataComplement_1 = require("./getDataComplement");
const getDataConcept_1 = require("./getDataConcept");
const getDataRelacionados_1 = require("./getDataRelacionados");
var getDataComplement_2 = require("./getDataComplement");
Object.defineProperty(exports, "getDataComplement", { enumerable: true, get: function () { return getDataComplement_2.getDataComplement; } });
var getDataConcept_2 = require("./getDataConcept");
Object.defineProperty(exports, "getDataConcept", { enumerable: true, get: function () { return getDataConcept_2.getDataConcept; } });
const getData = (xml) => {
    const convert = (0, xml_js_1.xml2js)(xml);
    let data = {};
    const dataCfdiRelacionados = [];
    if (convert.elements && convert.elements?.length > 0) {
        data = { ...convert.elements[0].attributes };
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
                            Conceptos: (0, getDataConcept_1.getDataConcept)(convert.elements[0].elements[index].elements || []),
                        });
                        break;
                    case "cfdi:Impuestos":
                        const elementCtp = convert.elements[0].elements[index].elements || [];
                        let Impuestos = {};
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
                            Complemento: (0, getDataComplement_1.getDataComplement)(convert.elements[0].elements[index].elements || [])
                        });
                        break;
                    case "cfdi:CfdiRelacionados":
                        dataCfdiRelacionados.push(convert.elements[0].elements[index]);
                        break;
                    default:
                        break;
                }
            }
            data = Object.assign(data, {
                CfdiRelacionados: (0, getDataRelacionados_1.getDataRelacionados)(dataCfdiRelacionados || []),
            });
        }
    }
    console.log(JSON.stringify(data, null, 3));
    return data;
};
exports.getData = getData;
const getUrlQr = (data) => {
    const folio = `${data.Complemento.TimbreFiscalDigital.UUID}`;
    const emisor = `${data.Emisor.Rfc}`;
    const receptor = `${data.Receptor.Rfc}`;
    const totalSplit = data.Total.split('.');
    const total = `${totalSplit[0].padStart(18, '0')}.${totalSplit[1] ? totalSplit[1].padEnd(6, '0') : '0'.padEnd(6, '0')}`;
    const timbre = `${data.Complemento.TimbreFiscalDigital.SelloCFD.substring(data.Complemento.TimbreFiscalDigital.SelloCFD.length - 8)}`;
    return `?id=${folio}&re=${emisor}&rr=${receptor}&tt=${total}&fe=${timbre}`;
};
exports.getUrlQr = getUrlQr;
