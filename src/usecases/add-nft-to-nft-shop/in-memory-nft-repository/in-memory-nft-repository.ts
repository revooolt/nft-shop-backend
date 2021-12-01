import { NFTRepository } from '../../ports/nft-repository'
import { NFTData } from '../../../domain/entities/nft/nft-data'

export class InMemoryNFTRepository implements NFTRepository {
  nfts: NFTData[] = []
  constructor (nfts: NFTData[]) {
    this.nfts = nfts
  }

  async findNFTByName (name: string): Promise<NFTData> {
    let n: NFTData
    for (n of this.nfts) {
      if (n.name === name) {
        return n
      }
    }
    return null as any
  }

  async exists (name: string): Promise<boolean> {
    if (await this.findNFTByName(name) == null) {
      return false
    }
    return true
  }

  async add (nft: NFTData): Promise<void> {
    const exists = await this.exists(nft.name)
    if (!exists) {
      this.nfts.push(nft)
    }
  }
}
