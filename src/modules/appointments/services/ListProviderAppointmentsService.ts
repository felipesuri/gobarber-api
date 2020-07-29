import { injectable, inject } from 'tsyringe'

import iAppointmentsRepository from '../repositories/iAppointmentsRepository'
import Appointment from '../infra/typeorm/entities/Appointment'
import iCacheProvider from '@shared/container/providers/CacheProvider/models/iCacheProvider'

interface Request {
  provider_id: string
  month: number
  day: number
  year: number
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: iAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: iCacheProvider
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: Request): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`

    let appointments = await this.cacheProvider.recover<Appointment[]>(cacheKey)

    if (!appointments) {
      appointments = await this.appointmentRepository.findAllInDayFromProvider({
        provider_id,
        year,
        month,
        day,
      })

      await this.cacheProvider.save(cacheKey, appointments)
    }

    return appointments
  }
}

export default ListProviderAppointmentsService
