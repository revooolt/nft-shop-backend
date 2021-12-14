import { TypeORMHelper } from '../helper'
import { NFTPgTypeORMRepository } from './nft-repository'

interface SutTypes {
  sut: NFTPgTypeORMRepository
}

const makeSut = (): SutTypes => {
  const sut = new NFTPgTypeORMRepository()
  return {
    sut
  }
}

describe('PostgreSQL NFT Repository', () => {
  beforeAll(async () => {
    await TypeORMHelper.instance.connect()
  })

  beforeEach(async () => {
    await TypeORMHelper.instance.deleteFrom('nfts')
  })

  afterAll(async () => {
    await TypeORMHelper.instance.disconnect()
  })

  describe('add()', () => {
    test('should return an NFT on success', async () => {
      const { sut } = makeSut()
      const nft = await sut.add({
        art: 'nft_art.png',
        artistName: 'artist_name',
        name: 'art_name',
        description: 'description_text',
        quantity: 1,
        price: 1
      })
      expect(nft).toBeTruthy()
      expect(nft).toHaveProperty('artistName')
      expect(nft).toHaveProperty('name')
      expect(nft).toHaveProperty('description')
      expect(nft).toHaveProperty('quantity')
      expect(nft).toHaveProperty('price')
      expect(nft).toHaveProperty('created_at')
    })
  })

  describe('exists()', () => {
    test('should return true if an NFT exists', async () => {
      const { sut } = makeSut()
      await sut.add({
        art: 'nft_art.png',
        artistName: 'artist_name',
        name: 'art_name',
        description: 'description_text',
        quantity: 1,
        price: 1
      })
      expect(await sut.exists('art_name')).toBeTruthy()
    })

    test('should return false if NFT does not exists', async () => {
      const { sut } = makeSut()
      expect(await sut.exists('art_name')).toBeFalsy()
    })
  })

  describe('findNFTByName()', () => {
    test('should return an NFT if NFT name is found', async () => {
      const { sut } = makeSut()
      await sut.add({
        art: 'nft_art.png',
        artistName: 'artist_name',
        name: 'art_name',
        description: 'description_text',
        quantity: 1,
        price: 1
      })
      const find = await sut.findNFTByName('art_name')
      expect(find).toHaveProperty('artistName')
      expect(find).toHaveProperty('name')
      expect(find).toHaveProperty('description')
      expect(find).toHaveProperty('quantity')
      expect(find).toHaveProperty('price')
      expect(find).toHaveProperty('created_at')
    })

    test('should return null if NFT name is not found', async () => {
      const { sut } = makeSut()
      const find = await sut.findNFTByName('art_name')
      expect(find).toBeNull()
    })
  })
})
