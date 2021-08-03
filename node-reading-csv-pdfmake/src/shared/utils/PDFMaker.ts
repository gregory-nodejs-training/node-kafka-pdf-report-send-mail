import PdfPrinter from "pdfmake";

import { TDocumentDefinitions } from "pdfmake/interfaces";


const fonts = {
    Helvetica: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique"
    }
}

class PDFMaker {
    private printer;
    
    constructor() {
        this.printer = new PdfPrinter(fonts);
    }

    async createPDF(docDefinitions: TDocumentDefinitions) {
        const pdfDoc = this.printer.createPdfKitDocument(docDefinitions);
    
        //IF WANT TO GENERATE PDF INTERNALLY IN APP:
        // pdfDoc.pipe(fs.createWriteStream("Relatorio.pdf"));
    
        const pdf = await this.getPDFChunks(pdfDoc);
        
        return pdf;
    }

    private async getPDFChunks(pdfDoc : PDFKit.PDFDocument) : Promise<Buffer> {
        const chunks: any = [];

        pdfDoc.on("data", (chunk) => {
            chunks.push(chunk);
        });

        pdfDoc.end();

        const result = await new Promise<Buffer>(resolve => {
            pdfDoc.on("end", () => {
                const pdfBuffer = Buffer.concat(chunks);
                resolve(pdfBuffer);
            });
        });

        return result;
    }
}

export { PDFMaker };