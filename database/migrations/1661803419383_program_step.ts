import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'program_step'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('program_id').unsigned().references('programs.id')
      table.uuid('step_id').unsigned().references('steps.id')
      table.unique(['program_id', 'step_id'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
