/* eslint-disable @typescript-eslint/no-floating-promises */
import { createConnection, getConnectionOptions } from 'typeorm'

interface IOptions {
  host: string
}

getConnectionOptions().then(options => {
  const newOptions = options as IOptions
  newOptions.host = 'database_nft-shop'
  createConnection({
    ...options
  })
})
