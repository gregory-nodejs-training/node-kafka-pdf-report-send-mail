import { CreateProductController } from './CreateProductController';
import { ProductRepository } from '../ProductRepository';
import { CreateProductService } from './CreateProductService';

export const createProductFactory = () => {
  const productRepository = new ProductRepository();
  const createProductService = new CreateProductService(productRepository);
  const createProductController = new CreateProductController(createProductService);
  return createProductController;
};
