export declare class CfdiPdf {
    private _definition;
    private data;
    constructor(xml: string);
    private getData;
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
