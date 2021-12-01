export class InvalidDescriptionError extends Error implements DomainError {
  constructor (description: string) {
    super('The description is invalid.')
    this.name = 'InvalidDescriptionError'
  }
}
