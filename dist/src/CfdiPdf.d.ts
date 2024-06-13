export declare class CfdiPdf {
    private _definition;
    private data;
    private url;
    private cadenaOriginal;
    private logo;
    constructor(xml: string, cadenaOriginal: string, pathLogo?: string);
    private buildDefinition;
    createDocument(name: string, folderPath: string): Promise<unknown>;
}
