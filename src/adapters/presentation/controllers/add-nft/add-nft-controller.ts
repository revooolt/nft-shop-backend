/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../ports/controller'
import { HttpRequest } from '../ports/http'

export class AddNFTController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<any> {
    const requiredFields = ['artistName', 'name', 'description', 'quantity', 'price']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    if (!httpRequest.art) {
      return badRequest(new MissingParamError('art'))
    }
    return null
  }
}
