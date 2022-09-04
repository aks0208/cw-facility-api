import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import Discount from "App/Models/Discount";

export default class Loyalty extends BaseModel {

  public static SILVER: 'silver'
  public static BRONZE: 'bronze'
  public static GOLD: 'gold'
  public static PREMIUM: 'premium'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public slug: string

  @column()
  public min: number

  @column()
  public max: number

  @column()
  public everyNth: number

  @column()
  public discountId: number

  @beforeCreate()
  public static slugify(loyalty: Loyalty) {
    let slugify = require('slugify')
    loyalty.slug = slugify(loyalty.name, {
      replacement: '-',
      remove: /[*+~.()'"!:@]/g,
      lower: true,
      strict: false,
      locale: 'vi',
      trim: true
    })
  }

  @belongsTo(() => Discount)
  public discount: BelongsTo<typeof Discount>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
