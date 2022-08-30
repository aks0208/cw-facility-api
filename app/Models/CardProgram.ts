import { DateTime } from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import Card from "App/Models/Card";
import Program from "App/Models/Program";
import Step from "App/Models/Step";

export default class CardProgram extends BaseModel {

  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: number

  @column()
  public cardId: string

  @column()
  public programId: string

  @column()
  public stepId: number

  @column()
  public status: string

  @column()
  public price: number

  @belongsTo(() => Card)
  public card: BelongsTo<typeof Card>

  @belongsTo(() => Program)
  public program: BelongsTo<typeof Program>

  @belongsTo(() => Step)
  public step: BelongsTo<typeof Step>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
