import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/appError'

import User from '../infra/typeorm/entities/User'
import iUsersRepository from '../repositories/iUsersRepository'
import iStorageProvider from '@shared/container/providers/StorageProvider/models/iStorageProvider'
import iCacheProvider from '@shared/container/providers/CacheProvider/models/iCacheProvider'

interface Request {
  user_id: string
  avatarFilename: string
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: iUsersRepository,

    @inject('StorageProvider')
    private storageProvider: iStorageProvider,

    @inject('CacheProvider')
    private cacheProvider: iCacheProvider,
  ) {}

  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401)
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar)
    }

    const filename = await this.storageProvider.saveFile(avatarFilename)

    user.avatar = filename

    await this.cacheProvider.invalidatePrefix('providers-list')

    await this.usersRepository.update(user)

    return user
  }
}

export default UpdateUserAvatarService
