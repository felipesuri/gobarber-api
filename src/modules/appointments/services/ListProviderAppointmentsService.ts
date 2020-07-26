import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/appError'

import iAppointmentsRepository from '../repositories/iAppointmentsRepository'
import Appointment from '../infra/typeorm/entities/Appointment'

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
    private appointmentRepository: iAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: Request): Promise<Appointment[]> {
    const appointments = await this.appointmentRepository.findAllInDayFromProvider({
      provider_id,
      year,
      month,
      day,
    })

    return appointments
  }
}

export default ListProviderAppointmentsService
