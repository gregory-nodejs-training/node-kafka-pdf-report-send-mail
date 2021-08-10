import { Controller } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { SendPDFMailProducerService } from '../jobs/SendPDFMailProducerService';
import { PDFMailDTO } from '../models/PDFMailDTO';

@Controller()
export class SendPDFMailKafkaMessageController {
  constructor(private readonly sendMailService: SendPDFMailProducerService) {}

  @MessagePattern('send-pdf-email')
  async watchMessages(@Payload() message: any, @Ctx() context: KafkaContext): Promise<void> {
    this.logInfos(context);
    const { to, nameTo, from, nameFrom, subject, attachmentName, attachmentContent, text } =
      message.value;

    await this.execute({
      to,
      from,
      subject,
      attachmentName,
      attachmentContent,
      text,
      nameTo,
      nameFrom,
    });
  }

  private logInfos(context: KafkaContext) {
    const { offset, timestamp, key, value } = context.getMessage();
    const prefix = `${context.getTopic()} [${context.getPartition()} | ${offset}] / ${timestamp}`;
    console.log(`- ${prefix} ${key}#${value}`);
  }

  private async execute(pdfMail: PDFMailDTO) {
    await this.sendMailService.sendMail(pdfMail);
  }
}
