import { ApiUtil } from '@utils/ApiUtil';
import { Secret, verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { JWT_SECRET_KEY } from 'src/configProperties';

interface IPayload {
    sub: string;
}

const UNAUTHORIZED_MESSAGE = 'Unauthorized. Token is missing!';

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401)
      .json(ApiUtil.createResponseError(UNAUTHORIZED_MESSAGE));
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(
      token,
      JWT_SECRET_KEY as Secret
    ) as IPayload;

    request.userId = sub;
  } catch (err) {
    return response.status(401)
      .json(ApiUtil.createResponseError(UNAUTHORIZED_MESSAGE));
  }
  return next();
}
