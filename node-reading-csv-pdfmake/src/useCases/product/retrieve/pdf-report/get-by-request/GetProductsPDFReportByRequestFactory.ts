import { ProductRepository } from 'src/useCases/product/ProductRepository';
import { GetProductsPDFReportService } from '../GetProductsPDFReportService';
import { GetProductsPDFReportController } from './GetProductsPDFReportController';

export const getProductsPDFReportByRequestFactory = () => {
  const productRepository = new ProductRepository();
  const getProductsPDFReportService = new GetProductsPDFReportService(productRepository);
  const getProductsPDFReportController = new GetProductsPDFReportController(getProductsPDFReportService);
  return getProductsPDFReportController;
};
