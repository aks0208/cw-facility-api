import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import Step from "App/Models/Step";
import CardProgram from "App/Models/CardProgram";
import Program from "App/Models/Program";
import { v4 as uuid } from 'uuid'

export default class CardProgramStep extends BaseModel {

  public static selfAssignPrimaryKey = true

  public static CREATED = 'CREATED'
  public static STARTED = 'STARTED'
  public static FINISHED = 'FINISHED'
  public static ABORTED = 'ABORTED'

  @column({ isPrimary: true })
  public id: string

  @column()
  public stepId: string

  @column()
  public cardProgramId: string

  @column()
  public status: string

  @column()
  public price: number

  @column()
  public time: number

  @belongsTo(() => Step)
  public step: BelongsTo<typeof Step>

  @belongsTo(() => CardProgram)
  public cardProgram: BelongsTo<typeof CardProgram>

  @beforeCreate()
  public static async createId (program: Program) {
    program.id = uuid()
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
