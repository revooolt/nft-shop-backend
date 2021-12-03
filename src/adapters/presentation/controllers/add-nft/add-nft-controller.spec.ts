import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { AddNFTController } from './add-nft-controller'

interface SutTypes {
  sut: AddNFTController
}

const makeSut = (): SutTypes => {
  const sut = new AddNFTController(
  )
  return {
    sut
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

  test('should return 400 if no name is provided', async () => {
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
})
