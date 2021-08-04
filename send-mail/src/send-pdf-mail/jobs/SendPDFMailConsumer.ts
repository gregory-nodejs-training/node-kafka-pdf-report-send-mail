import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { SEND_PDF_MAIL_JOB, SEND_PDF_MAIL_QUEUE } from '../constants/sendPDFMailConstants';
import { PDFMailDTO } from '../models/PDFMailDTO';

@Processor(SEND_PDF_MAIL_QUEUE)
class SendPDFMailConsumer {
  constructor(private mailService: MailerService) {}

  @Process(SEND_PDF_MAIL_JOB)
  async sendMailJob(job: Job<PDFMailDTO>) {
    const { data } = job;

    await this.mailService.sendMail({
      to: data.to,
      from: data.from,
      subject: data.subject,
      text: data.text,
      attachments: [
        {
          filename: data.attachmentName,
          content: data.attachmentContent,
        },
      ],
    });
  }
}

export { SendPDFMailConsumer };
