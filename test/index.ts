import { CfdiPdf } from "../src";

export const bootstrap = () => {
    const xml = `<?xml version="1.0" encoding="utf-8"?><cfdi:Comprobante Version="4.0" Serie="A" Folio="MYLF-246" Fecha="2023-01-30T08:20:52" Sello="YfnwnSyaE8QLFCYTI5CiXmDoQEk5tFMORsA/owQn2tquK7RIfGrpWZ3jk4oQxUCjSyS6mzhK/5mRE0GPfkGnbgW4T+EJ+/RbToAyiobmqrbwml/w1KrCfEkV/plFJsgUxUpT8ThgKJlKc16OLbYnEtXSsUGMyC+U8VRbZmlolb+DsBZHrUZav+aGU1aenFeKAQzlS+cXdnO9I+bBPSoLwc7woO0Y75s8Yjfcemegv+ah8EhXexP8LK2NGzBIVCOD0ohz8ZIdO9wFXY1oITRINWGTY5GhycCbL8SeEJ9vnoByXyTMUbeHfN3gsSr1kf/FqPDjTAKrtYxFGShRSXykdw==" FormaPago="01" NoCertificado="30001000000400002333" Certificado="MIIFjjCCA3agAwIBAgIUMzAwMDEwMDAwMDA0MDAwMDIzMzMwDQYJKoZIhvcNAQELBQAwggErMQ8wDQYDVQQDDAZBQyBVQVQxLjAsBgNVBAoMJVNFUlZJQ0lPIERFIEFETUlOSVNUUkFDSU9OIFRSSUJVVEFSSUExGjAYBgNVBAsMEVNBVC1JRVMgQXV0aG9yaXR5MSgwJgYJKoZIhvcNAQkBFhlvc2Nhci5tYXJ0aW5lekBzYXQuZ29iLm14MR0wGwYDVQQJDBQzcmEgY2VycmFkYSBkZSBjYWRpejEOMAwGA1UEEQwFMDYzNzAxCzAJBgNVBAYTAk1YMRkwFwYDVQQIDBBDSVVEQUQgREUgTUVYSUNPMREwDwYDVQQHDAhDT1lPQUNBTjERMA8GA1UELRMIMi41LjQuNDUxJTAjBgkqhkiG9w0BCQITFnJlc3BvbnNhYmxlOiBBQ0RNQS1TQVQwHhcNMTkwNTI5MTkzMTM1WhcNMjMwNTI5MTkzMTM1WjCBtTEeMBwGA1UEAxMVTUFSSUEgV0FURU1CRVIgVE9SUkVTMR4wHAYDVQQpExVNQVJJQSBXQVRFTUJFUiBUT1JSRVMxHjAcBgNVBAoTFU1BUklBIFdBVEVNQkVSIFRPUlJFUzEWMBQGA1UELRMNV0FUTTY0MDkxN0o0NTEbMBkGA1UEBRMSV0FUTTY0MDkxN01IR1RSUjAxMR4wHAYDVQQLExVNQVJJQSBXQVRFTUJFUiBUT1JSRVMwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCM+W4Xe1M2/zdxgIkMv6vC+w64tJkaT4uevI1vSI/XoDjhcRotJ4BZI0CAe1o9ZlvQyTA4d0wbTfgBVj8P3ivgNafkQ1GTLpsdE2imtXgmTStSKnvIDIFzY1tRa7Nf/13upQI70rQT+9tOmOXf5IyXjKUrlUs0ZEZUWN/hJKvEZsAknWTMzJcdg/eZdSBIVINAIFb5DIbzgdTuBHt0Iy+X3F5zFFDMuCwMilix20xWQZmv53ZS1DpxdAnAsKKReF2FEcYy8E9cP90uz3z7YHldFXGRiu6rNbarsjH9rK6AzSCxQxWcVEu3LR57S4+4tCVf3B4BX5ic37Yo4Bx+03FbAgMBAAGjHTAbMAwGA1UdEwEB/wQCMAAwCwYDVR0PBAQDAgbAMA0GCSqGSIb3DQEBCwUAA4ICAQBS621C2Bi1BAAoW80DmRwaUGoOtJEahwI6D4KRl9DPT9yTT3L383/ZYlOsoeQ77wZSklxvuFHYJKEuTDS6WCd0SHqGqWMHZwj9v+qZ3C6hiia1z60kAgsu4RYMb5ZyMRsFtfD+EIvAQk2w4TD7ovYmnAwBUxDK56pff2CpfyKJBznr/qfnVwOX9U1JFBRl+rTTd2dB4Gc7E6tZv9J2Hvxg72MQJsWCkwNGEL5ryZtvSlbM6qD3i0t0E4GZVVoUUxigW6yVOETEW1yU/EGyJCBOWIRX2VDMKnhhxukPrjhhsdX/yz2aWQmGV7NgjBskQEGV7b76DMg39gR+pfqiBRamd2IpVQsLT6JEmKO9qXmEKx+6tEfPbODpOCFgcg1cvyDoQqPKuoFZ6qsP6oeNXuz6X4dluhyuBjuYFDPYydEi9Drb+t3iG98vg+rPE2C+SBU4drg1LqsqmSm3SeYbn93m3YWcIj5c+xNsStGKNw7Gw6ZBnvS/CWChCIP3kEtWWWJWhhPWKnHaa7lSCVzGGMdUGtT3MZme7oew1GdCr9VlrnVPK4eU2ePddrIGLq8uINEzhgGTnIa6f/wJGynP8dhVI6eYQRBlicLk+ugfeoASCD/abr8Pi3jtUVfqIfPm6BbItxR9QyeCF9n66EkKfqxx04gOGUi/9H9hfnCVnNw7aQ==" SubTotal="948.28" Descuento="43.10" Moneda="MXN" Total="1050.01" TipoDeComprobante="I" Exportacion="01" MetodoPago="PUE" LugarExpedicion="77725" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:cfdi="http://www.sat.gob.mx/cfd/4" xsi:schemaLocation="http://www.sat.gob.mx/cfd/4 http://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd"><cfdi:Emisor Rfc="WATM640917J45" Nombre="MARIA WATEMBER TORRES" RegimenFiscal="612" /><cfdi:Receptor Rfc="MODC980924HK1" Nombre="CALEB ISAAC MORA DIAZ" DomicilioFiscalReceptor="77725" RegimenFiscalReceptor="612" UsoCFDI="G03" /><cfdi:Conceptos><cfdi:Concepto ClaveProdServ="91111701" Cantidad="2.000000" ClaveUnidad="H87" Descripcion="PLayera md" ValorUnitario="431.034483" Importe="862.068966" Descuento="43.103448" ObjetoImp="02"><cfdi:Impuestos><cfdi:Traslados><cfdi:Traslado Base="818.965518" Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.160000" Importe="131.034483" /></cfdi:Traslados></cfdi:Impuestos></cfdi:Concepto><cfdi:Concepto ClaveProdServ="53102705" Cantidad="1.000000" ClaveUnidad="H87" Descripcion="TRAJE DE BAÑO 1 PZA PROMOCION" ValorUnitario="86.206897" Importe="86.206897" Descuento="0.000000" ObjetoImp="02"><cfdi:Impuestos><cfdi:Traslados><cfdi:Traslado Base="86.206897" Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.160000" Importe="13.793104" /></cfdi:Traslados></cfdi:Impuestos></cfdi:Concepto></cfdi:Conceptos><cfdi:Impuestos TotalImpuestosTrasladados="144.83"><cfdi:Traslados><cfdi:Traslado Base="905.17" Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.160000" Importe="144.83" /></cfdi:Traslados></cfdi:Impuestos><cfdi:Complemento><tfd:TimbreFiscalDigital xsi:schemaLocation="http://www.sat.gob.mx/TimbreFiscalDigital http://www.sat.gob.mx/sitio_internet/cfd/TimbreFiscalDigital/TimbreFiscalDigitalv11.xsd" Version="1.1" UUID="b7e7486e-3f9d-46de-afba-ed6ca2959fc4" FechaTimbrado="2023-01-30T08:21:20" RfcProvCertif="SPR190613I52" SelloCFD="YfnwnSyaE8QLFCYTI5CiXmDoQEk5tFMORsA/owQn2tquK7RIfGrpWZ3jk4oQxUCjSyS6mzhK/5mRE0GPfkGnbgW4T+EJ+/RbToAyiobmqrbwml/w1KrCfEkV/plFJsgUxUpT8ThgKJlKc16OLbYnEtXSsUGMyC+U8VRbZmlolb+DsBZHrUZav+aGU1aenFeKAQzlS+cXdnO9I+bBPSoLwc7woO0Y75s8Yjfcemegv+ah8EhXexP8LK2NGzBIVCOD0ohz8ZIdO9wFXY1oITRINWGTY5GhycCbL8SeEJ9vnoByXyTMUbeHfN3gsSr1kf/FqPDjTAKrtYxFGShRSXykdw==" NoCertificadoSAT="30001000000400002495" SelloSAT="Qrrin0j8wcVuwI8Enhv6VoLs+OamHTVfZ+FwngeI5jvr2hUfyEpmttbGT8XENDZwIPPrl4YQnMsvBFPFYj9x9o22SLRiJyYdfq5yfzpYAUENivKSnqEuVgRM+vOptyh75TN/UUyygIVJpZ3dlWkFUUs0UuG6aSpwZt6sFyf0LKQZZcJBhTrnzam/R9v3s+jRyhVH5Q611T/jkgUjo7QyHo4TYsCDTOwML/0HNHy2I2ViYd2ZAbEf5nWzXiFGxXTvXd3PnAMrZf8DXPRcXcV28mTFjnJYSWeBFyxndRh2Cx4dE1kjh7JCUB1BgHtcUeQLCDxJrig2PZtzWDBaa77unA==" xmlns:tfd="http://www.sat.gob.mx/TimbreFiscalDigital" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" /></cfdi:Complemento></cfdi:Comprobante>`;
    const cadena = `||1.1|b24ad921-8e63-4b36-b7a0-073505ed8870|2023-02-01T11:35:24|SPR190613I52|NSQpQbFjlzqZ90wATbhnUl/P2wZ9EhdnegqZzLDMCD1dZ9hOutK/9jDHs8U7uAAidRDTbRwctLLyOw27vCK8ONhybnOp0aM4DxUAa6FsAi50sC5YhH6dedcc/6H86YR3EReMXbSEijBMVz2zlW8PoLZYfMRBA6DFvo/JR6tuMJQFBPYS96rixCMWX/uFJTxw9dqYVCGDJCIuWN5FeVj5SbH1n++GK56svRfQTu5Kk9hpqL9jHSqJSrEqa82Qwl7q1DKr8V4Xds3nyEnPcwehdrCP301LHXE2x2inAjTEHZK1CTozU6CGIaDUe2dndb7tnEl/04hBVfp/bGPhrGVFvw==|30001000000400002495||`;
    const pdf = new CfdiPdf(xml, cadena);

    pdf.createDocument(`${new Date().getTime()}`, `${process.cwd()}/src/pdfs/`);
}

bootstrap()
