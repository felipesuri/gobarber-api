import { startOfHour, isBefore, getHours, format } from 'date-fns'
import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/appError'

import Appointment from '../infra/typeorm/entities/Appointment'

import iAppointmentsRepository from '../repositories/iAppointmentsRepository'
import iNotificationsRepository from '@modules/notifications/repositories/iNotificationsRepository'
import iCacheProvider from '@shared/container/providers/CacheProvider/models/iCacheProvider'

interface Request {
  date: Date
  provider_id: string
  user_id: string
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: iAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: iNotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: iCacheProvider
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
      appointmentDate,
      provider_id
    )

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked')
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
      user_id,
    })

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'ás' HH:mm")

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${dateFormatted}`,
    })

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(appointmentDate, 'yyyy-M-d')}`
    )

    return appointment
  }
}

export default CreateAppointmentService
