import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import iCreateAppointmentDTO from '../dtos/iCreateAppointmentDTO'
import iFindAllInMonthFromProviderDTO from '../dtos/iFindAllInMonthFromProviderDTO'
import iFindAllInDayFromProviderDTO from '../dtos/iFindAllInDayFromProviderDTO'

export default interface iAppointmentsRepository {
  create(data: iCreateAppointmentDTO): Promise<Appointment>
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>
  findAllInMonthFromProvider(data: iFindAllInMonthFromProviderDTO): Promise<Appointment[]>
  findAllInDayFromProvider(data: iFindAllInDayFromProviderDTO): Promise<Appointment[]>
}
