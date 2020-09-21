export enum emailType {
  createUserEmail = 'createUserEmail',
  forgotPasswordEmail = 'forgotPasswordEmail'
}

export interface emailDetail {
  from: string | undefined;
  to: string;
  subject: string;
  text: string;
  html: string;
}