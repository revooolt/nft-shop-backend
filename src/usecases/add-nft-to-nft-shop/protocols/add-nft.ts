import { AddNFTResponse } from './add-nft-response'
import { NFTData } from '../../../domain/entities/nft/nft-data'

export interface AddNFT {
  addNFTToNFTShop: (nft: NFTData) => Promise<AddNFTResponse>
}
