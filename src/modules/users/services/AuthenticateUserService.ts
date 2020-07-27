import { sign } from 'jsonwebtoken'
import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/appError'
import auth from '@config/auth'

import User from '../infra/typeorm/entities/User'
import iUsersRepository from '../repositories/iUsersRepository'
import iHashProvider from '../providers/HashProvider/models/iHashProvider'

require('dotenv').config()

interface Request {
  email: string
  password: string
}

interface Response {
  user: User
  token: string
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: iUsersRepository,

    @inject('HashProvider')
    private hashProvider: iHashProvider
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByMail(email)

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const passwordMatched = await this.hashProvider.compareHash(password, user.password)

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const { expiresIn, secret } = auth.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })

    return { user, token }
  }
}

export default AuthenticateUserService
