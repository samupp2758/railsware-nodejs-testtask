import nodemailer from 'nodemailer'

export class MailTrapClient {
  transporter
  config = {}

  constructor ({
    user,
    pass,
    host,
    port
  }: {
    user: string,
    pass: string,
    host?: string,
    port?:number
  }) {

    this.config = {
      host: host || "sandbox.smtp.mailtrap.io",
      port: port || 2525,
      secure: false,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: user,
        pass: pass
      },
      tls: {
        ciphers: 'SSLv3'
      }
    }

    this.transporter = nodemailer.createTransport(this.config)
  }

  // async..await is not allowed in global scope, must use a wrapper
  async send ({
    from,
    to,
    subject,
    text,
    html,
    attachments
  }: {
    from: string
    to: string | object
    subject?: string
    text?: string
    html?: string,
    attachments?: object
  }): Promise<Object> {
    // send mail with defined transport object
    try {
      const info = await this.transporter.sendMail({
        from, // sender address
        to, // list of receivers
        subject: subject || "Empty Subject", // Subject line
        text: text || "Empty Text", // plain text body
        html: html || "Empty Body", // html body
        attachments: attachments || []
      })

      return info
    } catch (e) {
      throw 'Error:' + e + "\n" + JSON.stringify(this.config)
    }
  }
}
