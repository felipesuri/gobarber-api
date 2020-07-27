import AppError from '@shared/errors/appError'

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/fakeNotificationsRepository'
import CreateAppointmentService from './CreateAppointmentService'

let fakeAppointmentRepository: FakeAppointmentsRepository
let fakeNotificationsRepository: FakeNotificationsRepository
let createAppointment: CreateAppointmentService

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository()
    fakeNotificationsRepository = new FakeNotificationsRepository()

    createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
      fakeNotificationsRepository
    )
  })

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 26, 11).getTime()
    })

    const appointment = await createAppointment.execute({
      date: new Date(2020, 6, 26, 13),
      provider_id: 'provider_id',
      user_id: 'non-user',
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('provider_id')
  })

  it('should not be able to create two appointment on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 10, 9).getTime()
    })

    const appointmentDate = new Date(2020, 6, 10, 11)

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: 'provider_id',
      user_id: 'non-user',
    })

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: 'provider_id',
        user_id: 'non-user',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment on past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 10, 11),
        provider_id: 'provider_id',
        user_id: 'non-user',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 10, 13),
        provider_id: 'user_id',
        user_id: 'user_id',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 11, 7),
        provider_id: 'provider_id',
        user_id: 'user_id',
      })
    ).rejects.toBeInstanceOf(AppError)
    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 11, 18),
        provider_id: 'provider_id',
        user_id: 'user_id',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
