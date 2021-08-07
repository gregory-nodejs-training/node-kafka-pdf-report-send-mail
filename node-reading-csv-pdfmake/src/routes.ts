import { Router } from 'express';

import multer from 'multer';
import { CreateProductController } from './useCases/product/create/CreateProductController';
import { GetAllProductsController } from './useCases/product/retrieve/all-products/GetAllProductsController';
import { GetProductsPDFReportByEmailController } from './useCases/product/retrieve/pdf-report/get-by-email/GetProductsPDFReportByEmailController';
import { GetProductsPDFReportController } from './useCases/product/retrieve/pdf-report/get-by-request/GetProductsPDFReportController';

const multerConfig = multer();

const router = Router();

const createProductController = new CreateProductController();
const getAllProductsController = new GetAllProductsController();
const getProductsPDFReportController = new GetProductsPDFReportController();
const getProductsPDFReportByEmailController = new GetProductsPDFReportByEmailController();

// INSERTS

router.post('/products', multerConfig.single('file'), createProductController.handler);

// RETRIEVES

router.post('/products/report-by-email', getProductsPDFReportByEmailController.handler);

router.get('/products', getAllProductsController.handler);
router.get('/products/report-by-request', getProductsPDFReportController.handler);

export { router };
