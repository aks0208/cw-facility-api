import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cards'

  public async up () {

    this.schema.createTable(this.tableName, (table) => {

      table.uuid('id').unique().primary()
      table.bigInteger('holder_number')
      table.decimal('balance').defaultTo(0)
      table.boolean('auto_charge').defaultTo(false)
      table.integer('total_transactions').defaultTo(0)
      table.integer('loyalty_id').unsigned().references('loyalties.id').defaultTo(1)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
