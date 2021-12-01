export class InvalidNameError extends Error implements DomainError {
  constructor (name: string) {
    super('The name is invalid.')
    this.name = 'InvalidNameError'
  }
}
