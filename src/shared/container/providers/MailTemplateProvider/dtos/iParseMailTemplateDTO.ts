interface iTemplateVariables {
  [key: string]: string | number
}

export default interface iParseMailTemplateDTO {
  template: string
  variables: iTemplateVariables
}
