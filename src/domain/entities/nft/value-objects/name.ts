/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Either, left, right } from '../../../../shared/either'
import { InvalidNameError } from '../errors/invalid-name-error'

export class Name {
  private readonly name: string

  private constructor (name: string) {
    this.name = name
  }

  static create (name: string): Either<InvalidNameError, Name> {
    if (!Name.validate(name)) {
      return left(new InvalidNameError(name))
    }
    return right(new Name(name))
  }

  get value (): string {
    return this.name
  }

  static validate (name: string): boolean {
    if (!name || name.trim().length < 2 || name.trim().length > 32) {
      return false
    }
    return true
  }
}
