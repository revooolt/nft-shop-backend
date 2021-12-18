import { InvalidArtError } from '../../domain/entities/nft/errors/invalid-art-error'
import { InvalidArtistNameError } from '../../domain/entities/nft/errors/invalid-artist-name'
import { InvalidDescriptionError } from '../../domain/entities/nft/errors/invalid-description-error'
import { InvalidNameError } from '../../domain/entities/nft/errors/invalid-name-error'
import { InvalidPriceError } from '../../domain/entities/nft/errors/invalid-price-error'
import { InvalidQuantityError } from '../../domain/entities/nft/errors/invalid-quantity-error'
import { NFT } from '../../domain/entities/nft/nft'
import { NFTData } from '../../domain/entities/nft/nft-data'
import { left, right, Either } from '../../shared/either'
import { NFTRepository } from '../ports/nft-repository'
import { AddNFT } from './protocols/add-nft'
import { AddNFTResponse } from './protocols/add-nft-response'

export class AddNFTToNFTShop implements AddNFT {
  private readonly nftRepository: NFTRepository

  constructor (nftRepo: NFTRepository) {
    this.nftRepository = nftRepo
  }

  async addNFTToNFTShop (nftData: NFTData): Promise<AddNFTResponse> {
    const nftOrError: Either<
    InvalidArtError |
    InvalidArtistNameError |
    InvalidNameError |
    InvalidDescriptionError |
    InvalidQuantityError |
    InvalidPriceError,
    NFT> = NFT.create(nftData)

    if (nftOrError.isLeft()) {
      return left(nftOrError.value)
    }
    const nft: NFT = nftOrError.value
    const exists = this.nftRepository.exists(nft.name.value)
    if (!(await exists).valueOf()) {
      await this.nftRepository.add({
        name: nft.name.value,
        art: nft.art.value,
        artistName: nft.artistName.value,
        description: nft.description.value,
        quantity: nft.quantity.value,
        price: nft.price.value
      })
    }
    return right(nftData)
  }
}
