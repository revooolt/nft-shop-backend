/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { getRepository } from 'typeorm'
import { NFTData } from '../../../../../../domain/entities/nft/nft-data'
import { NFTRepository } from '../../../../../../usecases/ports/nft-repository'
import { NFT } from '../entities/nft'

export class NFTPgTypeORMRepository implements NFTRepository {
  async add (nftData: NFTData): Promise<Omit<NFTData, 'art'>> {
    const nftRepository = getRepository(NFT)
    const nft = nftRepository.create(nftData)
    await nftRepository.save(nft)
    return nft
  }

  async findNFTByName (name: string): Promise<any> {
    const nftRepository = getRepository(NFT)
    const result = await nftRepository.findOne({ where: { name } })
    if (!result) {
      return null
    }
    return result
  }

  async exists (name: string): Promise<boolean> {
    const result = await this.findNFTByName(name)
    if (result != null) {
      if (result.name === name) {
        return true
      }
    }
    return false
  }
}
