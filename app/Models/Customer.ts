import { DateTime } from 'luxon'
import {BaseModel, column, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm'
import CardCustomer from "App/Models/CardCustomer";

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column ()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public email: string

  @column()
  public phoneNumber: string

  @column()
  public city: string

  @column()
  public address: string

  @column()
  public zipCode: bigint

  @hasMany(() => CardCustomer)
  public cards: HasMany<typeof CardCustomer>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
