import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Step from "App/Models/Step";
import { v4 as uuid } from 'uuid'

export default class Program extends BaseModel {

  public static selfAssignPrimaryKey = true

  public static SIMPLE = 'simple-washing-program'
  public static ADVANCED = 'advanced-washing-program'
  public static SUPER = 'super-washing-program'
  public static COMBINED = 'combined-washing-program'

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public slug: string

  @column()
  public description: string

  @column()
  public imgPath: string

  @manyToMany(() => Step)
  public steps: ManyToMany<typeof Step>

  @column({ serializeAs: 'total_price' })
  public totalPrice: string

  public serializeExtras() {
    return {
      price: this.$extras.totalPrice
    }
  }

  @beforeCreate()
  public static async createId (program: Program) {
    program.id = uuid()
  }

  @beforeCreate()
  public static slugify(program: Program) {
    let slugify = require('slugify')
    program.slug = slugify(program.name, {
      replacement: '-',
      remove: /[*+~.()'"!:@]/g,
      lower: true,
      strict: false,
      locale: 'vi',
      trim: true
    })
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
