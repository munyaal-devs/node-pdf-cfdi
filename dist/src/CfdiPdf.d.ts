export declare class CfdiPdf {
    private _definition;
    private data;
    private url;
    private cadenaOriginal;
    constructor(xml: string, cadenaOriginal: string);
    private getData;
    private getDataComplement;
    private getDataConcept;
    private emisor;
    private folio;
    private receptor;
    private payment;
    private concept;
    private concepts;
    private summary;
    private footer;
    private buildDefinition;
    createDocument(): void;
}
