import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CONSUMER } from './kafkaConfig';
import { SendPDFMailKafkaMessageConsumer } from './send-pdf-mail/SendPDFMailKafkaMessageConsumer';

const sendPDFMailKafkaMessageConsumer = new SendPDFMailKafkaMessageConsumer();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await CONSUMER.connect();
  await CONSUMER.subscribe({ topic: 'send-pdf-email' });
  await sendPDFMailKafkaMessageConsumer.watchMessages();

  await app.listen(3000);
}

bootstrap();
