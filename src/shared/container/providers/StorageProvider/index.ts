import { container } from 'tsyringe'
import uploadConfig from '@config/upload'

import iStorageProvider from '../StorageProvider/models/iStorageProvider'
import DiskStorageProvider from '../StorageProvider/implementations/DiskStorageProvider'
import S3StorageProvider from '../StorageProvider/implementations/S3StorageProvider'

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
}

container.registerSingleton<iStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver]
)
