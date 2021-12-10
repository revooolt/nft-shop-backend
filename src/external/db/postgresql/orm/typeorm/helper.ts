/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {
  createConnection,
  Connection,
  Repository,
  EntityTarget
} from 'typeorm'

export class TypeORMHelper {
  private client: Connection = null as any
  private static _instance: TypeORMHelper

  private constructor () {}

  static get instance (): TypeORMHelper {
    if (!TypeORMHelper._instance) {
      TypeORMHelper._instance = new TypeORMHelper()
    }
    return TypeORMHelper._instance
  }

  async connect (): Promise<void> {
    this.client = await createConnection()
    await this.client.runMigrations()
  }

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null as any
  }

  async deleteFrom (table: string): Promise<void> {
    await this.client.query(`DELETE FROM ${table}`)
  }

  getRepository<T>(entity: EntityTarget<T>): Repository<T> {
    return this.client.getRepository(entity)
  }
}
