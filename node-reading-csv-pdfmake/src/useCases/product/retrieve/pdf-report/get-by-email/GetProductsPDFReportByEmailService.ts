import { HTTP400Error } from '@exceptions/HTTP400Error';
import { CompressionTypes, Producer } from 'kafkajs';
import { GetProductsPDFReportService } from '../GetProductsPDFReportService';
import { PDFMailDTO, validateOrRejectPDFMail } from './models/PDFMailDTO';

interface IEmailInfos {
  to: string;
  nameTo?: string;
  from: string;
  nameFrom?: string;
  subject: string;
  text?: string;
  attachmentName: string;
}

class GetProductsPDFReportByEmailService {
  async execute(emailInfos: IEmailInfos, producer: Producer) : Promise<void> {
    const getProductsPDFReportService = new GetProductsPDFReportService();

    const pdfReport = await getProductsPDFReportService.execute();

    if (!pdfReport) {
      throw new HTTP400Error("Can't generate PDF!");
    }

    const pdfMailDTO = new PDFMailDTO(
      emailInfos.to,
      emailInfos.from,
      emailInfos.subject,
      emailInfos.attachmentName,
      pdfReport,
      emailInfos.text,
      emailInfos.nameTo,
      emailInfos.nameFrom
    );

    await validateOrRejectPDFMail(pdfMailDTO);

    producer.send({
      topic: 'send-pdf-email',
      compression: CompressionTypes.GZIP,
      messages: [
        { value: JSON.stringify(pdfMailDTO) }
      ]
    });
  }
}

export { GetProductsPDFReportByEmailService };
