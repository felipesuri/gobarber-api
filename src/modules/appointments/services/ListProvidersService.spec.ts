import FakeUsersRepository from '@modules/users/repositories/fakes/fakeUsersRepository'
import ListProvidersService from './ListProvidersService'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/fakeCacheProvider'

let fakeUsersRepository: FakeUsersRepository
let listProviders: ListProvidersService
let fakeCacheProvider: FakeCacheProvider

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeCacheProvider = new FakeCacheProvider()

    listProviders = new ListProvidersService(fakeUsersRepository, fakeCacheProvider)
  })

  it('should be able to list providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@tests.com',
      password: '123456',
    })

    const user2 = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@tests.com',
      password: '123456',
    })

    const user3 = await fakeUsersRepository.create({
      name: 'Equipe GoBarber',
      email: 'equipe@gobarber.com',
      password: '123456',
    })

    const loggedUser = await fakeUsersRepository.create({
      name: 'felipesuri',
      email: 'felipe@felipesuri.com',
      password: '123456',
    })

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    })

    expect(providers).toEqual([user1, user2, user3])
  })
})
