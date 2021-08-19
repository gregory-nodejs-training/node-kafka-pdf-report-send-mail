import { Request, Response, Router } from 'express';

import multer from 'multer';
import { ensureAdmin } from '@middlewares/ensureAdmin';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { createProductFactory } from './useCases/product/create/CreateProductFactory';
import { getAllProductsFactory } from './useCases/product/retrieve/all-products/GetAllProductsFactory';
import { getProductsPDFReportByEmailFactory } from './useCases/product/retrieve/pdf-report/get-by-email/GetProductsPDFReportByEmailFactory';
import { getProductsPDFReportByRequestFactory } from './useCases/product/retrieve/pdf-report/get-by-request/GetProductsPDFReportByRequestFactory';
import { authenticateUserFactory } from './useCases/user/authentication/AuthenticateUserFactory';
import { createUserFactory } from './useCases/user/create/CreateUserFactory';
import { getAllUsersFactory } from './useCases/user/retrieve/get-all-users/GetAllUsersFactory';

const multerConfig = multer();

const router = Router();

// AUTH

router.post('/auth', (request: Request, response: Response) =>
  authenticateUserFactory().handler(request, response)
);

// INSERTS

router.post('/users', (request: Request, response: Response) =>
  createUserFactory().handler(request, response)
);

router.post('/products',
  ensureAuthenticated,
  multerConfig.single('file'),
  (request: Request, response: Response) =>
    createProductFactory().handler(request, response)
);

// RETRIEVES

router.get('/users',
  ensureAuthenticated,
  ensureAdmin,
  (request: Request, response: Response) =>
    getAllUsersFactory().handler(request, response)
);

router.post('/products/report-by-email',
  ensureAuthenticated,
  (request: Request, response: Response) =>
    getProductsPDFReportByEmailFactory().handler(request, response)
);

router.get('/products',
  ensureAuthenticated,
  (request: Request, response: Response) =>
    getAllProductsFactory().handler(request, response)
);

router.get('/products/report-by-request',
  ensureAuthenticated,
  (request: Request, response: Response) =>
    getProductsPDFReportByRequestFactory().handler(request, response)
);

export { router };
