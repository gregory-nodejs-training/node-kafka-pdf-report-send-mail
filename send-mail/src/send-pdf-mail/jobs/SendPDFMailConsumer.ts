import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Address } from 'nodemailer/lib/mailer';
import { SEND_PDF_MAIL_JOB, SEND_PDF_MAIL_QUEUE } from '../constants/sendPDFMailConstants';
import { PDFMailDTO } from '../models/PDFMailDTO';

@Processor(SEND_PDF_MAIL_QUEUE)
class SendPDFMailConsumer {
  constructor(private mailService: MailerService) {}

  @Process(SEND_PDF_MAIL_JOB)
  async sendMailJob(job: Job<PDFMailDTO>): Promise<void> {
    const { data } = job;
    const { to, nameTo, from, nameFrom, subject, text, attachmentName, attachmentContent } = data;
    console.log(data);
    await this.mailService.sendMail({
      to: this.composeAddress(to, nameTo),
      from: this.composeAddress(from, nameFrom),
      subject,
      text,
      attachments: [
        {
          filename: attachmentName,
          content: Buffer.from(String(attachmentContent)),
        },
      ],
    });
  }

  private composeAddress(email: string, name?: string): Address | string {
    if (name) {
      return { name, address: email };
    }
    return email;
  }
}

export { SendPDFMailConsumer };
