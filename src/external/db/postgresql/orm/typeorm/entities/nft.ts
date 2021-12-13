import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity('nfts')
export class NFT {
  @PrimaryColumn()
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
