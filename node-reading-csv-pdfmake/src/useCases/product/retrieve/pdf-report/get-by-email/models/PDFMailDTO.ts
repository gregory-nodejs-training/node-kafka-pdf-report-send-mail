import { IsEmail, IsNotEmpty } from 'class-validator';

class PDFMailDTO {
  @IsEmail()
  @IsNotEmpty()
  to: string;

  nameTo?: string;

  @IsEmail()
  @IsNotEmpty()
  from: string;

  nameFrom?: string;

  @IsNotEmpty()
  subject: string;

  text?: string;

  @IsNotEmpty()
  attachmentName: string;

  attachmentContent: any;

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
