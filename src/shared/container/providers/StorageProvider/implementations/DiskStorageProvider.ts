import fs from 'fs'
import path from 'path'

import uploadConfig from '@config/upload'
import iStorageProvider from '../models/iStorageProvider'

class DiskStorageProvider implements iStorageProvider {
  public async saveFile(file: string): Promise<string> {
    const { tmpFolder, uploadsFolder } = uploadConfig

    await fs.promises.rename(
      path.resolve(tmpFolder, file),
      path.resolve(tmpFolder, uploadsFolder, file)
    )

    return file
  }

  public async deleteFile(file: string): Promise<void> {
    const { uploadsFolder } = uploadConfig

    const filePath = path.resolve(uploadsFolder, file)

    try {
      await fs.promises.stat(filePath)
    } catch {
      return
    }

    await fs.promises.unlink(filePath)
  }
}

export default DiskStorageProvider
