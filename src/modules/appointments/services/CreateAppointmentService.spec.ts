import AppError from '@shared/errors/appError'

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService'

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository()
    const createAppointment = new CreateAppointmentService(fakeAppointmentRepository)

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '121212'
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('121212')
  })

  it('should not be able to create two appointment on the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository()
    const createAppointment = new CreateAppointmentService(fakeAppointmentRepository)

    const appointmentDate = new Date(2020, 6, 10, 11)

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '121212'
    })

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '121213'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
