import { getRepository, Repository } from 'typeorm'

import iUsersRepository from '@modules/users/repositories/iUsersRepository'
import iCreateUserDTO from '@modules/users/dtos/iCreateUserDTO'

import User from '../entities/User'

class UsersRepository implements iUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id)

    return user
  }

  public async findByMail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email }
    })

    return user
  }

  public async create({ name, email, password }: iCreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ name, email, password })

    await this.ormRepository.save(user)

    return user
  }

  public update(user: User): Promise<User> {
    return this.ormRepository.save(user)
  }
}

export default UsersRepository
