import { Inject } from '@nestjs/common';
import { CONSUMER } from 'src/kafkaConfig';
import { SendPDFMailProducerService } from './jobs/SendPDFMailProducerService';
import { PDFMailDTO } from './models/PDFMailDTO';

export class SendPDFMailKafkaMessageConsumer {
  //   constructor(private sendMailService: SendPDFMailProducerService) {}

  @Inject()
  private readonly sendMailService!: SendPDFMailProducerService;

  async watchMessages() {
    await CONSUMER.run({
      eachMessage: async ({ topic, partition, message }) => {
        const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
        console.log(`- ${prefix} ${message.key}#${message.value}`);

        const { to, from, subject, attachmentName, attachmentContent, text } = JSON.parse(
          String(message.value)
        );

        await this.execute({
          to,
          from,
          subject,
          attachmentName,
          attachmentContent,
          text,
        });
      },
    });
  }

  private async execute(pdfMail: PDFMailDTO) {
    await this.sendMailService.sendMail(pdfMail);
  }
}
