import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/appError'

import User from '../infra/typeorm/entities/User'
import iUsersRepository from '../repositories/iUsersRepository'
import iHashProvider from '../providers/HashProvider/models/iHashProvider'

interface Request {
  user_id: string
  name: string
  email: string
  old_password?: string
  password?: string
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: iUsersRepository,

    @inject('HashProvider')
    private hashProvider: iHashProvider
  ) {}

  public async execute({
    name,
    email,
    user_id,
    password,
    old_password,
  }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found.')
    }

    const userWithUpdatedEmail = await this.usersRepository.findByMail(email)

    if (userWithUpdatedEmail && user_id !== userWithUpdatedEmail.id) {
      throw new AppError('E-mail already in use.')
    }

    user.name = name
    user.email = email

    if (password && !old_password) {
      throw new AppError('You need the inform old password to set a new password.')
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password
      )

      if (!checkOldPassword) {
        throw new AppError('Old password does not match')
      }

      user.password = await this.hashProvider.generateHash(password)
    }

    return this.usersRepository.update(user)
  }
}

export default UpdateProfileService
