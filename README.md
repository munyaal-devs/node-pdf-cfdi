# @munyaal/cfdi-pdf

`@munyaal/cfdi-pdf` es una librería para generar archivos PDF a partir de archivos CFDI (Comprobante Fiscal Digital por Internet) en formato XML. Esta herramienta es útil para desarrolladores que necesitan convertir facturas electrónicas en un formato legible y presentable.

## Instalación

Para instalar la librería, puedes usar npm:

```bash
npm install @munyaal/cfdi-pdf
```

## Uso

A continuación se muestra un ejemplo básico de cómo usar `@munyaal/cfdi-pdf` para generar un archivo PDF a partir de un archivo CFDI en formato XML:

```typescript
import * as fs from 'fs';
import { CfdiPdf } from '@munyaal/cfdi-pdf';

// Cargar el archivo XML del CFDI
const xmlData = fs.readFileSync('ruta/al/archivo/cfdi.xml', 'utf8');

// Generar el PDF
const pdf = new CfdiPdf(xmlData, 'cadenaOriginal');

pdf.getBuffer().then((buffer) => {
    console.log(buffer);
});
```

## Contribuir

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Agrega nueva funcionalidad'`).
4. Sube tus cambios a tu repositorio (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request en el repositorio original.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
