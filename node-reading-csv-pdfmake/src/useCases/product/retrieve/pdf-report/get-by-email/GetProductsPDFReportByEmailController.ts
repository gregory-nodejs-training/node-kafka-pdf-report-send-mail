import { BaseError } from '@exceptions/BaseError';
import { HttpStatusCode } from '@sharedEntities/HttpStatusCode';
import { ApiUtil } from '@utils/ApiUtil';
import { Request, Response } from 'express';
import { GetProductsPDFReportByEmailService } from './GetProductsPDFReportByEmailService';

class GetProductsPDFReportByEmailController {
  constructor(private getProductsPDFReportByEmailService: GetProductsPDFReportByEmailService) {}

  async handler(request: Request, response: Response) {
    const { body, producer } = request;
    const {
      to, nameTo, from, nameFrom, subject, attachmentName, text
    } = body;

    if (!producer) {
      throw new BaseError('Internal server error',
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        'Producer not found',
        false);
    }

    await this.getProductsPDFReportByEmailService.execute({
      to,
      nameTo,
      from,
      nameFrom,
      subject,
      attachmentName,
      text
    }, producer);

    return response.json(ApiUtil.createResponseData('Report sent by e-mail!'));
  }
}

export { GetProductsPDFReportByEmailController };
