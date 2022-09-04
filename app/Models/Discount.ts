import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Discount extends BaseModel {

  public static RELATIVE = 'RELATIVE'
  public static ABSOLUTE = 'ABSOLUTE'

  @column({ isPrimary: true })
  public id: number

  @column()
  public discount: number

  @column()
  public type: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
