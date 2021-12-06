/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { AddNFT } from '../../../../usecases/add-nft-to-nft-shop/protocols/add-nft'
import { AddNFTResponse } from '../../../../usecases/add-nft-to-nft-shop/protocols/add-nft-response'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../ports/controller'
import { HttpRequest } from '../ports/http'

export class AddNFTController implements Controller {
  private readonly addNFT: AddNFT

  constructor (addNFT: AddNFT) {
    this.addNFT = addNFT
  }

  async handle (httpRequest: HttpRequest): Promise<any> {
    console.log(httpRequest)
    const requiredFields = ['artistName', 'name', 'description', 'quantity', 'price']
    for (const field of requiredFields) {
      if (!httpRequest.body[field] && httpRequest.body[field] !== 0) {
        return badRequest(new MissingParamError(field))
      }
    }
    if (!httpRequest.art) {
      return badRequest(new MissingParamError('art'))
    }
    const nftData = {
      art: httpRequest.art.filename,
      artistName: httpRequest.body.artistName,
      name: httpRequest.body.name,
      description: httpRequest.body.description,
      quantity: httpRequest.body.quantity,
      price: httpRequest.body.price
    }
    const addNFTResponse: AddNFTResponse = await this.addNFT.addNFTToNFTShop(nftData)
    if (addNFTResponse.isLeft()) {
      return badRequest(addNFTResponse.value)
    }
  }
}
