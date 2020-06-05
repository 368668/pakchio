const nodemailer = require("nodemailer");
const {
  senderAddress,
  user,
  pass
} = require("./../config").email
class SendEmail {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.qq.com", // qq邮箱主机
      secure: true, // 使用 SSL
      secureConnection: true, // 使用 SSL
      port: 465, // SMTP 端口
      auth: {
        user, // generated ethereal user
        pass // generated ethereal password
      }
    });
  }
  send(options) {
    return this.transporter.sendMail({
      from: senderAddress,
      ...options
    })
  }
}
const email = new SendEmail()
module.exports = email