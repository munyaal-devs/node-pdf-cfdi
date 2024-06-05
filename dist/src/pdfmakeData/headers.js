"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.folio = exports.emisor = exports.getLogo = void 0;
const cfdi_catalogs_1 = require("@munyaal/cfdi-catalogs");
const fs_1 = require("fs");
const tipo_comprobante_enum_1 = require("../utils/enums/tipo.comprobante.enum");
const getLogo = (path) => {
    try {
        const logo = (0, fs_1.readFileSync)(`${path}`);
        return `data:image/jpg;base64, ${logo.toString("base64")}`;
    }
    catch (e) {
        console.error({
            status: "ERROR: 001",
            process: "No se pudo obtener el archivo",
            solutions: [`Valida la existencia del archivo ${path}`],
            error: e,
        });
        return undefined;
    }
};
exports.getLogo = getLogo;
const emisor = (Emisor, NoCertificado) => {
    var _a;
    return [
        { text: `${Emisor.Nombre}`, bold: true, fontSize: 10 },
        "\n",
        "RFC: ",
        { text: `${Emisor.Rfc}`, bold: true },
        "\n\n",
        { text: "Régimen fiscal: " },
        {
            text: `${Emisor.RegimenFiscal} - ${(_a = (0, cfdi_catalogs_1.searchOption)(Emisor.RegimenFiscal, cfdi_catalogs_1.CatalogEnum.RegimenFiscal)) === null || _a === void 0 ? void 0 : _a.description}`,
            bold: true,
        },
        "\n",
        { text: "Número de certificado: " },
        {
            text: `${NoCertificado}`,
            bold: true,
        },
    ];
};
exports.emisor = emisor;
const folio = (data) => {
    var _a;
    const { TipoDeComprobante, Folio, Serie, Fecha, LugarExpedicion, VersionPago } = data;
    let labelTipoComprobante = TipoDeComprobante == tipo_comprobante_enum_1.TipoComprobanteEnum.P
        ? `Recibo electrónico de pagos ${VersionPago}`
        : `CFDI de ${(_a = (0, cfdi_catalogs_1.searchOption)(TipoDeComprobante, cfdi_catalogs_1.CatalogEnum.TipoDeComprobante)) === null || _a === void 0 ? void 0 : _a.description}`;
    return {
        widths: ["*", "*"],
        body: [
            [
                {
                    text: labelTipoComprobante,
                    alignment: "center",
                    style: "tableCell",
                    marginTop: 0.15,
                    colSpan: 2,
                    bold: true,
                },
                {},
            ],
            [
                {
                    text: ["Serie", "\n", { text: `${Serie}`, bold: true }],
                    style: "tableCell",
                    alignment: "left",
                },
                {
                    text: [
                        { text: "Folio", style: "tableCell" },
                        "\n",
                        { text: `${Folio}`, bold: true },
                    ],
                    style: "tableCell",
                    alignment: "left",
                },
            ],
            [
                {
                    width: "*",
                    text: [
                        "Lugar de emisión",
                        "\n",
                        { text: `${LugarExpedicion}`, bold: true },
                    ],
                    style: "tableCell",
                    alignment: "left",
                },
                {
                    width: "*",
                    text: [
                        "Fecha y hora de emisión",
                        "\n",
                        { text: `${Fecha}`, bold: true },
                    ],
                    style: "tableCell",
                    alignment: "left",
                },
            ],
        ],
    };
};
exports.folio = folio;
//# sourceMappingURL=headers.js.map