import { Request, Response } from 'express';
import { ApiUtil } from '@utils/ApiUtil';
import { GetAllProductsService } from './GetAllProductsService';

class GetAllProductsController {
  constructor(private getAllProductsService: GetAllProductsService) {}

  async handler(request: Request, response: Response) {
    const products = await this.getAllProductsService.execute();
    return response.json(ApiUtil.createResponseData(products));
  }
}

export { GetAllProductsController };
