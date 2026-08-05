import { Element } from "xml-js";
import { ComprobanteComplementoType } from "../../types";
import { PagosType } from "../../types/childs/Complementos/Pagos/Pagos.type";
import { PagosTotalesType } from "../../types/childs/Complementos/Pagos/PagosTotales.type";
import { PagosPagoType } from "../../types/childs/Complementos/Pagos/Pago/PagosPago.type";
import { PagosPagoDoctoRelacionadoType } from "../../types/childs/Complementos/Pagos/Pago/PagosPagoDoctoRelacionado.type";
import {
    PagosPagoImpuestosDRRetencionesDRType,
} from "../../types/childs/Complementos/Pagos/Pago/Impuestos/DR/PagosPagoImpuestosDRRetencionesDR.type";
import {
    PagosPagoImpuestosDRTrasladosDRType,
} from "../../types/childs/Complementos/Pagos/Pago/Impuestos/DR/PagosPagoImpuestosDRTrasladosDR.type";
import { PagosPagoImpuestosDRType } from "../../types/childs/Complementos/Pagos/Pago/Impuestos/DR/PagosPagoImpuestosDR.type";
import { PagosPagoImpuestosPType } from "../../types/childs/Complementos/Pagos/Pago/Impuestos/P/PagosPagoImpuestosP.type";
import { findChild, findChildAttributes, getAttributes } from "./utils";

const NOMBRE_TIMBRE = "tfd:TimbreFiscalDigital";
const NOMBRE_PAGOS = "pago20:Pagos";
const NOMBRE_PAGOS_TOTALES = "pago20:Totales";
const NOMBRE_PAGOS_PAGO = "pago20:Pago";
const NOMBRE_DOCTO_RELACIONADO = "pago20:DoctoRelacionado";
const NOMBRE_IMPUESTOS_DR = "pago20:ImpuestosDR";
const NOMBRE_RETENCIONES_DR = "pago20:RetencionesDR";
const NOMBRE_TRASLADOS_DR = "pago20:TrasladosDR";
const NOMBRE_IMPUESTOS_P = "pago20:ImpuestosP";
const NOMBRE_TRASLADOS_P = "pago20:TrasladosP";
const NOMBRE_RETENCIONES_P = "pago20:RetencionesP";

/** Mapea los elementos hijo (RetencionesDR / TrasladosDR) en sus atributos. */
const parseImpuestosDR = (impuestosDrElement: Element): PagosPagoImpuestosDRType => {
    const children = impuestosDrElement.elements ?? [];

    return {
        RetencionesDR: findChildAttributes(children, NOMBRE_RETENCIONES_DR) as unknown as PagosPagoImpuestosDRRetencionesDRType[],
        TrasladosDR: findChildAttributes(children, NOMBRE_TRASLADOS_DR) as unknown as PagosPagoImpuestosDRTrasladosDRType[],
    };
};

/** Parsea un `pago20:DoctoRelacionado`, incluyendo sus `ImpuestosDR`. */
const parseDoctoRelacionado = (element: Element): PagosPagoDoctoRelacionadoType => {
    const docto: PagosPagoDoctoRelacionadoType = {
        ...getAttributes(element),
    } as unknown as PagosPagoDoctoRelacionadoType;

    const impuestosDr = findChild(element.elements, NOMBRE_IMPUESTOS_DR);
    if (impuestosDr && (impuestosDr.elements ?? []).length > 0) {
        docto.ImpuestosDR = parseImpuestosDR(impuestosDr);
    }
    return docto;
};

/** Mapea los elementos hijo (TrasladosP / RetencionesP) en sus atributos. */
const parseImpuestosP = (impuestosPElement: Element): PagosPagoImpuestosPType => {
    const children = impuestosPElement.elements ?? [];

    return {
        TrasladosP: findChildAttributes(children, NOMBRE_TRASLADOS_P),
        RetencionesP: findChildAttributes(children, NOMBRE_RETENCIONES_P),
    } as unknown as PagosPagoImpuestosPType;
};

/** Parsea un `pago20:Pago` con sus DoctoRelacionado e ImpuestosP. */
const parsePago = (element: Element): PagosPagoType => {
    const pago: PagosPagoType = {
        ...getAttributes(element),
        DoctoRelacionado: [],
    } as unknown as PagosPagoType;

    for (const child of element.elements ?? []) {
        switch (child.name) {
            case NOMBRE_DOCTO_RELACIONADO:
                pago.DoctoRelacionado.push(parseDoctoRelacionado(child));
                break;
            case NOMBRE_IMPUESTOS_P:
                if ((child.elements ?? []).length > 0) {
                    pago.ImpuestosP = parseImpuestosP(child);
                }
                break;
            default:
                break;
        }
    }

    return pago;
};

/** Parsea un `pago20:Pagos` con Totales y arreglo de Pago. */
const parsePagos = (element: Element): PagosType => {
    const pagos: PagosType = {
        ...getAttributes(element),
        Pago: [],
    } as unknown as PagosType;

    for (const child of element.elements ?? []) {
        switch (child.name) {
            case NOMBRE_PAGOS_TOTALES:
                pagos.Totales = getAttributes(child) as unknown as PagosTotalesType;
                break;
            case NOMBRE_PAGOS_PAGO:
                pagos.Pago.push(parsePago(child));
                break;
            default:
                break;
        }
    }

    return pagos;
};

export const getDataComplement = (complement: Element[]): ComprobanteComplementoType => {
    let complemento: ComprobanteComplementoType = {};

    for (const element of complement) {
        switch (element.name) {
            case NOMBRE_TIMBRE:
                complemento = {
                    ...complemento,
                    TimbreFiscalDigital: { ...getAttributes(element) },
                } as ComprobanteComplementoType;
                break;
            case NOMBRE_PAGOS:
                complemento = {
                    ...complemento,
                    Pagos: parsePagos(element),
                };
                break;
            default:
                break;
        }
    }

    return complemento;
};