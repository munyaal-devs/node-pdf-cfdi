import { PagosPagoImpuestosDRRetencionesDRType } from "./PagosPagoImpuestosDRRetencionesDR.type";
import { PagosPagoImpuestosDRTrasladosDRType } from "./PagosPagoImpuestosDRTrasladosDR.type";

export type PagosPagoImpuestosDRType = {
    RetencionesDR: PagosPagoImpuestosDRRetencionesDRType[];
    TrasladosDR: PagosPagoImpuestosDRTrasladosDRType[];
}