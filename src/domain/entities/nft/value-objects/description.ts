/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Either, left, right } from '../../../../shared/either'
import { InvalidDescriptionError } from '../errors/invalid-description-error'

export class Description {
  private readonly description: string

  private constructor (description: string) {
    this.description = description
    Object.freeze(this)
  }

  static create (description: string): Either<InvalidDescriptionError, Description> {
    if (!Description.validate(description)) {
      return left(new InvalidDescriptionError(description))
    }
    return right(new Description(description))
  }

  get value (): string {
    return this.description
  }

  static validate (description: string): boolean {
    if (!description || description.trim().length < 2 || description.trim().length > 500) {
      return false
    }
    return true
  }
}
