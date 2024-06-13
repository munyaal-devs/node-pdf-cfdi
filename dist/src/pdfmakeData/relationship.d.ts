import { Table } from "pdfmake/interfaces";
import { ComprobanteCfdiRelacionadosType } from "../types";
export declare const relationship: (value: ComprobanteCfdiRelacionadosType) => Table;
export declare const relationships: (CfdiRelacionados: ComprobanteCfdiRelacionadosType[]) => Table;
