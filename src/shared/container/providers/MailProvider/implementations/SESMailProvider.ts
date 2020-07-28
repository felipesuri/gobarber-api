import nodemailer, { Transporter } from 'nodemailer'
import { injectable, inject } from 'tsyringe'
import aws from 'aws-sdk'

import iMailProvider from '../models/iMailProvider'
import iSendMailDTO from '../dtos/iSendMailDTO'
import iMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/iMailTemplateProvider'

import mailConfig from '@config/mail'

@injectable()
export default class SESMailProvider implements iMailProvider {
  private client: Transporter

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: iMailTemplateProvider
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: 'us-east-2',
      }),
    })
  }

  public async sendMail({
    to,
    subject,
    from,
    templateData,
  }: iSendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    })
  }
}
