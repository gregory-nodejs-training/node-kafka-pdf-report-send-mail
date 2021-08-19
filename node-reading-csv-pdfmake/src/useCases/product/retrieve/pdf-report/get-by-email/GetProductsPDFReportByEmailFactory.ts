import { ProductRepository } from 'src/useCases/product/ProductRepository';
import { GetProductsPDFReportService } from '../GetProductsPDFReportService';
import { GetProductsPDFReportByEmailController } from './GetProductsPDFReportByEmailController';
import { GetProductsPDFReportByEmailService } from './GetProductsPDFReportByEmailService';

export const getProductsPDFReportByEmailFactory = () => {
  const productRepository = new ProductRepository();
  const getProductsPDFReportService = new GetProductsPDFReportService(productRepository);
  const getProductsPDFReportByEmailService = new GetProductsPDFReportByEmailService(getProductsPDFReportService);
  const getProductsPDFReportByEmailController = new GetProductsPDFReportByEmailController(getProductsPDFReportByEmailService);
  return getProductsPDFReportByEmailController;
};
