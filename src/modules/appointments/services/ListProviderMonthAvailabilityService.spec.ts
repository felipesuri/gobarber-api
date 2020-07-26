import AppError from '@shared/errors/appError'

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderMonthAvailability: ListProviderMonthAvailabilityService

describe('ListProviders', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository
    )
  })

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 23, 8, 0, 0),
      user_id: 'user',
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 23, 9, 0, 0),
      user_id: 'user',
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 23, 10, 0, 0),
      user_id: 'user',
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 23, 11, 0, 0),
      user_id: 'user',
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 23, 12, 0, 0),
      user_id: 'user',
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 23, 13, 0, 0),
      user_id: 'user',
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 23, 14, 0, 0),
      user_id: 'user',
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 23, 15, 0, 0),
      user_id: 'user',
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 23, 16, 0, 0),
      user_id: 'user',
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 23, 17, 0, 0),
      user_id: 'user',
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 24, 9, 0, 0),
      user_id: 'user',
    })

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 7,
    })

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 22, available: true },
        { day: 23, available: false },
        { day: 24, available: true },
        { day: 25, available: true },
      ])
    )
  })
})
