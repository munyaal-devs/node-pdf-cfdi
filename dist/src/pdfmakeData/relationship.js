"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relationships = exports.relationship = void 0;
const cfdi_catalogs_1 = require("@munyaal/cfdi-catalogs");
const relationship = (value) => {
    const table = [
        [
            {
                text: `${value.TipoRelacion} - ${(0, cfdi_catalogs_1.searchOption)(value.TipoRelacion, cfdi_catalogs_1.CatalogEnum.TipoRelacion)
                    ?.description}`,
                bold: true,
                style: "tableCell",
                alignment: "left",
            },
        ],
    ];
    for (let index = 0; index < value.CfdiRelacionado.length; index++) {
        table.push([
            {
                text: ["UUID: ", { text: `${value.CfdiRelacionado[index]}` }],
                style: "tableCell",
                alignment: "left",
            },
        ]);
    }
    return {
        widths: ["*"],
        body: table,
    };
};
exports.relationship = relationship;
const relationships = (CfdiRelacionados) => {
    const concepts = CfdiRelacionados.map((value) => [
        {
            layout: "noBorders",
            table: (0, exports.relationship)(value),
        },
    ]);
    return {
        widths: ["*"],
        body: [
            [
                {
                    text: " Comprobantes fiscales digitales por internet relacionados",
                    alignment: "left",
                    style: "tableCell",
                    marginTop: 0.15,
                    bold: true,
                },
            ],
            ...concepts,
        ],
    };
};
exports.relationships = relationships;
