import { BaseError } from '@exceptions/BaseError';
import { HTTP400Error } from '@exceptions/HTTP400Error';
import { HttpStatusCode } from '@sharedEntities/HttpStatusCode';
import { ApiUtil } from '@utils/ApiUtil';
import { Request, Response } from 'express';
import { GetProductsPDFReportByEmailService } from './GetProductsPDFReportByEmailService';

class GetProductsPDFReportByEmailController {
  async handler(request: Request, response: Response) {
    const getProductsPDFReportByEmailService = new GetProductsPDFReportByEmailService();
    const {
      to, from, subject, attachmentName, text
    } = request.body;
    const { producer } = request;

    if (!to || !from || !subject || !attachmentName) {
      throw new HTTP400Error('Need to pass all required e-mail infos!');
    }

    if (!producer) {
      throw new BaseError('Internal server error',
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        'Producer not found',
        false);
    }

    await getProductsPDFReportByEmailService.execute({
      to,
      from,
      subject,
      attachmentName,
      text
    }, producer);

    return response.json(ApiUtil.createResponseData('PDF sent by e-mail succesfully!'));
  }
}

export { GetProductsPDFReportByEmailController };
