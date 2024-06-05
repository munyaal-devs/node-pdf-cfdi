import { ComprobanteType } from "../../types";
export { getDataComplement } from "./getDataComplement";
export { getDataConcept } from "./getDataConcept";
export declare const getData: (xml: string) => ComprobanteType;
export declare const getUrlQr: (data: any) => string;
