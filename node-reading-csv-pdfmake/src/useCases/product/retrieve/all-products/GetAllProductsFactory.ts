import { ProductRepository } from '../../ProductRepository';
import { GetAllProductsController } from './GetAllProductsController';
import { GetAllProductsService } from './GetAllProductsService';

export const getAllProductsFactory = () => {
  const productRepository = new ProductRepository();
  const getAllProductsService = new GetAllProductsService(productRepository);
  const getAllProductsController = new GetAllProductsController(getAllProductsService);
  return getAllProductsController;
};
