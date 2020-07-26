import { uuid } from 'uuidv4'

import iUsersRepository from '@modules/users/repositories/iUsersRepository'
import iCreateUserDTO from '@modules/users/dtos/iCreateUserDTO'
import iFindAllProvidersDTO from '@modules/users/dtos/iFindAllProvidersDTO'

import User from '@modules/users/infra/typeorm/entities/User'

class fakeUsersRepository implements iUsersRepository {
  private users: User[] = []

  public async findAllProviders({
    except_user_id,
  }: iFindAllProvidersDTO): Promise<User[]> {
    let { users } = this

    if (except_user_id) {
      users = this.users.filter(user => user.id !== except_user_id)
    }

    return users
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id)

    return findUser
  }

  public async findByMail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email)

    return findUser
  }

  public async create({ name, email, password }: iCreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, { id: uuid(), name, email, password })

    this.users.push(user)

    return user
  }

  public async update(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id)

    this.users[findIndex] = user

    return user
  }
}

export default fakeUsersRepository
