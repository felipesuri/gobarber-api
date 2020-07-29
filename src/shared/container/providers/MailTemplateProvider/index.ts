import { container } from 'tsyringe'

import iMailTemplateProvider from './models/iMailTemplateProvider'
import HandleBarsMailTemplateProvider from './implementations/HandleBarsMailTemplateProvider'

const providers = {
  handlebars: HandleBarsMailTemplateProvider,
}

container.registerSingleton<iMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars
)
