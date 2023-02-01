export declare class CfdiPdf {
    private _definition;
    private data;
    private url;
    constructor(xml: string);
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
