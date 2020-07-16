import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/appError'

import User from '../infra/typeorm/entities/User'
import iUsersRepository from '../repositories/iUsersRepository'
import iHashProvider from '../providers/HashProvider/models/iHashProvider'

interface Request {
  name: string;
  email: string;
  password: string
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: iUsersRepository,

    @inject('HashProvider')
    private hashProvider: iHashProvider
  ) { }

  public async execute({ name, email, password }: Request): Promise<User> {
    const checkUserExists = await this.usersRepository.findByMail(email)

    if (checkUserExists) {
      throw new AppError('Email address already user')
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword
    })

    return user
  }
}

export default CreateUserService
