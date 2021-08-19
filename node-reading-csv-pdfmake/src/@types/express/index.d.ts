declare namespace Express {
    export interface Request {
        userId: string;
        producer?: import('../../../node_modules/kafkajs/types').Producer;
    }
}
