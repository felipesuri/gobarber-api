import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/middleware/ensureAuthenticated'

import AppointmentsController from '../controllers/AppointmentsController'
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController'

const appointmentsRouter = Router()
const appointmentsController = new AppointmentsController()
const providerAppointmentsController = new ProviderAppointmentsController()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/me', providerAppointmentsController.index)
appointmentsRouter.post('/', appointmentsController.create)

export default appointmentsRouter
