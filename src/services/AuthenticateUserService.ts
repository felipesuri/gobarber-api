import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import authConfig from '../config/auth'

import AppError from '../errors/appError'

import User from '../models/User'

interface Request {
  email: string
  password: string
}

interface Response {
  user: User
  token: string
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne({ where: { email } })

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const JWTConfig = authConfig.jwt

    const secret = process.env.SECRET || JWTConfig.secret
    const expiresIn = process.env.EXPIRES || JWTConfig.expiresIn

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    })

    return { user, token }
  }
}

export default AuthenticateUserService
