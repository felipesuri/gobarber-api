import AppError from '@shared/errors/appError'

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService'

let fakeAppointmentRepository: FakeAppointmentsRepository
let createAppointment: CreateAppointmentService

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository()
    createAppointment = new CreateAppointmentService(fakeAppointmentRepository)
  })

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '121212',
      user_id: 'non-user',
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('121212')
  })

  it('should not be able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 6, 10, 11)

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '121212',
      user_id: 'non-user',
    })

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '121213',
        user_id: 'non-user',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
