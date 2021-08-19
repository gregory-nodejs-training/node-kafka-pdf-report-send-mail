import { Product } from '@prisma/client';
import { ProductRepository } from '../../ProductRepository';

class GetAllProductsService {
  constructor(private productRepository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    const products = await this.productRepository.listAll();
    return products;
  }
}

export { GetAllProductsService };
