import iMailProvider from '../models/iMailProvider'
import iSendMailDTO from '../dtos/iSendMailDTO'

export default class FakeMailProvider implements iMailProvider {
  private messages: iSendMailDTO[] = []

  public async sendMail(message: iSendMailDTO): Promise<void> {
    this.messages.push(message)
  }
}
