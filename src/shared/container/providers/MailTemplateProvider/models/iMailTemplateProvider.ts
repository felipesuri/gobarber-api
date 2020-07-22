import iParseMailTemplateDTO from '../dtos/iParseMailTemplateDTO'

export default interface iMailTemplateProvider {
  parse(data: iParseMailTemplateDTO): Promise<string>
}
