"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlQr = exports.getData = exports.getDataConcept = exports.getDataComplement = void 0;
const xml_js_1 = require("xml-js");
const getDataComplement_1 = require("./getDataComplement");
const getDataConcept_1 = require("./getDataConcept");
var getDataComplement_2 = require("./getDataComplement");
Object.defineProperty(exports, "getDataComplement", { enumerable: true, get: function () { return getDataComplement_2.getDataComplement; } });
var getDataConcept_2 = require("./getDataConcept");
Object.defineProperty(exports, "getDataConcept", { enumerable: true, get: function () { return getDataConcept_2.getDataConcept; } });
const getData = (xml) => {
    let data = {};
    const convert = (0, xml_js_1.xml2js)(xml);
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
                        data = Object.assign(data, {
                            Impuestos: { ...convert.elements[0].elements[index].attributes }
                        });
                        const elementCtp = convert.elements[0].elements[index].elements || [];
                        if (elementCtp.length > 0) {
                            for (let j = 0; j < elementCtp.length; j++) {
                                switch (elementCtp[j].name) {
                                    case "cfdi:Traslados":
                                        data = Object.assign(data, {
                                            Impuestos: {
                                                Traslados: [...elementCtp[j].elements?.map((e) => e.attributes) || []]
                                            }
                                        });
                                        break;
                                    case "cfdi:Retenciones":
                                        data = Object.assign(data, {
                                            Impuestos: {
                                                Retenciones: [...elementCtp[j].elements?.map((e) => e.attributes) || []]
                                            }
                                        });
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }
                        break;
                    case "cfdi:Complemento":
                        data = Object.assign(data, {
                            Complemento: (0, getDataComplement_1.getDataComplement)(convert.elements[0].elements[index].elements || [])
                        });
                        break;
                    default:
                        break;
                }
            }
        }
    }
    return data;
};
exports.getData = getData;
const getUrlQr = (data) => {
    let url = `?id=${data.Complemento.TimbreFiscalDigital.UUID}&re=${data.Emisor.Rfc}&rr=${data.Receptor.Rfc}`;
    const totalSplit = data.Total.split('.');
    url = `${url}&tt=${totalSplit[0].padStart(18, '0')}.${totalSplit[1] ? totalSplit[1].padEnd(6, '0') : '0'.padEnd(6, '0')}`;
    url = `${url}&fe=${data.Complemento.TimbreFiscalDigital.SelloCFD.substring(data.Complemento.TimbreFiscalDigital.SelloCFD.length - 8)}`;
    url += url;
    return url;
};
exports.getUrlQr = getUrlQr;
