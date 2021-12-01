/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Either, left, right } from '../../../../shared/either'
import { InvalidQuantityError } from '../errors/invalid-quantity-error'

export class Quantity {
  private readonly quantity: number

  private constructor (quantity: number) {
    this.quantity = quantity
    Object.freeze(this)
  }

  static create (quantity: number): Either<InvalidQuantityError, Quantity> {
    if (!Quantity.validate(quantity)) {
      return left(new InvalidQuantityError(quantity))
    }
    return right(new Quantity(quantity))
  }

  get value (): number {
    return this.quantity
  }

  static validate (quantity: number): boolean {
    if (!quantity || quantity < 1) {
      return false
    }
    return true
  }
}
