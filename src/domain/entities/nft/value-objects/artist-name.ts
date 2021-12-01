/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Either, left, right } from '../../../../shared/either'
import { InvalidArtistNameError } from '../errors/invalid-artist-name'

export class ArtistName {
  private readonly artistName: string

  private constructor (artistName: string) {
    this.artistName = artistName
    Object.freeze(this)
  }

  static create (artistName: string): Either<InvalidArtistNameError, ArtistName> {
    if (!ArtistName.validate(artistName)) {
      return left(new InvalidArtistNameError(artistName))
    }
    return right(new ArtistName(artistName))
  }

  get value (): string {
    return this.artistName
  }

  static validate (artistName: string): boolean {
    if (!artistName || artistName.trim().length < 3 || artistName.trim().length > 32) {
      return false
    }
    return true
  }
}
