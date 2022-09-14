import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'card_program_steps'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary()
      table.enum('status', ['CREATED', 'STARTED', 'FINISHED', 'ABORTED']).defaultTo('CREATED')
      table.decimal('price')
      table.integer('time')
      table.uuid('card_program_id').unsigned().references('card_programs.id')
      table.uuid('step_id').unsigned().references('steps.id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
