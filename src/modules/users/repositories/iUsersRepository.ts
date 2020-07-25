import User from '../infra/typeorm/entities/User'
import iCreateUserDTO from '../dtos/iCreateUserDTO'
import iFindAllProvidersDTO from '../dtos/iFindAllProvidersDTO'

export default interface iUsersRepository {
  findAllProviders(data: iFindAllProvidersDTO): Promise<User[]>
  findById(id: string): Promise<User | undefined>
  findByMail(email: string): Promise<User | undefined>
  create(data: iCreateUserDTO): Promise<User>
  update(user: User): Promise<User>
}
