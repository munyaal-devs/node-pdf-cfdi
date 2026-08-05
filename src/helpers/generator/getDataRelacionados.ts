import { Element } from "xml-js";
import { ComprobanteCfdiRelacionadosType } from "../../types";
import { getAttributes } from "./utils";

const NOMBRE_CFDI_RELACIONADOS = "cfdi:CfdiRelacionados";
const NOMBRE_CFDI_RELACIONADO = "cfdi:CfdiRelacionado";

export const getDataRelacionados = (ctp: Element[]): ComprobanteCfdiRelacionadosType[] => {
    const Relacionados: ComprobanteCfdiRelacionadosType[] = [];

    for (const el of ctp) {
        if (el.name !== NOMBRE_CFDI_RELACIONADOS) {
            continue;
        }
        const cfdiRelacionado: string[] = (el.elements ?? []).map((child) => {
            if (child.name !== NOMBRE_CFDI_RELACIONADO) return "";
            const uuid = child.attributes?.UUID;
            return uuid != null ? `${uuid}` : "";
        });

        const objctp = {
            ...getAttributes(el),
            CfdiRelacionado: cfdiRelacionado,
        } as unknown as ComprobanteCfdiRelacionadosType;

        Relacionados.push(objctp);
    }

    return Relacionados;
};