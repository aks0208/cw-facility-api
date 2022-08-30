import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'programs'

  public async up () {

    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary()
      table.string('name', 65)
      table.string('description')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
