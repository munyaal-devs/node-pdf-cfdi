import { Element, xml2js } from "xml-js";
import { getDataComplement } from "./getDataComplement";
import { getDataConcept } from "./getDataConcept";
import { getDataRelacionados } from "./getDataRelacionados";
import { findChild, findChildAttributes, getAttributes } from "./utils";
import { ComprobanteImpuestosType, ComprobanteType } from "../../types";
import { AttributesComprobanteImpuestosElement } from "../../types/elements/comprobante.cfdi.impuestos.element";

export { getDataComplement } from "./getDataComplement";
export { getDataConcept } from "./getDataConcept";

/**
 * Parsea el nodo `cfdi:Impuestos` del comprobante, conservando sus
 * atributos y separando Traslados / Retenciones.
 */
const parseImpuestos = (element: Element): ComprobanteImpuestosType => {
    const children = element.elements ?? [];

    return {
        ...(getAttributes(element) as AttributesComprobanteImpuestosElement),
        Traslados: findChildAttributes(children, "cfdi:Traslados"),
        Retenciones: findChildAttributes(children, "cfdi:Retenciones"),
    } as ComprobanteImpuestosType;
};

export const getData = (xml: string): ComprobanteType => {
    const convert = xml2js(xml) as Element;
    const root = convert.elements?.[0];

    let data = {} as ComprobanteType;

    if (!root) {
        return data;
    }

    data = { ...getAttributes(root) } as unknown as ComprobanteType;

    const relacionados: Element[] = [];

    for (const child of root.elements ?? []) {
        switch (child.name) {
            case "cfdi:Emisor":
                data = { ...data, Emisor: { ...getAttributes(child) } } as ComprobanteType;
                break;
            case "cfdi:Receptor":
                data = { ...data, Receptor: { ...getAttributes(child) } } as ComprobanteType;
                break;
            case "cfdi:Conceptos":
                data = {
                    ...data,
                    Conceptos: getDataConcept(child.elements ?? []),
                } as ComprobanteType;
                break;
            case "cfdi:Impuestos":
                data = { ...data, Impuestos: parseImpuestos(child) } as ComprobanteType;
                break;
            case "cfdi:Complemento":
                data = {
                    ...data,
                    Complemento: getDataComplement(child.elements ?? []),
                } as ComprobanteType;
                break;
            case "cfdi:CfdiRelacionados":
                relacionados.push(child);
                break;
            default:
                break;
        }
    }

    data = {
        ...data,
        CfdiRelacionados: getDataRelacionados(relacionados),
    } as ComprobanteType;

    return data;
};

export const getUrlQr = (data: ComprobanteType): string => {
    const folio = `${data.Complemento?.TimbreFiscalDigital?.UUID ?? ""}`;
    const emisor = `${data.Emisor?.Rfc ?? ""}`;
    const receptor = `${data.Receptor?.Rfc ?? ""}`;

    // `Total` puede ser undefined o vacío (comprobantes tipo "P"); en ese caso
    // usamos "0" como total para no romper el armado de la URL.
    const rawTotal = data.Total ?? "0";
    const totalValue = rawTotal === "" ? "0" : rawTotal;
    const totalSplit = totalValue.split(".");
    const parteEntera = `${totalSplit[0]}`.padStart(18, "0");
    const parteDecimal = totalSplit[1] ? `${totalSplit[1]}`.padEnd(6, "0") : "0".padEnd(6, "0");
    const total = `${parteEntera}.${parteDecimal}`;

    const sello = `${data.Complemento?.TimbreFiscalDigital?.SelloCFD ?? ""}`;
    const timbre = sello.substring(sello.length - 8);

    return `?id=${folio}&re=${emisor}&rr=${receptor}&tt=${total}&fe=${timbre}`;
};