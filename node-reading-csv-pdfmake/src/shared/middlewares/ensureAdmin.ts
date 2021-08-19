import { client } from '@database/client';
import { HTTP400Error } from '@exceptions/HTTP400Error';
import { ApiUtil } from '@utils/ApiUtil';
import { NextFunction, Request, Response } from 'express';

export async function ensureAdmin(request: Request,
  response: Response,
  next: NextFunction
) {
  const { userId } = request;

  const user = await client.user.findUnique({
    where: {
      id: userId
    }
  });

  if (!user) {
    throw new HTTP400Error("This user doesn't exists!");
  }

  if (user.admin) {
    return next();
  }
  return response.status(401).json(ApiUtil.createResponseError('Unauthorized'));
}
