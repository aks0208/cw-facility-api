import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'customers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('first_name', 45)
      table.string('last_name', 45)
      table.string('email', 45)
      table.string('phone_number', 45).nullable()
      table.string('city', 45).nullable()
      table.string('address', 45).nullable()
      table.string('zip_code', 45).nullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
