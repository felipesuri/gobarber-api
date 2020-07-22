import iParseMailTemplateDTO from '../dtos/iParseMailTemplateDTO'
import iMailTemplateProvider from '../models/iMailTemplateProvider'

class FakeMailTemplateProvider implements iMailTemplateProvider {
  public async parse({ template }: iParseMailTemplateDTO): Promise<string> {
    return template
  }
}

export default FakeMailTemplateProvider
