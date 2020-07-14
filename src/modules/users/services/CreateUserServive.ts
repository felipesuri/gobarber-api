import { hash } from 'bcryptjs'

import AppError from '@shared/errors/appError'

import User from '../infra/typeorm/entities/User'
import iUsersRepository from '../repositories/iUsersRepository'

interface Request {
  name: string;
  email: string;
  password: string
}

class CreateUserService {
  constructor(private usersRepository: iUsersRepository) { }

  public async execute({ name, email, password }: Request): Promise<User> {
    const checkUserExists = await this.usersRepository.findByMail(email)

    if (checkUserExists) {
      throw new AppError('Email address already user')
    }

    const hashedPassword = await hash(password, 8)

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword
    })

    return user
  }
}

export default CreateUserService
