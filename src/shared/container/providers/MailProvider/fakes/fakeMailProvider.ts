import iMailProvider from '../models/iMailProvider'

interface Message {
  to: string
  body: string
}

export default class FakeMailProvider implements iMailProvider {
  private messages: Message[] = []

  public async sendMail(to: string, body: string): Promise<void> {
    this.messages.push({
      to,
      body
    })
  }
}
