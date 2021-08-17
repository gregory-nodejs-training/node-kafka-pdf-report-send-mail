import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { BaseError } from '@exceptions/BaseError';
import { errorHandler } from '@utils/ErrorHandler';
import { ApiUtil } from '@utils/ApiUtil';
import { router } from './routes';
import { PRODUCER } from './kafkaConfig';

// ORDER IS STRICTLY NECESSARY THIS WAY!
const app = express();

app.use(express.json());

// ADD PRODUCER TO REQUEST
app.use((request: Request, response: Response, next: NextFunction) => {
  request.producer = PRODUCER;

  return next();
});

// ADD ROUTES
app.use(router);

// ADD ERROR HANDLE TO APP
app.use(async (err: Error, request: Request, response: Response, next: NextFunction) => {
  await errorHandler.handleError(err);
  if (!errorHandler.isTrustedError(err)) {
    response.status(500)
      .json(ApiUtil.createResponseError('Internal Server Error'));
  }
  response.status((err as BaseError).httpCode)
    .json(ApiUtil.createResponseError(err.message));
  return next(err);
});

async function bootstrap() {
  await PRODUCER.connect();
  app.listen(3000, () => console.log('Server is running'));
}

bootstrap();
