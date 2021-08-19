import { HTTP400Error } from '@exceptions/HTTP400Error';
import { Validators } from '@utils/Validators';
import { CompressionTypes, Producer } from 'kafkajs';
import { GetProductsPDFReportService } from '../GetProductsPDFReportService';
import { PDFMailDTO } from './models/PDFMailDTO';

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
  constructor(private getProductsPDFReportService: GetProductsPDFReportService) {}

  async execute(emailInfos: IEmailInfos, producer: Producer) : Promise<void> {
    const pdfReport = await this.getProductsPDFReportService.execute();

    if (!pdfReport) {
      throw new HTTP400Error("Can't generate PDF!");
    }

    await this.validateMailInfosSendTopicMessage(emailInfos, pdfReport, producer);
  }

  private async validateMailInfosSendTopicMessage(
    emailInfos: IEmailInfos,
    pdfReport: Buffer,
    producer: Producer
  ): Promise<void> {
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

    await Validators.validateObject<PDFMailDTO>(pdfMailDTO);

    this.sendMessage(pdfMailDTO, producer);
  }

  private async sendMessage(pdfMailDTO: PDFMailDTO, producer: Producer) : Promise<void> {
    await producer.send({
      topic: 'send-pdf-email',
      compression: CompressionTypes.GZIP,
      messages: [
        { value: JSON.stringify(pdfMailDTO) }
      ]
    }).catch(err => {
      throw new HTTP400Error(`Error sending order to send e-mail: ${err}`);
    });
  }
}

export { GetProductsPDFReportByEmailService };
