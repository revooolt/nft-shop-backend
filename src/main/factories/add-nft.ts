import { AddNFTController } from '../../adapters/presentation/controllers/add-nft/add-nft-controller'
import { NFTPgTypeORMRepository } from '../../external/db/postgresql/orm/typeorm/repositories/nft-repository'
import { AddNFTToNFTShop } from '../../usecases/add-nft-to-nft-shop/ add-nft-to-nft-shop'

export const makeAddNFTController = (): AddNFTController => {
  const nftPgTypeORMRepository = new NFTPgTypeORMRepository()
  const addNFTToNFTShop = new AddNFTToNFTShop(nftPgTypeORMRepository)
  return new AddNFTController(addNFTToNFTShop)
}
