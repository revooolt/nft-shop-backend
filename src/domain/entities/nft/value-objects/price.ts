/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Either, left, right } from '../../../../shared/either'
import { InvalidPriceError } from '../errors/invalid-price-error'

export class Price {
  private readonly price: number

  private constructor (price: number) {
    this.price = price
  }

  static create (price: number): Either<InvalidPriceError, Price> {
    if (!Price.validate(price)) {
      return left(new InvalidPriceError(price))
    }
    return right(new Price(price))
  }

  get value (): number {
    return this.price
  }

  static validate (price: number): boolean {
    if (!price || price === 0) {
      return false
    }
    return true
  }
}
