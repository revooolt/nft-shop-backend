import { InvalidArtError } from '../../../../domain/entities/nft/errors/invalid-art-error'
import { InvalidArtistNameError } from '../../../../domain/entities/nft/errors/invalid-artist-name'
import { InvalidDescriptionError } from '../../../../domain/entities/nft/errors/invalid-description-error'
import { InvalidNameError } from '../../../../domain/entities/nft/errors/invalid-name-error'
import { InvalidPriceError } from '../../../../domain/entities/nft/errors/invalid-price-error'
import { InvalidQuantityError } from '../../../../domain/entities/nft/errors/invalid-quantity-error'
import { NFTData } from '../../../../domain/entities/nft/nft-data'
import { left, right } from '../../../../shared/either'
import { AddNFT } from '../../../../usecases/add-nft-to-nft-shop/protocols/add-nft'
import { AddNFTResponse } from '../../../../usecases/add-nft-to-nft-shop/protocols/add-nft-response'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { AddNFTController } from './add-nft-controller'

const makeAddNFT = (): AddNFT => {
  class AddNFTStub implements AddNFT {
    async addNFTToNFTShop (nft: NFTData): Promise<AddNFTResponse> {
      return await Promise.resolve(right(nft))
    }
  }
  return new AddNFTStub()
}

interface SutTypes {
  sut: AddNFTController
  addNFTStub: AddNFT
}

const makeSut = (): SutTypes => {
  const addNFTStub = makeAddNFT()
  const sut = new AddNFTController(
    addNFTStub
  )
  return {
    sut,
    addNFTStub
  }
}

