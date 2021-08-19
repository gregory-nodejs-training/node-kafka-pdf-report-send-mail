import { ApiUtil } from '@utils/ApiUtil';
import { Request, Response } from 'express';
import { UserDTO } from '../models/UserDTO';
import { CreateUserService } from './CreateUserService';

class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  async handler(request: Request, response: Response) {
    const { name, email, password, admin } = request.body;

    const userCreate = new UserDTO(
      name,
      email,
      password,
      admin
    );

    const user = await this.createUserService.execute(userCreate);

    return response.json(ApiUtil.createResponseData(user));
  }
}

export { CreateUserController };
