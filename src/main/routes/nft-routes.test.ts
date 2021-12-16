/* eslint-disable node/handle-callback-err */
import request from 'supertest'
import app from '../config/app'
import path from 'path'

describe('NFT Routes', () => {
  test('should return an NFT on success', async () => {
    await request(app)
      .post('/api/nft')
      .attach('art', path.resolve(`${__dirname}../../../../mocks/art_test.png`))
      .field('artistName', 'revolt')
      .field('name', 'clean-arch-nft')
      .field('description', 'The Clean Architecture turned into an NFT')
      .field('quantity', 5)
      .field('price', 300)
      .expect(200)
  })
})
