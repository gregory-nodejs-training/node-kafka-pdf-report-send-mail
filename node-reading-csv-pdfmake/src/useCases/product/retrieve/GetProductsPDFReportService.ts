import { Product } from ".prisma/client";
import { Column, StyleDictionary, TableCell, TDocumentDefinitions } from "pdfmake/interfaces";
import { client } from "../../../database/client";
import { HTTP400Error } from "../../../exceptions/HTTP400Error";
import { PDFMaker } from "../../../shared/utils/PDFMaker";

const PDFHeader: Column[] = [
    { text: "Relatório de Produtos", style: "header" },
    { text: "29/07/2021 18:40:05", style: "header" }
];

const columnsTitle: TableCell[] = [
    { text: "ID", style: "id" },
    { text: "Código de Barras", style: "columnsTitle" },
    { text: "Descrição", style: "columnsTitle" },
    { text: "Preço", style: "columnsTitle" },
    { text: "Quantidade", style: "columnsTitle" }
];

const predefinedStyles: StyleDictionary = {
    header: {
        fontSize: 18,
        bold: true,
        alignment: 'center'
    },
    columnsTitle: {
        fontSize: 13,
        bold: true,
        fillColor: '#7159c1',
        color: '#FFF',
        alignment: 'center',
        margin: 4
    },
    id: {
        fillColor: '#999',
        color: "#FFF",
        bold: true,
        fontSize: 13,
        alignment: 'center',
        margin: 4
    }
};

class GetProductsPDFReportService {

    async execute() {
        const products = await client.product.findMany();
        if (!products) {
            throw new HTTP400Error("No products to generate PDF Report.");
        }

        const body = this.createPDFBody(products);

        const docDefinitions: TDocumentDefinitions = this.createDocumentDefinitions(body);
        
        const pdfMaker = new PDFMaker();
        const pdf = await pdfMaker.createPDF(docDefinitions);

        return pdf;
    }

    private createPDFBody(products: Product[]) : any[][] {
        const body = [];
        const tableHeader = new Array();

        columnsTitle.forEach(column => tableHeader.push(column));
        body.push(tableHeader);

        for (let product of products) {
            //IF DON'T WANT TO CHANGE ANY VALUE, CAN DO THIS WAY:
            // const rows = Object.values(product);
            const rows = new Array();
            rows.push(product.id);
            rows.push(product.codeBar);
            rows.push(product.description);
            rows.push(`R$ ${product.price.toFixed(2).replace(".", ",")}`);
            rows.push(product.quantity);

            body.push(rows);
        }
        return body;
    }

    private createDocumentDefinitions(body: any[][]): TDocumentDefinitions {
        return {
            defaultStyle: { font: "Helvetica" },
            content: [
                {
                    columns: PDFHeader
                },
                {
                    text: "\n\n\n\n"
                },
                {
                    table: {
                        widths: [160, "auto", "auto", 70, "auto"],
                        headerRows: 1,
                        body
                    }
                }
            ],
            styles: predefinedStyles
        };
    }
}

export { GetProductsPDFReportService };