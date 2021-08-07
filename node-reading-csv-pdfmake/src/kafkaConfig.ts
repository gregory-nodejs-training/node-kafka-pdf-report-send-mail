import { Kafka, logLevel } from 'kafkajs';

const KAFKA_INSTANCE = new Kafka({
  clientId: 'build-pdf',
  brokers: ['localhost:9092'],
  logLevel: logLevel.WARN,
  retry: {
    initialRetryTime: 300,
    retries: 10
  }
});

const PRODUCER = KAFKA_INSTANCE.producer();
// const ADMIN = KAFKA_INSTANCE.admin();

export { PRODUCER };
