export class InvalidQuantityError extends Error implements DomainError {
  constructor (quantity: number) {
    super('The quantity is invalid.')
    this.name = 'InvalidQuantityError'
  }
}
