import AppError from '@shared/errors/appError'

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderDayAvailability: ListProviderDayAvailabilityService

describe('ListProviders', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository
    )
  })

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 23, 14, 0, 0),
      user_id: 'non-user',
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 23, 15, 0, 0),
      user_id: 'non-user',
    })

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 23, 11).getTime()
    })

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      day: 23,
      year: 2020,
      month: 7,
    })

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ])
    )
  })
})
