import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/appError'

import User from '../infra/typeorm/entities/User'
import iUsersRepository from '../repositories/iUsersRepository'

interface Request {
  user_id: string
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: iUsersRepository
  ) {}

  public async execute({ user_id }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found.')
    }

    return user
  }
}

export default ShowProfileService
