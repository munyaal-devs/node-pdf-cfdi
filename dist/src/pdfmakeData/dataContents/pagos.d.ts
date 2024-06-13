import { Table } from "pdfmake/interfaces";
import { PagosPagoType } from "../../types/childs/Complementos/Pagos/Pago/PagosPago.type";
export declare const pagos: (Pagos: PagosPagoType[]) => {
    widths: (string | number)[];
    body: any[];
};
export declare const getPayment: (value: PagosPagoType) => Table;
