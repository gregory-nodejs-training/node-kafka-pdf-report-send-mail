import { Readable } from 'stream';

import readline from 'readline';
import { Product } from '@prisma/client';
import { CreateProduct } from '../models/CreateProduct';
import { ProductRepository } from '../ProductRepository';

class CreateProductService {
  constructor(private productRepository: ProductRepository) {}

  async execute(worksheet: Buffer, userId: string): Promise<Product[]> {
    const productsLine = this.createReadline(worksheet);

    const products: Product[] = [];

    for await (const line of productsLine) {
      const productLineSplit = line.split(';');
      const [codeBar, description, priceString, quantityString] = productLineSplit;
      const price = Number(priceString.replace(',', '.'));
      const quantity = Number(quantityString.replace(',', '.'));

      if (price && quantity) {
        if (!await this.verifyProductExists(codeBar)) {
          const productCreate = new CreateProduct(codeBar, description, price, quantity, userId);
          const product = await this.createProduct(productCreate);
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

  private async verifyProductExists(codeBar: string): Promise<boolean> {
    return await this.productRepository.exists(codeBar);
  }

  private async createProduct(productCreate: CreateProduct) : Promise<Product> {
    const product = await this.productRepository.create(productCreate);
    return product;
  }
}

export { CreateProductService };
