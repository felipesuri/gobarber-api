import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import iCreateAppointmentDTO from '../dtos/iCreateAppointmentDTO'

export default interface iAppointmentsRepository {
  create(data: iCreateAppointmentDTO): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment | undefined>
}
