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

  // it('should not be able to create two appointment on the same time', () => {
  //   expect(1 + 1).toBe(2)
  // })
})
