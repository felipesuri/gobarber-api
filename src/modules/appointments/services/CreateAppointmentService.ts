import { startOfHour } from 'date-fns'
import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/appError'

import Appointment from '../infra/typeorm/entities/Appointment'

import iAppointmentsRepository from '../repositories/iAppointmentsRepository'

interface Request {
  date: Date
  provider_id: string
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: iAppointmentsRepository
  ) {}

  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    )

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked')
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    })

    return appointment
  }
}

export default CreateAppointmentService
