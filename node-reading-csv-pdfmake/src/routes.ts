import { Router } from "express";

import multer from "multer";
import { CreateProductController } from "./useCases/product/create/CreateProductController";
import { GetAllProductsController } from "./useCases/product/retrieve/GetAllProductsController";
import { GetProductsPDFReportController } from "./useCases/product/retrieve/GetProductsPDFReportController";

const multerConfig = multer();

const router = Router();

const createProductController = new CreateProductController();
const getAllProductsController = new GetAllProductsController();
const getProductsPDFReportController = new GetProductsPDFReportController();

router.post("/products", multerConfig.single("file"), createProductController.handler);

router.get("/products", getAllProductsController.handler);
router.get("/products/report", getProductsPDFReportController.handler);

export { router };