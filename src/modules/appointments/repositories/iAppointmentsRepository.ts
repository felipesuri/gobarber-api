import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import iCreateAppointmentDTO from '../dtos/iCreateAppointmentDTO'
import iFindAllInMonthFromProviderDTO from '../dtos/iFindAllInMonthFromProviderDTO'

export default interface iAppointmentsRepository {
  create(data: iCreateAppointmentDTO): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment | undefined>
  findAllInMonthFromProvider(data: iFindAllInMonthFromProviderDTO): Promise<Appointment[]>
}
