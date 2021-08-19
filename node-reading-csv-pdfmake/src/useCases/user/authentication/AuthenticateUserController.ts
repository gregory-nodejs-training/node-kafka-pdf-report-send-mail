import { ApiUtil } from '@utils/ApiUtil';
import { Request, Response } from 'express';
import { AuthenticateUserService } from './AuthenticateUserService';

class AuthenticateUserController {
  constructor(private authenticateUserService: AuthenticateUserService) {}

  async handler(request: Request, response: Response) {
    const { email, password } = request.body;

    const token = await this.authenticateUserService.execute({
      email,
      password
    });

    return response.json(ApiUtil.createResponseData({ token: token }));
  }
}

export { AuthenticateUserController };
