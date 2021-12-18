/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { upload } from '../config/multer'
import { makeAddNFTController } from '../factories/add-nft'

export default (router: Router): void => {
  router.post('/nft', upload.single('art'), adaptRoute(makeAddNFTController()))
}
