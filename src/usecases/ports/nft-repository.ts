import { NFTData } from '../../domain/entities/nft/nft-data'

export interface NFTRepository {
  findNFTByName: (name: string) => Promise<NFTData>
  add: (nft: NFTData) => Promise<Omit<NFTData, 'art'>>
  exists: (name: string) => Promise<boolean>
}
