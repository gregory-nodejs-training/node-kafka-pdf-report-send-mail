import { Kafka, logLevel } from 'kafkajs';

const KAFKA_INSTANCE = new Kafka({
  clientId: 'send-mail',
  brokers: ['localhost:9092'],
  logLevel: logLevel.WARN,
});

const CONSUMER = KAFKA_INSTANCE.consumer({ groupId: 'products-pdf-report-sender' });

export { CONSUMER };
