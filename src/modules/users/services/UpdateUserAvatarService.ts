import path from 'path'
import fs from 'fs'
import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/appError'

import User from '../infra/typeorm/entities/User'
import iUsersRepository from '../repositories/iUsersRepository'
import uploadConfig from '@config/upload'

interface Request {
  user_id: string
  avatarFilename: string
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: iUsersRepository
  ) { }

  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401)
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFilename

    return user
  }
}

export default UpdateUserAvatarService
