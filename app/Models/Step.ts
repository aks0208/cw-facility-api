import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, column} from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'


export default class Step extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public price: number

  @column()
  public time: number

  @column()
  public imgPath: string

  @column({serializeAs: 'combined_program_id'})
  public combinedProgramId: string

  @beforeCreate()
  public static async createId (step: Step) {
    step.id = uuid()
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
