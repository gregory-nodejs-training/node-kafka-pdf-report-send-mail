import { Request, Response } from 'express';
import { HTTP400Error } from '@exceptions/HTTP400Error';
import { GetProductsPDFReportService } from '../GetProductsPDFReportService';

class GetProductsPDFReportController {
  async handler(request: Request, response: Response) {
    const getProductsPDFReportService = new GetProductsPDFReportService();

    const pdfReport = await getProductsPDFReportService.execute();

    if (!pdfReport) {
      throw new HTTP400Error("Can't generate PDF!");
    }

    return response.end(pdfReport);
  }
}

export { GetProductsPDFReportController };
