import nodemailer, { Transporter } from 'nodemailer'
import { injectable, inject } from 'tsyringe'

import iMailProvider from '../models/iMailProvider'
import iSendMailDTO from '../dtos/iSendMailDTO'
import iMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/iMailTemplateProvider'

@injectable()
export default class EtherealMailProvider implements iMailProvider {
  private client: Transporter

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: iMailTemplateProvider
  ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      })

      this.client = transporter
    })
  }

  public async sendMail({ to, subject, from, templateData }: iSendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'equipe@gobarber.com.br'
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData)
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}
