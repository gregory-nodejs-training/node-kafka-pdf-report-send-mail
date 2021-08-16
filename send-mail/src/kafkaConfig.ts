import { KafkaOptions, Transport } from '@nestjs/microservices';

export const kafkaConfig: KafkaOptions = {
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
};
