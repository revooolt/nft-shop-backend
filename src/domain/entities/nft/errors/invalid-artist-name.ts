export class InvalidArtistNameError extends Error implements DomainError {
  constructor (artistName: string) {
    super('The artist name is invalid.')
    this.name = 'InvalidArtistNameError'
  }
}
