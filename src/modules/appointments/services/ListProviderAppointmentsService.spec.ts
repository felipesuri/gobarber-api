import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/fakeCacheProvider'
import ListProviderAppointmentsService from './ListProviderAppointmentsService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderAppointmentsService: ListProviderAppointmentsService
let fakeCacheProvider: FakeCacheProvider

describe('ListProviders', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    fakeCacheProvider = new FakeCacheProvider()
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider
    )
  })

  it('should be able to list the appointments on specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 6, 26, 14, 0, 0),
      user_id: 'user_id',
    })

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 6, 26, 15, 0, 0),
      user_id: 'user_id',
    })

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider',
      day: 26,
      year: 2020,
      month: 7,
    })

    expect(appointments).toEqual(expect.arrayContaining([appointment1, appointment2]))
  })
})
