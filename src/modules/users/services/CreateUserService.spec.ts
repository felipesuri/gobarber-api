import AppError from '@shared/errors/appError'

import FakeUsersRepository from '../repositories/fakes/fakeUsersRepository'
import CreateUserService from './CreateUserService'

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const createUser = new CreateUserService(fakeUsersRepository)

    const appointment = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(appointment).toHaveProperty('id')
  })

  it('should be not able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const createUser = new CreateUserService(fakeUsersRepository)

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(
      createUser.execute({
        name: 'John Doe Two',
        email: 'johndoe@example.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
