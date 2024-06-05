export declare class CfdiPdf {
    private _definition;
    private data;
    private url;
    private cadenaOriginal;
    private logo;
    constructor(xml: string, cadenaOriginal: string, pathLogo?: string);
    private receptor;
    private payment;
    private concept;
    private concepts;
    private relationship;
    private relationships;
    private summary;
    private footer;
    private buildDefinition;
    createDocument(name: string, folderPath: string): Promise<unknown>;
}
