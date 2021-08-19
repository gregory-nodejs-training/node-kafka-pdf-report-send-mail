import { ApiUtil } from '@utils/ApiUtil';
import { Request, Response } from 'express';
import { GetAllUsersService } from './GetAllUsersService';

class GetAllUsersController {
  constructor(private getAllUsersService: GetAllUsersService) {}

  async handler(request: Request, response: Response) {
    const users = await this.getAllUsersService.execute();
    return response.json(ApiUtil.createResponseData(users));
  }
}

export { GetAllUsersController };
