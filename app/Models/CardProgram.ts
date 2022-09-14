import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, BelongsTo, belongsTo, column, hasMany, HasMany, scope} from '@ioc:Adonis/Lucid/Orm'
import Card from "App/Models/Card";
import Program from "App/Models/Program";
import Activity from "App/Models/Activity";
import { v4 as uuid } from 'uuid'
import CardProgramStep from "App/Models/CardProgramStep";
import Transaction from "App/Models/Transaction";

export default class CardProgram extends BaseModel {

  @column({ isPrimary: true })
  public id: string

  @column()
  public cardId: string

  @column()
  public programId: string

  @column()
  public stepId: string

  @column()
  public current: boolean

  @belongsTo(() => Card)
  public card: BelongsTo<typeof Card>

  @belongsTo(() => Program)
  public program: BelongsTo<typeof Program>

  @hasMany(() => CardProgramStep)
  public steps: HasMany<typeof CardProgramStep>

  @hasMany(() => Activity)
  public activities: HasMany<typeof Activity>

  @beforeCreate()
  public static async createId (program: Program) {
    program.id = uuid()
  }

  @hasMany(() => Transaction)
  public transactions: HasMany<typeof Transaction>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static current = scope((query) => {
    query.where('current', true)
  })
}
