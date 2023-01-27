"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./clave.prod.serv.type"), exports);
__exportStar(require("./clave.unidad.type"), exports);
__exportStar(require("./codigo.postal.type"), exports);
__exportStar(require("./comprobante.element"), exports);
__exportStar(require("./comprobante.informacion.global.element"), exports);
__exportStar(require("./comprobante.cfdi.relacionados.element"), exports);
__exportStar(require("./comprobante.cfdi.relacionados.cfdi.relacionado.element"), exports);
__exportStar(require("./comprobante.cfdi.emisor.element"), exports);
__exportStar(require("./comprobante.cfdi.receptor.element"), exports);
__exportStar(require("./comprobante.cfdi.concepto.element"), exports);
__exportStar(require("./comprobante.cfdi.concepto.impuestos.retenciones.element"), exports);
__exportStar(require("./comprobante.cfdi.concepto.impuestos.traslados.element"), exports);
__exportStar(require("./comprobante.cfdi.concepto.acuenta.terceros.element"), exports);
__exportStar(require("./comprobante.cfdi.concepto.informacion.aduanera.element"), exports);
__exportStar(require("./comprobante.cfdi.concepto.cuenta.predial.element"), exports);
__exportStar(require("./comprobante.cfdi.concepto.parte.element"), exports);
__exportStar(require("./comprobante.cfdi.impuestos.element"), exports);
__exportStar(require("./comprobante.cfdi.impuestos.retencion.element"), exports);
__exportStar(require("./comprobante.cfdi.impuestos.traslados.element"), exports);
__exportStar(require("./xml"), exports);
