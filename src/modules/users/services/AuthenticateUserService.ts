import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import AppError from '@shared/errors/appError'

import User from '../infra/typeorm/entities/User'
import iUsersRepository from '../repositories/iUsersRepository'

interface Request {
  email: string
  password: string
}

interface Response {
  user: User
  token: string
}

class AuthenticateUserService {
  constructor(private usersRepository: iUsersRepository) { }

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByMail(email)

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const secret = process.env.SECRET as string
    const expiresIn = process.env.EXPIRES

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    })

    return { user, token }
  }
}

export default AuthenticateUserService
