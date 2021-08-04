import { Producer } from "kafkajs";

interface IEmailInfos {
    to: string;
    from: string;
    subject: string;
    text?: string;
    attachmentName: string;
}

class GetProductsPDFReportByEmailService {

    async execute(emailInfos: IEmailInfos, producer: Producer) {}
}

export { GetProductsPDFReportByEmailService };