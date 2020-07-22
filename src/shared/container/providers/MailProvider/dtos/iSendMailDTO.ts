import iParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/iParseMailTemplateDTO'

interface iMailContact {
  name: string
  email: string
}

export default interface iSendMailDTO {
  to: iMailContact
  from?: iMailContact
  subject: string
  templateData: iParseMailTemplateDTO
}
