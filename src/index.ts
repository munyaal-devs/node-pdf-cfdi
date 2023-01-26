import { CfdiPdf } from "./CfdiPdf";

export const bootstrap = () => {
    const pdf = new CfdiPdf();

    pdf.createDocument();
}
