import { injectable, inject } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'
import iUsersRepository from '@modules/users/repositories/iUsersRepository'

interface Request {
  user_id: string
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: iUsersRepository
  ) { }

  public async execute({ user_id }: Request): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({
      except_user_id: user_id
    })

    return users
  }
}

export default ListProvidersService
