export class InvalidPriceError extends Error implements DomainError {
  constructor (price: number) {
    super('The price is invalid.')
    this.name = 'InvalidPriceError'
  }
}
