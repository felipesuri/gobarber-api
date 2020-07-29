import fs from 'fs'
import path from 'path'
import mime from 'mime'
import aws, { S3 } from 'aws-sdk'

import uploadConfig from '@config/upload'
import iStorageProvider from '../models/iStorageProvider'

class DiskStorageProvider implements iStorageProvider {
  private client: S3

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-2',
    })
  }

  public async saveFile(file: string): Promise<string> {
    const { tmpFolder, config } = uploadConfig
    const originalPath = path.resolve(tmpFolder, file)

    const fileContent = await fs.promises.readFile(originalPath)

    const ContentType = mime.getType(originalPath)

    if (!ContentType) {
      throw new Error('File does not found')
    }

    await this.client
      .putObject({
        Bucket: config.aws.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise()

    await fs.promises.unlink(originalPath)

    return file
  }

  public async deleteFile(file: string): Promise<void> {
    const { config } = uploadConfig

    await this.client
      .deleteObject({
        Bucket: config.aws.bucket,
        Key: file,
      })
      .promise()
  }
}

export default DiskStorageProvider
