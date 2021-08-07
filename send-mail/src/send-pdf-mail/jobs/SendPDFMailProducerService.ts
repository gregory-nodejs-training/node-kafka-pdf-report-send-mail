import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { SEND_PDF_MAIL_JOB, SEND_PDF_MAIL_QUEUE } from '../constants/sendPDFMailConstants';
import { PDFMailDTO } from '../models/PDFMailDTO';

@Injectable()
class SendPDFMailProducerService {
  constructor(@InjectQueue(SEND_PDF_MAIL_QUEUE) private queue: Queue) {}

  async sendMail(pdfMailDTO: PDFMailDTO): Promise<void> {
    await this.queue.add(SEND_PDF_MAIL_JOB, pdfMailDTO, {
      attempts: 3,
    });
  }
}

export { SendPDFMailProducerService };
