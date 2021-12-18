import { Controller } from '../../../adapters/presentation/controllers/ports/controller'
import { HttpRequest } from '../../../adapters/presentation/controllers/ports/http'

import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    console.warn(request)
    const httpRequest: HttpRequest = {
      art: request.file,
      body: request.body
    }

    const httpResponse = await controller.handle(httpRequest)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
