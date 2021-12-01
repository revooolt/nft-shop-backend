import { NFTData } from '../../../domain/entities/nft/nft-data'
import { InMemoryNFTRepository } from './in-memory-nft-repository'

describe('In memory NFT repository', () => {
  test('should return NFT if NFT is found', async () => {
    const nfts: NFTData[] = [{
      artistName: 'artist_name',
      name: 'art_name',
      art: 'art.png',
      description: 'description_text',
      quantity: 1,
      price: 1
    }]
    const nftRepository = new InMemoryNFTRepository(nfts)
    const nft = await nftRepository.findNFTByName('art_name')
    expect(nft.name).toEqual('art_name')
  })

  test('should return null if NFT is not found', async () => {
    const nfts: NFTData[] = []
    const nftRepository = new InMemoryNFTRepository(nfts)
    const nft = await nftRepository.findNFTByName('art_name')
    expect(nft).toEqual(null)
  })

  test('should add NFT', async () => {
    const nfts: NFTData[] = []
    const nftRepository = new InMemoryNFTRepository(nfts)
    await nftRepository.add({
      artistName: 'artist_name',
      name: 'art_name',
      art: 'art.png',
      description: 'description_text',
      quantity: 1,
      price: 1
    })
    const nft = await nftRepository.findNFTByName('art_name')
    expect(nft.name).toEqual('art_name')
  })
})
