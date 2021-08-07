import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'send-mail',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'pdf-report-email',
      },
    },
  });
  await app.listen().then(() => console.log('Kafka consumer service is listening!'));
}

bootstrap();
