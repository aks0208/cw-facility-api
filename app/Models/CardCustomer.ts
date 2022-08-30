import { DateTime } from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import Card from "App/Models/Card";
import Customer from "App/Models/Customer";

export default class CardCustomer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public cardId: string

  @column()
  public customerId: number

  @belongsTo(() => Card)
  public card: BelongsTo<typeof Card>

  @belongsTo(() => Customer)
  public customer: BelongsTo<typeof Customer>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
