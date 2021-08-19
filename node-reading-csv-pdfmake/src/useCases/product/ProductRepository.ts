import { client } from '@database/client';
import { IRepository } from '@database/IRepository';
import { HTTP400Error } from '@exceptions/HTTP400Error';
import { Product } from '@prisma/client';
import { CreateProduct } from './models/CreateProduct';

class ProductRepository implements IRepository<CreateProduct, Product> {
  async create(product: CreateProduct): Promise<Product> {
    const createdProduct = client.product.create({
      data: product
    });
    if (!createdProduct) {
      throw new HTTP400Error('Error creating product.');
    }
    return createdProduct;
  }

  async exists(codeBar: string): Promise<boolean> {
    const product = await client.product.findUnique({
      where: {
        codeBar
      }
    });
    return !!product;
  }

  async listAll(): Promise<Product[]> {
    const products = await client.product.findMany();

    if (!products) {
      throw new HTTP400Error('Products not found.');
    }

    return products;
  }
}

export { ProductRepository };
