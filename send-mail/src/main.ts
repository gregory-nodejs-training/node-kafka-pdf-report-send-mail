import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { kafkaConfig } from './kafkaConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(kafkaConfig);

  await app.startAllMicroservices();

  await app.listen(3333, () => console.log('Kafka consumer service is listening!'));
}

bootstrap();
