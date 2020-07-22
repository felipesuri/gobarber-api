import { container } from 'tsyringe'

import iStorageProvider from './StorageProvider/models/iStorageProvider'
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider'

import iMailProvider from './MailProvider/models/iMailProvider'
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider'

container.registerSingleton<iStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
)

container.registerInstance<iMailProvider>(
  'MailProvider',
  new EtherealMailProvider()
)