describe('Add NFT Controller', () => {
  test('should return 400 if no art is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        artistName: 'artist_name',
        name: 'art_name',
        description: 'description_text',
        quantity: 1,
        price: 1
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('art')))
  })

  test('should return 400 if no artist name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      art: {
        filename: 'nft_art.png'
      },
      body: {
        name: 'art_name',
        description: 'description_text',
        quantity: 1,
        price: 1
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('artistName')))
  })

  test('should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      art: {
        filename: 'nft_art.png'
      },
      body: {
        artistName: 'artist_name',
        description: 'description_text',
        quantity: 1,
        price: 1
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('should return 400 if no description is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      art: {
        filename: 'nft_art.png'
      },
      body: {
        artistName: 'artist_name',
        name: 'art_name',
        quantity: 1,
        price: 1
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('description')))
  })

  test('should return 400 if no quantity is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      art: {
        filename: 'nft_art.png'
      },
      body: {
        artistName: 'artist_name',
        name: 'art_name',
        description: 'description_text',
        price: 1
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('quantity')))
  })

  test('should return 400 if no price is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      art: {
        filename: 'nft_art.png'
      },
      body: {
        artistName: 'artist_name',
        name: 'art_name',
        description: 'description_text',
        quantity: 1
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('price')))
  })

  test('should return 400 if invalid art is provided', async () => {
    const { sut, addNFTStub } = makeSut()
    const httpRequest = {
      art: {
        filename: 'nft_art.dll'
      },
      body: {
        artistName: 'artist_name',
        name: 'art_name',
        description: 'description_text',
        quantity: 1,
        price: 1
      }
    }
    jest.spyOn(addNFTStub, 'addNFTToNFTShop').mockImplementationOnce(
      async (nft: NFTData) => {
        return await Promise.resolve(left(new InvalidArtError(nft.art)))
      })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidArtError(httpRequest.art.filename).message)
  })

  test('should return 400 if invalid artist name is provided (too few characters)', async () => {
    const { sut, addNFTStub } = makeSut()
    const httpRequest = {
      art: {
        filename: 'nft_art.png'
      },
      body: {
        artistName: 'AA',
        name: 'art_name',
        description: 'description_text',
        quantity: 1,
        price: 1
      }
    }
    jest.spyOn(addNFTStub, 'addNFTToNFTShop').mockImplementationOnce(
      async (nft: NFTData) => {
        return await Promise.resolve(left(new InvalidArtistNameError(nft.artistName)))
      })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidArtistNameError(httpRequest.body.artistName).message)
  })

  test('should return 400 if invalid artist name is provided (too many characters)', async () => {
    const { sut, addNFTStub } = makeSut()
    let artistName: string = ''
    for (let i = 0; i < 33; i++) {
      artistName += 'A'
    }
    const httpRequest = {
      art: {
        filename: 'nft_art.png'
      },
      body: {
        artistName: artistName,
        name: 'art_name',
        description: 'description_text',
        quantity: 1,
        price: 1
      }
    }
    jest.spyOn(addNFTStub, 'addNFTToNFTShop').mockImplementationOnce(
      async (nft: NFTData) => {
        return await Promise.resolve(left(new InvalidArtistNameError(nft.artistName)))
      })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidArtistNameError(httpRequest.body.artistName).message)
  })

  test('should return 400 if invalid name is provided (too few characters)', async () => {
    const { sut, addNFTStub } = makeSut()
    const httpRequest = {
      art: {
        filename: 'nft_art.png'
      },
      body: {
        artistName: 'artist_name',
        name: 'A',
        description: 'description_text',
        quantity: 1,
        price: 1
      }
    }
    jest.spyOn(addNFTStub, 'addNFTToNFTShop').mockImplementationOnce(
      async (nft: NFTData) => {
        return await Promise.resolve(left(new InvalidNameError(nft.name)))
      })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidNameError(httpRequest.body.name).message)
  })

  test('should return 400 if invalid name is provided (too many characters)', async () => {
    const { sut, addNFTStub } = makeSut()
    let name: string = ''
    for (let i = 0; i < 33; i++) {
      name += 'A'
    }
    const httpRequest = {
      art: {
        filename: 'nft_art.png'
      },
      body: {
        artistName: 'artist_name',
        name: name,
        description: 'description_text',
        quantity: 1,
        price: 1
      }
    }
    jest.spyOn(addNFTStub, 'addNFTToNFTShop').mockImplementationOnce(
      async (nft: NFTData) => {
        return await Promise.resolve(left(new InvalidNameError(nft.name)))
      })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidNameError(httpRequest.body.name).message)
  })

  test('should return 400 if invalid description is provided (too few characters)', async () => {
    const { sut, addNFTStub } = makeSut()
    const httpRequest = {
      art: {
        filename: 'nft_art.png'
      },
      body: {
        artistName: 'artist_name',
        name: 'art_name',
        description: 'A',
        quantity: 1,
        price: 1
      }
    }
    jest.spyOn(addNFTStub, 'addNFTToNFTShop').mockImplementationOnce(
      async (nft: NFTData) => {
        return await Promise.resolve(left(new InvalidDescriptionError(nft.description)))
      })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidDescriptionError(httpRequest.body.description).message)
  })

  test('should return 400 if invalid description is provided (too many characters)', async () => {
    const { sut, addNFTStub } = makeSut()
    let description: string = ''
    for (let i = 0; i < 501; i++) {
      description += 'A'
    }
    const httpRequest = {
      art: {
        filename: 'nft_art.png'
      },
      body: {
        artistName: 'artist_name',
        name: 'art_name',
        description: description,
        quantity: 1,
        price: 1
      }
    }
    jest.spyOn(addNFTStub, 'addNFTToNFTShop').mockImplementationOnce(
      async (nft: NFTData) => {
        return await Promise.resolve(left(new InvalidDescriptionError(nft.description)))
      })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidDescriptionError(httpRequest.body.description).message)
  })

  test('should return 400 if invalid quantity is provided', async () => {
    const { sut, addNFTStub } = makeSut()
    const httpRequest = {
      art: {
        filename: 'nft_art.png'
      },
      body: {
        artistName: 'artist_name',
        name: 'art_name',
        description: 'description_text',
        quantity: 0,
        price: 1
      }
    }
    jest.spyOn(addNFTStub, 'addNFTToNFTShop').mockImplementationOnce(
      async (nft: NFTData) => {
        return await Promise.resolve(left(new InvalidQuantityError(nft.quantity)))
      })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidQuantityError(httpRequest.body.quantity).message)
  })

  test('should return 400 if invalid price is provided', async () => {
    const { sut, addNFTStub } = makeSut()
    const httpRequest = {
      art: {
        filename: 'nft_art.png'
      },
      body: {
        artistName: 'artist_name',
        name: 'art_name',
        description: 'description_text',
        quantity: 1,
        price: 0
      }
    }
    jest.spyOn(addNFTStub, 'addNFTToNFTShop').mockImplementationOnce(
      async (nft: NFTData) => {
        return await Promise.resolve(left(new InvalidPriceError(nft.price)))
      })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidPriceError(httpRequest.body.price).message)
  })
})
