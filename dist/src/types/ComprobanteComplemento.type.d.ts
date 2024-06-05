import { PagosType } from "./childs/Complementos/Pagos/Pagos.type";
import { TimbreFiscalDigitalType } from "./childs/Complementos/TimbreFiscalDigital.type";
export type ComprobanteComplementoType = {
    Pagos?: PagosType;
    TimbreFiscalDigital?: TimbreFiscalDigitalType;
};
