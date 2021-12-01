/* eslint-disable prefer-const */
import { InvalidArtError } from '../../domain/entities/nft/errors/invalid-art-error'
import { InvalidArtistNameError } from '../../domain/entities/nft/errors/invalid-artist-name'
import { InvalidDescriptionError } from '../../domain/entities/nft/errors/invalid-description-error'
import { InvalidNameError } from '../../domain/entities/nft/errors/invalid-name-error'
import { InvalidPriceError } from '../../domain/entities/nft/errors/invalid-price-error'
import { InvalidQuantityError } from '../../domain/entities/nft/errors/invalid-quantity-error'
import { NFTData } from '../../domain/entities/nft/nft-data'
import { NFTRepository } from '../ports/nft-repository'
import { AddNFTToNFTShop } from './ add-nft-to-nft-shop'
import { InMemoryNFTRepository } from './in-memory-nft-repository/in-memory-nft-repository'

describe('Add NFT to NFT Shop use case', () => {
  test('Should add new NFT on NFT Shop with all data', async () => {
    const art = 'nft_art.png'
    const artistName = 'artist_name'
    const name = 'art_name'
    const description = 'description_text'
    const quantity = 1
    const price = 1
    let nfts: NFTData[] = []
    const nftRepository: NFTRepository = new InMemoryNFTRepository(nfts)
    const sut = new AddNFTToNFTShop(nftRepository)
    const response = await sut.addNFTToNFTShop({
      art,
      artistName,
      name,
      description,
      quantity,
      price
    })
    const nft = nftRepository.findNFTByName(name)
    expect((await nft).name).toEqual('art_name')
    expect(response.isRight()).toBeTruthy()
  })

  test('should not add new NFT without art', async () => {
    const art = ''
    const artistName = 'artist_name'
    const name = 'art_name'
    const description = 'description_text'
    const quantity = 1
    const price = 1
    let nfts: NFTData[] = []
    const nftRepository: NFTRepository = new InMemoryNFTRepository(nfts)
    const sut = new AddNFTToNFTShop(nftRepository)
    const error = await sut.addNFTToNFTShop({
      art,
      artistName,
      name,
      description,
      quantity,
      price
    })
    expect(error.value).toEqual(new InvalidArtError(art))
    expect(error.isLeft()).toBeTruthy()
  })

  test('should not add new NFT with invalid art', async () => {
    const art = 'nft_art.dll'
    const artistName = 'artist_name'
    const name = 'art_name'
    const description = 'description_text'
    const quantity = 1
    const price = 1
    let nfts: NFTData[] = []
    const nftRepository: NFTRepository = new InMemoryNFTRepository(nfts)
    const sut = new AddNFTToNFTShop(nftRepository)
    const error = await sut.addNFTToNFTShop({
      art,
      artistName,
      name,
      description,
      quantity,
      price
    })
    expect(error.value).toEqual(new InvalidArtError(art))
    expect(error.isLeft()).toBeTruthy()
  })

  test('should not add new NFT without artist name', async () => {
    const art = 'nft_art.png'
    const artistName = ''
    const name = 'art_name'
    const description = 'description_text'
    const quantity = 1
    const price = 1
    let nfts: NFTData[] = []
    const nftRepository: NFTRepository = new InMemoryNFTRepository(nfts)
    const sut = new AddNFTToNFTShop(nftRepository)
    const error = await sut.addNFTToNFTShop({
      art,
      artistName,
      name,
      description,
      quantity,
      price
    })
    expect(error.value).toEqual(new InvalidArtistNameError(artistName))
    expect(error.isLeft()).toBeTruthy()
  })

  test('should not add new NFT with invalid artist name (too few characters)', async () => {
    const art = 'nft_art.png'
    const artistName = 'AA'
    const name = 'art_name'
    const description = 'description_text'
    const quantity = 1
    const price = 1
    let nfts: NFTData[] = []
    const nftRepository: NFTRepository = new InMemoryNFTRepository(nfts)
    const sut = new AddNFTToNFTShop(nftRepository)
    const error = await sut.addNFTToNFTShop({
      art,
      artistName,
      name,
      description,
      quantity,
      price
    })
    expect(error.value).toEqual(new InvalidArtistNameError(artistName))
    expect(error.isLeft()).toBeTruthy()
  })

  test('should not add new NFT with invalid artist name (too many characters)', async () => {
    const art = 'nft_art.png'
    let artistName: string = ''
    for (let i = 0; i < 33; i++) {
      artistName += 'A'
    }
    const name = 'art_name'
    const description = 'description_text'
    const quantity = 1
    const price = 1
    let nfts: NFTData[] = []
    const nftRepository: NFTRepository = new InMemoryNFTRepository(nfts)
    const sut = new AddNFTToNFTShop(nftRepository)
    const error = await sut.addNFTToNFTShop({
      art,
      artistName,
      name,
      description,
      quantity,
      price
    })
    expect(error.value).toEqual(new InvalidArtistNameError(artistName))
    expect(error.isLeft()).toBeTruthy()
  })

  test('should not add new NFT without name', async () => {
    const art = 'nft_art.png'
    const artistName = 'artist_name'
    const name = ''
    const description = 'description_text'
    const quantity = 1
    const price = 1
    let nfts: NFTData[] = []
    const nftRepository: NFTRepository = new InMemoryNFTRepository(nfts)
    const sut = new AddNFTToNFTShop(nftRepository)
    const error = await sut.addNFTToNFTShop({
      art,
      artistName,
      name,
      description,
      quantity,
      price
    })
    expect(error.value).toEqual(new InvalidNameError(name))
    expect(error.isLeft()).toBeTruthy()
  })

  test('should not add new NFT with invalid name (too few characters)', async () => {
    const art = 'nft_art.png'
    const artistName = 'artist_name'
    const name = 'A'
    const description = 'description_text'
    const quantity = 1
    const price = 1
    let nfts: NFTData[] = []
    const nftRepository: NFTRepository = new InMemoryNFTRepository(nfts)
    const sut = new AddNFTToNFTShop(nftRepository)
    const error = await sut.addNFTToNFTShop({
      art,
      artistName,
      name,
      description,
      quantity,
      price
    })
    expect(error.value).toEqual(new InvalidNameError(name))
    expect(error.isLeft()).toBeTruthy()
  })

  test('should not add new NFT with invalid name (too many characters)', async () => {
    const artistName = 'artist_name'
    const art = 'nft_art.png'
    let name: string = ''
    for (let i = 0; i < 33; i++) {
      name += 'A'
    }
    const description = 'description_text'
    const quantity = 1
    const price = 1
    let nfts: NFTData[] = []
    const nftRepository: NFTRepository = new InMemoryNFTRepository(nfts)
    const sut = new AddNFTToNFTShop(nftRepository)
    const error = await sut.addNFTToNFTShop({
      art,
      artistName,
      name,
      description,
      quantity,
      price
    })
    expect(error.value).toEqual(new InvalidNameError(name))
    expect(error.isLeft()).toBeTruthy()
  })

  test('should not add new NFT without description', async () => {
    const art = 'nft_art.png'
    const artistName = 'artist_name'
    const name = 'art_name'
    const description = ''
    const quantity = 1
    const price = 1
    let nfts: NFTData[] = []
    const nftRepository: NFTRepository = new InMemoryNFTRepository(nfts)
    const sut = new AddNFTToNFTShop(nftRepository)
    const error = await sut.addNFTToNFTShop({
      art,
      artistName,
      name,
      description,
      quantity,
      price
    })
    expect(error.value).toEqual(new InvalidDescriptionError(description))
    expect(error.isLeft()).toBeTruthy()
  })

  test('should not add new NFT with invalid description (too few characters)', async () => {
    const art = 'nft_art.png'
    const artistName = 'artist_name'
    const name = 'art_name'
    const description = 'A'
    const quantity = 1
    const price = 1
    let nfts: NFTData[] = []
    const nftRepository: NFTRepository = new InMemoryNFTRepository(nfts)
    const sut = new AddNFTToNFTShop(nftRepository)
    const error = await sut.addNFTToNFTShop({
      art,
      artistName,
      name,
      description,
      quantity,
      price
    })
    expect(error.value).toEqual(new InvalidDescriptionError(description))
    expect(error.isLeft()).toBeTruthy()
  })

  test('should not add new NFT with invalid description (too many characters)', async () => {
    const artistName = 'artist_name'
    const name = 'art_name'
    const art = 'nft_art.png'
    let description: string = ''
    for (let i = 0; i < 501; i++) {
      description += 'A'
    }
    const quantity = 1
    const price = 1
    let nfts: NFTData[] = []
    const nftRepository: NFTRepository = new InMemoryNFTRepository(nfts)
    const sut = new AddNFTToNFTShop(nftRepository)
    const error = await sut.addNFTToNFTShop({
      art,
      artistName,
      name,
      description,
      quantity,
      price
    })
    expect(error.value).toEqual(new InvalidDescriptionError(description))
    expect(error.isLeft()).toBeTruthy()
  })

  test('should not add new NFT with invalid quantity', async () => {
    const art = 'nft_art.png'
    const artistName = 'artist_name'
    const name = 'art_name'
    const description = 'description_text'
    const quantity = 0
    const price = 1
    let nfts: NFTData[] = []
    const nftRepository: NFTRepository = new InMemoryNFTRepository(nfts)
    const sut = new AddNFTToNFTShop(nftRepository)
    const error = await sut.addNFTToNFTShop({
      art,
      artistName,
      name,
      description,
      quantity,
      price
    })
    expect(error.value).toEqual(new InvalidQuantityError(quantity))
    expect(error.isLeft()).toBeTruthy()
  })

  test('should not add new NFT with invalid price', async () => {
    const art = 'nft_art.png'
    const artistName = 'artist_name'
    const name = 'art_name'
    const description = 'description_text'
    const quantity = 1
    const price = 0
    let nfts: NFTData[] = []
    const nftRepository: NFTRepository = new InMemoryNFTRepository(nfts)
    const sut = new AddNFTToNFTShop(nftRepository)
    const error = await sut.addNFTToNFTShop({
      art,
      artistName,
      name,
      description,
      quantity,
      price
    })
    expect(error.value).toEqual(new InvalidPriceError(price))
    expect(error.isLeft()).toBeTruthy()
  })
})
