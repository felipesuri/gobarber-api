import { container } from 'tsyringe'
import mailConfig from '@config/mail'

import iStorageProvider from './StorageProvider/models/iStorageProvider'
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider'

import iMailProvider from './MailProvider/models/iMailProvider'
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider'
import SESMailProvider from './MailProvider/implementations/SESMailProvider'

import iMailTemplateProvider from './MailTemplateProvider/models/iMailTemplateProvider'
import HandleBarsMailTemplateProvider from './MailTemplateProvider/implementations/HandleBarsMailTemplateProvider'

container.registerSingleton<iStorageProvider>('StorageProvider', DiskStorageProvider)

container.registerSingleton<iMailTemplateProvider>(
  'MailTemplateProvider',
  HandleBarsMailTemplateProvider
)

container.registerInstance<iMailProvider>(
  'MailProvider',

  mailConfig.driver === 'ethereal'
    ? container.resolve(EtherealMailProvider)
    : container.resolve(SESMailProvider)
)
