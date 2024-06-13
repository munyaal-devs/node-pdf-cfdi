import { Content, Table } from "pdfmake/interfaces";
import { pdfmakeTableConceptLayout } from "../pdfmake.config";
import { ComprobanteType } from "../types";
import { TipoComprobanteEnum } from "../utils/enums/tipo.comprobante.enum";
import { concepts, pagos } from './dataContents';

export const contents = (data: ComprobanteType): Content => {
    switch (data.TipoDeComprobante) {
        case TipoComprobanteEnum.P:
            return {
                layout: pdfmakeTableConceptLayout,
                table: pagos(data.Complemento.Pagos?.Pago || [])
            }
    
        default:
            return {
                layout: pdfmakeTableConceptLayout,
                table: concepts(data.Conceptos, parseFloat(data.Impuestos?.TotalImpuestosTrasladados || "0") != 0),
            }
    }
}