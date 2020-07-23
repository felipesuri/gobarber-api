import { Router } from 'express'
import multer from 'multer'

import ensureAuthenticated from '@modules/users/infra/middleware/ensureAuthenticated'

import ProfileController from '../controllers/ProfileController'

const profileRouter = Router()
const profileController = new ProfileController()

profileRouter.use(ensureAuthenticated)

profileRouter.put('/', profileController.update)

export default profileRouter
