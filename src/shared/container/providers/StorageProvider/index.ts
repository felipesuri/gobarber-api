import { container } from 'tsyringe'

import iStorageProvider from '../StorageProvider/models/iStorageProvider'
import DiskStorageProvider from '../StorageProvider/implementations/DiskStorageProvider'

const providers = {
  disk: DiskStorageProvider,
}

container.registerSingleton<iStorageProvider>('StorageProvider', providers.disk)
