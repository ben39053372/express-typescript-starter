import config from "../../config"

export default (to: string) => {
  return {
    from: config.email.auth.user, // sender address
    to, // list of receivers
    subject: "Welcome New User!", // Subject line
    text: "Hello new user", // plain text body
    html: "<b>Hello new user</b>", // html body
  }
}