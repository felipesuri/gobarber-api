import { container } from 'tsyringe'

import iStorageProvider from './StorageProvider/models/iStorageProvider'
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider'

container.registerSingleton<iStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
)
