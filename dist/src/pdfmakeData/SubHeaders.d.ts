import { Table } from "pdfmake/interfaces";
import { ComprobanteReceptorType, ComprobanteType } from "../types";
export declare const receptor: (Receptor: ComprobanteReceptorType) => Table;
export declare const payment: (data: ComprobanteType) => Table;
