import { Request, Response } from 'express';
import { HTTP404Error } from '@exceptions/HTTP404Error';
import { ApiUtil } from '@utils/ApiUtil';
import { GetAllProductsService } from './GetAllProductsService';

class GetAllProductsController {
  async handler(request: Request, response: Response) {
    const getAllProductsService = new GetAllProductsService();

    const products = await getAllProductsService.execute();

    if (!products) {
      throw new HTTP404Error('Products not found.');
    }

    return response.json(ApiUtil.createResponseData(products));
  }
}

export { GetAllProductsController };
