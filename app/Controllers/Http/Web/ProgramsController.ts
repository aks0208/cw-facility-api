// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Program from "App/Models/Program";

export default class ProgramsController {

  public async show() {
    return Program.query()
      .select('id', 'name', 'description', 'img_path')
      .preload('steps', (queryStep) => {
        queryStep.select('id', 'price', 'time')
      })
      .withAggregate('steps', (queryStep) => {
        queryStep.sum('price').as('totalPrice')
      })
      .whereHas('steps', () => {})
      .orderBy('created_at')
  }

  public async showCombinedProgram() {
    return Program.query()
      .where('slug', Program.COMBINED)
      .select('id')
      .firstOrFail()
  }
}
