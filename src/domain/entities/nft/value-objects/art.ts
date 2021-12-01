import { Either, left, right } from '../../../../shared/either'
import { InvalidArtError } from '../errors/invalid-art-error'

export class Art {
  private readonly art: string

  private constructor (art: string) {
    this.art = art
    Object.freeze(this)
  }

  static create (art: string): Either<InvalidArtError, Art> {
    if (!Art.validate(art)) {
      return left(new InvalidArtError(art))
    }
    return right(new Art(art))
  }

  get value (): string {
    return this.art
  }

  static validate (art: string): boolean {
    if (!/\.(jpe?g|png)$/i.test(art)) {
      return false
    }
    return true
  }
}
