declare namespace Express {
    export interface Request {
        producer?: import('../../../node_modules/kafkajs/types').Producer;
    }
}
