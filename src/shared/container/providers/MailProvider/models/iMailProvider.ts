import iSendMailDTO from '../dtos/iSendMailDTO'

export default interface iMailProvider {
  sendMail(data: iSendMailDTO): Promise<void>
}
