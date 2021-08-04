import { Readable } from "stream";

import readline from "readline";
import { client } from "@database/client";
import { Product } from "@prisma/client";
import { HTTP400Error } from "@exceptions/HTTP400Error";

interface ProductInput {
    codeBar: string,
    description: string,
    price: number,
    quantity: number
}

class CreateProductService {
    
    async execute(worksheet: Buffer) : Promise<Product[]> {
        const productsLine = this.createReadline(worksheet);
        
        const products: Product[] = [];
        
        for await (let line of productsLine) {
            const productLineSplit = line.split(";");
            const [ codeBar, description, priceString, quantityString ] = productLineSplit;
            const price = Number(priceString.replace(",", "."));
            const quantity = Number(quantityString.replace(",", "."));

            if (price && quantity) {
                if (!await this.verifyProductExists(codeBar)) {
                    const product = await this.createProduct({ codeBar, description, price, quantity });
                    products.push(product);
                }
            }
        }
        return products;
    }

    private createReadline(worksheet: Buffer) : readline.Interface {
        const readableFile = new Readable();
        readableFile.push(worksheet);
        readableFile.push(null);
        
        return readline.createInterface({
            input: readableFile
        });
    }

    private async verifyProductExists(codeBar: string): Promise<Product | null> {
        return await client.product.findFirst({
            where: {
                codeBar
            }
        });
    }

    private async createProduct({ codeBar, description, price, quantity }: ProductInput) : Promise<Product> {
        const product = await client.product.create({
            data: {
                codeBar,
                description,
                price,
                quantity,
            }, select: {
                id: true,
                codeBar: true,
                description: true,
                price: true,
                quantity: true
            }
        });
        if (!product) {
            throw new HTTP400Error("Error creating product.");
        }
        return product;
    }
}

export { CreateProductService };
