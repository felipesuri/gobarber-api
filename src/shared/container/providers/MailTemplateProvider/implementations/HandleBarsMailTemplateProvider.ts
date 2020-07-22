import handlebars from 'handlebars'
import fs from 'fs'

import iParseMailTemplateDTO from '../dtos/iParseMailTemplateDTO'
import iMailTemplateProvider from '../models/iMailTemplateProvider'

class HandleBarsMailTemplateProvider implements iMailTemplateProvider {
  public async parse({ file, variables }: iParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, { encoding: 'utf-8' })

    const parseTemplate = handlebars.compile(templateFileContent)

    return parseTemplate(variables)
  }
}

export default HandleBarsMailTemplateProvider
