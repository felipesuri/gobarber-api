import { injectable, inject } from 'tsyringe'
import { getHours, isAfter } from 'date-fns'

import iAppointmentsRepository from '../repositories/iAppointmentsRepository'

interface Request {
  provider_id: string
  month: number
  day: number
  year: number
}

type Response = Array<{
  hour: number
  available: boolean
}>

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: iAppointmentsRepository
  ) {}

  public async execute({ provider_id, year, month, day }: Request): Promise<Response> {
    const appointments = await this.appointmentRepository.findAllInDayFromProvider({
      provider_id,
      year,
      month,
      day,
    })

    const hourStart = 8

    const eachHourArray = Array.from({ length: 10 }, (_, index) => index + hourStart)
    const currentDate = new Date(Date.now())

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour
      )

      const compareDate = new Date(year, month - 1, day, hour)

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      }
    })

    return availability
  }
}

export default ListProviderDayAvailabilityService
