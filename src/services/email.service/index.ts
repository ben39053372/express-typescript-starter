import { Inject, Service } from "typedi";
import Mail from "nodemailer/lib/mailer";
import newUserTemplate from './newUserEmail.template'
import forgotPasswordTemlate from './forgotPassword.template'
import { emailType, emailDetail } from "../../interfaces/email.t";


@Service()
export class EmailService {

  constructor(
    @Inject('email-client')
    private emailClient: Mail,
  ) { }

  async send(type: emailType, to: string) {
    let header: emailDetail
    switch (type) {
      case emailType.createUserEmail: {
        header = newUserTemplate(to)
        break
      }
      case emailType.forgotPasswordEmail: {
        header = forgotPasswordTemlate(to)
        break
      }
      default: {
        throw new Error('email type error')
      }
    }
    let info = await this.emailClient.sendMail(header)

    console.log("Message sent: %s", info.messageId)
  }

}