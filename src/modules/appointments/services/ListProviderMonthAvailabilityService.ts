import { injectable, inject } from 'tsyringe'
import { getDaysInMonth, getDate } from 'date-fns'

import AppError from '@shared/errors/appError'

import iAppointmentsRepository from '../repositories/iAppointmentsRepository'

interface Request {
  provider_id: string
  month: number
  year: number
}

type Response = Array<{
  day: number
  available: boolean
}>

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: iAppointmentsRepository
  ) {}

  public async execute({ provider_id, year, month }: Request): Promise<Response> {
    const appointments = await this.appointmentRepository.findAllInMonthFromProvider({
      provider_id,
      year,
      month,
    })

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1))

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1
    )

    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day
      })

      return {
        day,
        available: appointmentsInDay.length < 10,
      }
    })

    return availability
  }
}

export default ListProviderMonthAvailabilityService
