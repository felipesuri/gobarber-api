import { container } from 'tsyringe'

import mailConfig from '@config/mail'

import EtherealMailProvider from './implementations/EtherealMailProvider'
import SESMailProvider from './implementations/SESMailProvider'

import iMailProvider from '../MailProvider/models/iMailProvider'

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
}

container.registerInstance<iMailProvider>('MailProvider', providers[mailConfig.driver])
