const Resources = ['workspace', 'device', 'manifest', 'secret']

export function getResourceAndActionFromFieldName(fieldName: string): { resource: string; action: string } {
  const [resource, ...action] = fieldName.split(/(?=[A-Z])/)
  // Check if resource is valid
  if (!Resources.includes(resource)) throw new Error(`Invalid resource: ${resource}`)

  return { resource, action: action.join('') }
}

export function splitWithFirstUpperCaseLetter(str: string): string[] {
  return str.split(/(?=[A-Z])/)
}
