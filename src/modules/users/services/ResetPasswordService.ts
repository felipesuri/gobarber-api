import { injectable, inject } from 'tsyringe'
import { differenceInHours } from 'date-fns'

import AppError from '@shared/errors/appError'

// import User from '../infra/typeorm/entities/User'
import iUsersRepository from '../repositories/iUsersRepository'
import iUserTokensRepository from '@modules/users/repositories/iUserTokensRepository'
import iHashProvider from '../providers/HashProvider/models/iHashProvider'

interface Request {
  password: string
  token: string
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: iUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: iUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: iHashProvider
  ) {}

  public async execute({ token, password }: Request): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('User token does not exists')
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    if (!user) {
      throw new AppError('User does not exists')
    }

    const tokenCreatedAt = userToken.created_at

    const differentHours = differenceInHours(Date.now(), tokenCreatedAt)

    if (differentHours > 2) {
      throw new AppError('Token expired')
    }

    user.password = await this.hashProvider.generateHash(password)

    await this.usersRepository.update(user)
  }
}

export default ResetPasswordService
