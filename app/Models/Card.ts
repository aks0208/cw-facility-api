import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne
} from '@ioc:Adonis/Lucid/Orm'
import CardCustomer from "App/Models/CardCustomer";
import CardProgram from "App/Models/CardProgram";
import { v4 as uuid } from 'uuid'
import Loyalty from "App/Models/Loyalty";

export default class Card extends BaseModel {

  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public holderNumber: bigint

  @column()
  public balance: string

  @column()
  public autoCharge: boolean

  @column()
  public loyaltyId: number

  @hasOne(() => CardCustomer)
  public customer: HasOne<typeof CardCustomer>

  @hasMany(() => CardProgram)
  public programs: HasMany<typeof CardProgram>

  @belongsTo(() => Loyalty)
  public loyalty: BelongsTo<typeof Loyalty>

  @beforeCreate()
  public static async createAutoValues (card: Card) {
    card.id = uuid()
    card.holderNumber = BigInt(Date.now() + (100 + Math.random() * 900 + "").split('.')[0])
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
