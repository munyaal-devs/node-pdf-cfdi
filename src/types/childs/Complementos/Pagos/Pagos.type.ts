import { PagosPagoType } from "./Pago/PagosPago.type";
import { PagosTotalesType } from "./PagosTotales.type";

export type PagosType = {
    Version: string;
    Totales: PagosTotalesType;
    Pago: PagosPagoType[];
}