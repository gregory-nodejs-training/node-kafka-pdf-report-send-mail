import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { SEND_PDF_MAIL_JOB, SEND_PDF_MAIL_QUEUE } from '../constants/sendPDFMailConstants';
import { PDFMailDTO } from '../models/PDFMailDTO';

@Processor(SEND_PDF_MAIL_QUEUE)
class SendPDFMailConsumer {
  constructor(private mailService: MailerService) {}

  @Process(SEND_PDF_MAIL_JOB)
  async sendMailJob(job: Job<PDFMailDTO>): Promise<void> {
    const { data } = job;
    const { to, from, subject, text, attachmentName, attachmentContent } = data;
    await this.mailService.sendMail({
      to,
      from,
      subject,
      text,
      attachments: [
        {
          filename: attachmentName,
          content: Buffer.from(String(attachmentContent)),
          contentType: 'pdf',
        },
      ],
    });
  }
}

export { SendPDFMailConsumer };
