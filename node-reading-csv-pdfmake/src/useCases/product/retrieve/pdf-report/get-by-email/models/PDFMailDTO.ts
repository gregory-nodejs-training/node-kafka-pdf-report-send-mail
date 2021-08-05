class PDFMailDTO {
  to!: string;
  from!: string;
  subject!: string;
  text?: string;
  attachmentName!: string;
  attachmentContent!: any;

  constructor(
    to: string,
    from: string,
    subject: string,
    attachmentName: string,
    attachmentContent: any,
    text?: string
  ) {
    this.to = to;
    this.from = from;
    this.subject = subject;
    this.text = text;
    this.attachmentName = attachmentName;
    this.attachmentContent = attachmentContent;
  }
}

export { PDFMailDTO };
