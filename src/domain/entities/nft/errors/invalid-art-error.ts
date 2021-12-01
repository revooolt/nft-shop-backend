export class InvalidArtError extends Error implements DomainError {
  constructor (art: string) {
    super('The art is invalid.')
    this.name = 'InvalidArtError'
  }
}
