/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NFTData } from './nft-data'
import { ArtistName } from './value-objects/artist-name'
import { InvalidArtistNameError } from './errors/invalid-artist-name'
import { Either, left, right } from '../../../shared/either'
import { InvalidNameError } from './errors/invalid-name-error'
import { Name } from './value-objects/name'
import { Art } from './value-objects/art'
import { Description } from './value-objects/description'
import { InvalidArtError } from './errors/invalid-art-error'
import { InvalidDescriptionError } from './errors/invalid-description-error'
import { Quantity } from './value-objects/quantity'
import { InvalidQuantityError } from './errors/invalid-quantity-error'
import { InvalidPriceError } from './errors/invalid-price-error'
import { Price } from './value-objects/price'

export class NFT {
  public readonly art: Art
  public readonly artistName: ArtistName
  public readonly name: Name
  public readonly description: Description
  public readonly quantity: Quantity
  public readonly price: Price

  private constructor (
    art: Art,
    artistName: ArtistName,
    name: Name,
    description: Description,
    quantity: Quantity,
    price: Price
  ) {
    this.art = art
    this.artistName = artistName
    this.name = name
    this.description = description
    this.quantity = quantity
    this.price = price
    Object.freeze(this)
  }

  static create (nftData: NFTData): Either<
  InvalidArtError |
  InvalidArtistNameError |
  InvalidNameError |
  InvalidDescriptionError |
  InvalidQuantityError |
  InvalidPriceError,
  NFT> {
    const artOrError: Either<InvalidArtError, Art> = Art.create(nftData.art)
    const artistNameOrError: Either<InvalidArtistNameError, ArtistName> = ArtistName.create(nftData.artistName)
    const nameOrError: Either<InvalidNameError, Name> = Name.create(nftData.name)
    const descriptionOrError: Either<InvalidDescriptionError, Description> = Description.create(nftData.description)
    const quantityOrError: Either<InvalidQuantityError, Quantity> = Quantity.create(nftData.quantity)
    const priceOrError: Either<InvalidPriceError, Price> = Price.create(nftData.price)

    if (artOrError.isLeft()) {
      return left(artOrError.value)
    }
    if (artistNameOrError.isLeft()) {
      return left(artistNameOrError.value)
    }
    if (nameOrError.isLeft()) {
      return left(nameOrError.value)
    }
    if (descriptionOrError.isLeft()) {
      return left(descriptionOrError.value)
    }
    if (quantityOrError.isLeft()) {
      return left(quantityOrError.value)
    }
    if (priceOrError.isLeft()) {
      return left(priceOrError.value)
    }

    const art: Art = artOrError.value
    const artistName: ArtistName = artistNameOrError.value
    const name: Name = nameOrError.value
    const description: Description = descriptionOrError.value
    const quantity: Quantity = quantityOrError.value
    const price: Price = priceOrError.value
    return right(new NFT(art, artistName, name, description, quantity, price))
  }
}
