import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class AddNFTToNFTShop1639424592450 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table(
        {
          name: 'nfts',
          columns: [
            {
              name: 'name',
              type: 'varchar',
              isUnique: true,
              length: '32'
            },
            {
              name: 'artistName',
              type: 'varchar',
              isUnique: true,
              length: '32'
            },
            {
              name: 'description',
              type: 'varchar',
              length: '500'
            },
            {
              name: 'quantity',
              type: 'integer'
            },
            {
              name: 'price',
              type: 'money'
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()'
            }
          ]
        }
      )
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('nfts')
  }
}
