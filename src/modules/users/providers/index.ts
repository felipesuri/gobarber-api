import { container } from 'tsyringe'

import iHashProvider from './HashProvider/models/iHashProvider'
import BCryptProvider from './HashProvider/implementations/BCryptHashProvider'

container.registerSingleton<iHashProvider>('HashProvider', BCryptProvider)
