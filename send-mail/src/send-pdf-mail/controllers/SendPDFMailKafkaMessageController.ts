import { Controller, OnModuleInit } from '@nestjs/common';
import {
  Client,
  ClientKafka,
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { kafkaConfig } from 'src/kafkaConfig';
import { SEND_PDF_MAIL_TOPIC } from '../constants/sendPDFMailConstants';
import { SendPDFMailProducerService } from '../jobs/SendPDFMailProducerService';
import { PDFMailDTO } from '../models/PDFMailDTO';

@Controller()
export class SendPDFMailKafkaMessageController implements OnModuleInit {
  constructor(private readonly sendMailService: SendPDFMailProducerService) {}

  @Client(kafkaConfig)
  private client!: ClientKafka;

  onModuleInit() {
    this.client.subscribeToResponseOf(SEND_PDF_MAIL_TOPIC);
  }

  @MessagePattern(SEND_PDF_MAIL_TOPIC)
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
