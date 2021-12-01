import { Either } from '../../../shared/either'
import { InvalidArtError } from '../../../domain/entities/nft/errors/invalid-art-error'
import { InvalidArtistNameError } from '../../../domain/entities/nft/errors/invalid-artist-name'
import { InvalidDescriptionError } from '../../../domain/entities/nft/errors/invalid-description-error'
import { InvalidNameError } from '../../../domain/entities/nft/errors/invalid-name-error'
import { InvalidPriceError } from '../../../domain/entities/nft/errors/invalid-price-error'
import { InvalidQuantityError } from '../../../domain/entities/nft/errors/invalid-quantity-error'
import { NFTData } from '../../../domain/entities/nft/nft-data'

export type AddNFTResponse = Either<
InvalidArtError |
InvalidArtistNameError |
InvalidDescriptionError |
InvalidNameError |
InvalidPriceError |
InvalidQuantityError,
NFTData>
