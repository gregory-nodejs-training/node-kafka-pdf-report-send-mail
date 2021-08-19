import { Request, Response } from 'express';
import { HTTP400Error } from '@exceptions/HTTP400Error';
import { ApiUtil } from '@utils/ApiUtil';
import { CreateProductService } from './CreateProductService';

class CreateProductController {
  constructor(private productService: CreateProductService) {}

  async handler(request: Request, response: Response) {
    const { file, userId } = request;
    if (!file) {
      throw new HTTP400Error('Need to attach some file!');
    }
    const { buffer } = file;
    const products = await this.productService.execute(buffer, userId);

    return response.json(ApiUtil.createResponseData(products));
  }
}

export { CreateProductController };
