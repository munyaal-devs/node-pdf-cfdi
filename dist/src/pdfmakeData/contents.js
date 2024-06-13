"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contents = void 0;
const pdfmake_config_1 = require("../pdfmake.config");
const tipo_comprobante_enum_1 = require("../utils/enums/tipo.comprobante.enum");
const dataContents_1 = require("./dataContents");
const contents = (data) => {
    switch (data.TipoDeComprobante) {
        case tipo_comprobante_enum_1.TipoComprobanteEnum.P:
            return {
                layout: pdfmake_config_1.pdfmakeTableConceptLayout,
                table: (0, dataContents_1.pagos)(data.Complemento.Pagos?.Pago || [])
            };
        default:
            return {
                layout: pdfmake_config_1.pdfmakeTableConceptLayout,
                table: (0, dataContents_1.concepts)(data.Conceptos, parseFloat(data.Impuestos?.TotalImpuestosTrasladados || "0") != 0),
            };
    }
};
exports.contents = contents;
