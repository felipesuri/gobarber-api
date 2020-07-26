import { startOfHour, isBefore, getHours } from 'date-fns'
import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/appError'

import Appointment from '../infra/typeorm/entities/Appointment'

import iAppointmentsRepository from '../repositories/iAppointmentsRepository'

interface Request {
  date: Date
  provider_id: string
  user_id: string
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: iAppointmentsRepository
  ) {}

  public async execute({ date, provider_id, user_id }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    const beforeDate = isBefore(appointmentDate, Date.now())

    if (beforeDate) {
      throw new AppError("Your can't create an appointment on a past date.")
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create appointment with yourself")
    }

    const appointmentHour = getHours(appointmentDate)

    if (appointmentHour < 8 || appointmentHour > 17) {
      throw new AppError('You can only create appointment between 8am and 5am')
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    )

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked')
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
      user_id,
    })

    return appointment
  }
}

export default CreateAppointmentService
