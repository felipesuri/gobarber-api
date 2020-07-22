import handlebars from 'handlebars'

import iParseMailTemplateDTO from '../dtos/iParseMailTemplateDTO'
import iMailTemplateProvider from '../models/iMailTemplateProvider'

class HandleBarsMailTemplateProvider implements iMailTemplateProvider {
  public async parse({ template, variables }: iParseMailTemplateDTO): Promise<string> {
    const parseTemplate = handlebars.compile(template)

    return parseTemplate(variables)
  }
}

export default HandleBarsMailTemplateProvider
