import { uuid } from 'uuidv4'
import { isEqual, getMonth, getYear } from 'date-fns'

import iAppointmentsRepository from '@modules/appointments/repositories/iAppointmentsRepository'
import iCreateAppointmentDTO from '@modules/appointments/dtos/iCreateAppointmentDTO'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import iFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/iFindAllInMonthFromProviderDTO'

class AppointmentsRepository implements iAppointmentsRepository {
  private appointments: Appointment[] = []

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date)
    )

    return findAppointment
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: iFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
    )

    return appointments
  }

  public async create({
    provider_id,
    date,
  }: iCreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()

    Object.assign(appointment, { id: uuid(), date, provider_id })

    this.appointments.push(appointment)

    return appointment
  }
}

export default AppointmentsRepository
