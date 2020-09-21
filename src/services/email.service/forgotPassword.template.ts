import config from "../../config"

export default (to: string) => {
  return {
    from: config.email.auth.user, // sender address
    to, // list of receivers
    subject: "Reset Password!", // Subject line
    text: "reset password", // plain text body
    html: "<b>reset password</b>", // html body
  }
}