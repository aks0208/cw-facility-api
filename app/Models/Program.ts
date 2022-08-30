import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Step from "App/Models/Step";
import { v4 as uuid } from 'uuid'

export default class Program extends BaseModel {

  public static selfAssignPrimaryKey = true

  public static SIMPLE = 'Simple washing program'
  public static ADVANCED = 'Advanced washing program'
  public static SUPER = 'Super washing program'
  public static COMBINED = 'Combined washing program'

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public description: string

  @manyToMany(() => Step)
  public steps: ManyToMany<typeof Step>

  @beforeCreate()
  public static async createId (program: Program) {
    program.id = uuid()
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
