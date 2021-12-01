import { NFTData } from '../../domain/entities/nft/nft-data'

export interface NFTRepository {
  findNFTByName: (name: string) => Promise<NFTData>
  add: (nft: NFTData) => Promise<void>
  exists: (name: string) => Promise<boolean>
}
