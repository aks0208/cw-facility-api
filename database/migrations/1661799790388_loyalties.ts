import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'loyalties'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 45)
      table.string('slug', 45)
      table.integer('min')
      table.integer('max')
      table.integer('every_nth').defaultTo(10)
      table.integer('discount_id').unsigned().references('discounts.id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
