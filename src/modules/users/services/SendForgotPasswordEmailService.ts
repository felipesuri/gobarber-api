import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/appError'

// import User from '../infra/typeorm/entities/User'
import iUsersRepository from '../repositories/iUsersRepository'
import iMailProvider from '@shared/container/providers/MailProvider/models/iMailProvider'
import iUserTokensRepository from '@modules/users/repositories/iUserTokensRepository'

interface Request {
  email: string
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: iUsersRepository,

    @inject('MailProvider')
    private mailProvider: iMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: iUserTokensRepository
  ) { }

  public async execute({ email }: Request): Promise<void> {
    const user = await this.usersRepository.findByMail(email)

    if (!user) {
      throw new AppError('User this not exists.')
    }

    const { token } = await this.userTokensRepository.generate(user.id)

    await this.mailProvider.sendMail(
      email,
      `Pedido de recuperação de senha recebido, utilize esse token: ${token}`
    )
  }
}

export default SendForgotPasswordEmailService
