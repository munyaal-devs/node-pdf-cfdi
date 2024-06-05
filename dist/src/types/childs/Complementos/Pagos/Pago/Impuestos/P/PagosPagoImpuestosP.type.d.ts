import { PagosPagoImpuestosPRetencionPType } from "./PagosPagoImpuestosPRetencionP.type";
import { PagosPagoImpuestosPTrasladoPType } from "./PagosPagoImpuestosPTrasladoP.type";
export type PagosPagoImpuestosPType = {
    RetencionesP: PagosPagoImpuestosPRetencionPType[];
    TrasladosP: PagosPagoImpuestosPTrasladoPType[];
};
