import { Product } from '@prisma/client';
import { client } from '@database/client';
import { HTTP404Error } from '@exceptions/HTTP404Error';

class GetAllProductsService {
  async execute() : Promise<Product[]> {
    const products = await client.product.findMany();

    if (!products) {
      throw new HTTP404Error('Products not found.');
    }

    return products;
  }
}

export { GetAllProductsService };
