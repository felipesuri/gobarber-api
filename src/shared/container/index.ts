import { container } from 'tsyringe'

import '@modules/users/providers'
import './providers'

import iAppointmentsRepository from '@modules/appointments/repositories/iAppointmentsRepository'
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'

import iUsersRepository from '@modules/users/repositories/iUsersRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

import iUserTokensRepository from '@modules/users/repositories/iUserTokensRepository'
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository'

container.registerSingleton<iAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository
)

container.registerSingleton<iUsersRepository>('UsersRepository', UsersRepository)

container.registerSingleton<iUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
)
