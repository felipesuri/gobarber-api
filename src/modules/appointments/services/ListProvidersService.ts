import { injectable, inject } from 'tsyringe'
import { classToClass } from 'class-transformer'

import User from '@modules/users/infra/typeorm/entities/User'
import iUsersRepository from '@modules/users/repositories/iUsersRepository'
import iCacheProvider from '@shared/container/providers/CacheProvider/models/iCacheProvider'

interface Request {
  user_id: string
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: iUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: iCacheProvider
  ) {}

  public async execute({ user_id }: Request): Promise<User[]> {
   //  let users = await this.cacheProvider.recover<User[]>(`providers-list:${user_id}`)
   let users

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      })

      await this.cacheProvider.save(`providers-list:${user_id}`, classToClass(users))
    }

    return users
  }
}

export default ListProvidersService
