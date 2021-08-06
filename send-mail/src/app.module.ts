import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule, InjectQueue } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MiddlewareBuilder } from '@nestjs/core';
import { Queue } from 'bull';
import { SEND_PDF_MAIL_QUEUE } from './send-pdf-mail/constants/sendPDFMailConstants';
import { SendPDFMailConsumer } from './send-pdf-mail/jobs/SendPDFMailConsumer';
import { SendPDFMailProducerService } from './send-pdf-mail/jobs/SendPDFMailProducerService';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';
import { SendPDFMailKafkaMessageConsumer } from './send-pdf-mail/SendPDFMailKafkaMessageConsumer';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV?.trim() === 'dev' ? '.env.test' : '.env',
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
    }),
    BullModule.registerQueue({
      name: SEND_PDF_MAIL_QUEUE,
    }),
  ],
  controllers: [],
  providers: [SendPDFMailProducerService, SendPDFMailConsumer, SendPDFMailKafkaMessageConsumer],
})
export class AppModule {
  constructor(
    @InjectQueue(SEND_PDF_MAIL_QUEUE)
    private sendPDFMailQueue: Queue
  ) {}

  configure(consumer: MiddlewareBuilder) {
    const { router } = createBullBoard([new BullAdapter(this.sendPDFMailQueue)]);
    consumer.apply(router).forRoutes('admin/queues');
  }
}
