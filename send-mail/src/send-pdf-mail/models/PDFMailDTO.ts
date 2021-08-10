class PDFMailDTO {
  to!: string;
  nameTo?: string;
  from!: string;
  nameFrom?: string;
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
    text?: string,
    nameTo?: string,
    nameFrom?: string
  ) {
    this.to = to;
    this.nameTo = nameTo;
    this.from = from;
    this.nameFrom = nameFrom;
    this.subject = subject;
    this.text = text;
    this.attachmentName = attachmentName;
    this.attachmentContent = attachmentContent;
  }
}

export { PDFMailDTO };
