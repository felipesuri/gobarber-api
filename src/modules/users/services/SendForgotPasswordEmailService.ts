import { injectable, inject } from 'tsyringe'
import path from 'path'

import AppError from '@shared/errors/appError'

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

    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs')

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password/token=${token}`
        }
      }
    })
  }
}

export default SendForgotPasswordEmailService
