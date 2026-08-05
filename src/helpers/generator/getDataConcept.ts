import { Element } from "xml-js";
import { ComprobanteConceptoType } from "../../types";
import { ComprobanteConceptoComplementoConceptoType } from "../../types/childs/Conceptos/Complementos/ComprobanteConceptoComplementoConcepto.type";
import { ComprobanteConceptoImpuestosType } from "../../types/childs/Conceptos/ComprobanteConceptoImpuestos.type";
import { findChild, findChildAttributes, getAttributes } from "./utils";

const NOMBRE_CONCEPTO = "cfdi:Concepto";
const NOMBRE_COMPLEMENTO_CONCEPTO = "cfdi:ComplementoConcepto";
const NOMBRE_IMPUESTOS = "cfdi:Impuestos";
const NOMBRE_IEDU = "iedu:instEducativas";
const NOMBRE_TRASLADOS = "cfdi:Traslados";
const NOMBRE_RETENCIONES = "cfdi:Retenciones";

/**
 * Parsea el `cfdi:ComplementoConcepto` de un concepto. Actualmente sólo
 * extrae el complemento educativo (`iedu:instEducativas`).
 */
const parseComplementoConcepto = (
    conceptChildren: Element[]
): ComprobanteConceptoComplementoConceptoType => {
    const complemento = findChild(conceptChildren, NOMBRE_COMPLEMENTO_CONCEPTO);
    const iedu = findChild(complemento?.elements, NOMBRE_IEDU);
    return {
        iedu: iedu ? { ...getAttributes(iedu) } : {},
    } as unknown as ComprobanteConceptoComplementoConceptoType;
};

/**
 * Parsea los `cfdi:Impuestos` de un concepto, separando Traslados / Retenciones.
 * Retorna `undefined` si no hay Traslados ni Retenciones con datos 
 */
const parseConceptoImpuestos = (
    conceptChildren: Element[]
): ComprobanteConceptoImpuestosType | undefined => {
    const impuestos = findChild(conceptChildren, NOMBRE_IMPUESTOS);
    const impuestosChildren = impuestos?.elements ?? [];

    const traslados = findChildAttributes(impuestosChildren, NOMBRE_TRASLADOS);
    const retenciones = findChildAttributes(impuestosChildren, NOMBRE_RETENCIONES);

    if (traslados.length === 0 && retenciones.length === 0) {
        return undefined;
    }

    return {
        Traslados: traslados,
        Retenciones: retenciones,
    } as unknown as ComprobanteConceptoImpuestosType;
};

export const getDataConcept = (ctp: Element[]): ComprobanteConceptoType[] => {
    const Conceptos: ComprobanteConceptoType[] = [];

    for (const concepto of ctp) {
        if (concepto.name !== NOMBRE_CONCEPTO) {
            continue;
        }

        const conceptChildren = concepto.elements ?? [];
        const hasComplemento = !!findChild(conceptChildren, NOMBRE_COMPLEMENTO_CONCEPTO);
        const impuestos = parseConceptoImpuestos(conceptChildren);

        const objctp = {
            ...getAttributes(concepto),
            ...(hasComplemento
                ? { ComplementoConcepto: parseComplementoConcepto(conceptChildren) }
                : {}),
            ...(impuestos
                ? { Impuestos: impuestos }
                : {}),
        } as unknown as ComprobanteConceptoType;

        Conceptos.push(objctp);
    }

    return Conceptos;
};