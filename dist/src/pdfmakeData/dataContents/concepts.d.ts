import { Table } from "pdfmake/interfaces";
import { ComprobanteConceptoType } from "../../types";
export declare const concept: (value: ComprobanteConceptoType, withImpuestos: boolean) => Table;
export declare const concepts: (Conceptos: ComprobanteConceptoType[], withImpuestos: boolean) => Table;
