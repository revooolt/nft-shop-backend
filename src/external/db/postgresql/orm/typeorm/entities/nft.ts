import { Column, CreateDateColumn, Entity } from 'typeorm'

@Entity('nfts')
export class NFT {
  @Column()
  art: string

  @Column()
  name: string

  @Column()
  artistName: string

  @Column()
  description: string

  @Column()
  quantity: number

  @Column()
  price: number

  @CreateDateColumn()
  created_at: Date
}
