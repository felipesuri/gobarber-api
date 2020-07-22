interface iTemplateVariables {
  [key: string]: string | number
}

export default interface iParseMailTemplateDTO {
  file: string
  variables: iTemplateVariables
}
