import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'card_programs'

  public async up () {

    await this.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().defaultTo(this.raw('uuid_generate_v4()')).primary()
      table.uuid('card_id').unsigned().references('cards.id')
      table.uuid('program_id').unsigned().references('programs.id')
      table.uuid('step_id').unsigned().references('steps.id')
      table.enum('status', ['CREATED', 'STARTED', 'FINISHED', 'ABORTED']).defaultTo('CREATED')
      table.decimal('price')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
