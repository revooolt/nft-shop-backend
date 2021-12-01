import { left } from '../../../shared/either'
import { InvalidArtError } from './errors/invalid-art-error'
import { InvalidArtistNameError } from './errors/invalid-artist-name'
import { InvalidDescriptionError } from './errors/invalid-description-error'
import { InvalidNameError } from './errors/invalid-name-error'
import { InvalidPriceError } from './errors/invalid-price-error'
import { InvalidQuantityError } from './errors/invalid-quantity-error'
import { NFT } from './nft'

describe('NFT domain entity', () => {
  test('Should not create NFT with invalid artist name (too few characters)', async () => {
    const artistName = 'AA'
    const nft = NFT.create({
      artistName: artistName,
      name: 'art_name',
      art: 'art.png',
      description: 'description_text',
      quantity: 1,
      price: 1
    })
    expect(nft).toEqual(left(new InvalidArtistNameError(artistName)))
  })

  test('should not create NFT with invalid artist name (too many characters)', async () => {
    let artistName: string = ''
    for (let i = 0; i < 33; i++) {
      artistName += 'A'
    }
    const nft = NFT.create({
      artistName: artistName,
      name: 'art_name',
      art: 'art.png',
      description: 'description_text',
      quantity: 1,
      price: 1
    })
    expect(nft).toEqual(left(new InvalidArtistNameError(artistName)))
  })

  test('should not create NFT with invalid artist name (only blank spaces)', async () => {
    const artistName = '   '
    const nft = NFT.create({
      artistName: artistName,
      name: 'art_name',
      art: 'art.png',
      description: 'description_text',
      quantity: 1,
      price: 1
    })
    expect(nft).toEqual(left(new InvalidArtistNameError(artistName)))
  })

  test('Should not create NFT with invalid name (too few characters)', async () => {
    const name = 'A'
    const nft = NFT.create({
      artistName: 'artist_name',
      name: name,
      art: 'art.png',
      description: 'description_text',
      quantity: 1,
      price: 1
    })
    expect(nft).toEqual(left(new InvalidNameError(name)))
  })

  test('should not create NFT with invalid name (too many characters)', async () => {
    let name: string = ''
    for (let i = 0; i < 33; i++) {
      name += 'A'
    }
    const nft = NFT.create({
      artistName: 'artist_name',
      name: name,
      art: 'art.png',
      description: 'description_text',
      quantity: 1,
      price: 1
    })
    expect(nft).toEqual(left(new InvalidNameError(name)))
  })

  test('should not create NFT with invalid name (only blank spaces)', async () => {
    const name = '   '
    const nft = NFT.create({
      artistName: 'artist_name',
      name: name,
      art: 'art.png',
      description: 'description_text',
      quantity: 1,
      price: 1
    })
    expect(nft).toEqual(left(new InvalidNameError(name)))
  })

  test('should not create NFT with invalid art (file format)', async () => {
    const art = 'art.dll'
    const nft = NFT.create({
      artistName: 'artist_name',
      name: 'art_name',
      art: art,
      description: 'description_text',
      quantity: 1,
      price: 1
    })
    expect(nft).toEqual(left(new InvalidArtError(art)))
  })

  test('should not create NFT with invalid description (too few characters)', async () => {
    const description = 'A'
    const nft = NFT.create({
      artistName: 'artist_name',
      name: 'art_name',
      art: 'art.png',
      description: description,
      quantity: 1,
      price: 1
    })
    expect(nft).toEqual(left(new InvalidDescriptionError(description)))
  })

  test('should not create NFT with invalid description (too many characters)', async () => {
    let description: string = ''
    for (let i = 0; i < 501; i++) {
      description += 'A'
    }
    const nft = NFT.create({
      artistName: 'artist_name',
      name: 'art_name',
      art: 'art.png',
      description: description,
      quantity: 1,
      price: 1
    })
    expect(nft).toEqual(left(new InvalidDescriptionError(description)))
  })

  test('should not create NFT with invalid description (only blank spaces)', async () => {
    const description = '   '
    const nft = NFT.create({
      artistName: 'artist_name',
      name: 'art_name',
      art: 'art.png',
      description: description,
      quantity: 1,
      price: 1
    })
    expect(nft).toEqual(left(new InvalidDescriptionError(description)))
  })

  test('should not create NFT with invalid quantity', async () => {
    const quantity = 0
    const nft = NFT.create({
      artistName: 'artist_name',
      name: 'art_name',
      art: 'art.png',
      description: 'description_text',
      quantity: quantity,
      price: 1
    })
    expect(nft).toEqual(left(new InvalidQuantityError(quantity)))
  })

  test('should not create NFT with invalid price', async () => {
    const price = 0
    const nft = NFT.create({
      artistName: 'artist_name',
      name: 'art_name',
      art: 'art.png',
      description: 'description_text',
      quantity: 1,
      price: price
    })
    expect(nft).toEqual(left(new InvalidPriceError(price)))
  })
})
