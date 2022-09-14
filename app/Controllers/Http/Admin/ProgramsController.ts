// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Program from "App/Models/Program";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

export default class ProgramsController {

  async show() {
    return Program.query()
      .select('id', 'name');
  }

  async showById({ params }: HttpContextContract) {

    const { id } = await params

    return Program.query()
      .where('id', id)
      .select('id', 'name', 'description')
      .preload('steps')
  }

  /*async showById({ params }: HttpContextContract) {

    const { id } = await params

    return Program.query()
      .where('id', id)
      .select('id', 'name', 'description')
      .preload('steps')
  }*/

}
