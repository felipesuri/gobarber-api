import User from '../infra/typeorm/entities/User'
import iCreateUserDTO from '../dtos/iCreateUserDTO'

export default interface iUsersRepository {
  findById(id: string): Promise<User | undefined>
  findByMail(email: string): Promise<User | undefined>
  create(data: iCreateUserDTO): Promise<User>
  update(user: User): Promise<User>
}
