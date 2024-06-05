import { ComprobanteComplementoPagoElement } from "../../../../elements/comprobante.complemento.pago.element";
import { PagosPagoDoctoRelacionadoType } from "./PagosPagoDoctoRelacionado.type";
import { PagosPagoImpuestosPType } from "./Impuestos/P/PagosPagoImpuestosP.type";

export type PagosPagoType = {
    DoctoRelacionado: PagosPagoDoctoRelacionadoType[];
    ImpuestosP?: PagosPagoImpuestosPType;
} & ComprobanteComplementoPagoElement;