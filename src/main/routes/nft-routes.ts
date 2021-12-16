import { Router } from 'express'

export default (router: Router): void => {
  router.post('/nft', (request, response) => {
    response.json({ statusCode: 200 })
  })
}
