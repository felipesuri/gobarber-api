import iMailTemplateProvider from '../models/iMailTemplateProvider'

class FakeMailTemplateProvider implements iMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail Content'
  }
}

export default FakeMailTemplateProvider
