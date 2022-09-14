// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Step from "App/Models/Step";

export default class StepsController {
  async show() {
    return Step.query()
      .select('id', 'name');
  }

  async showById({ params }: HttpContextContract) {

    const { id } = await params

    return Step.query()
      .where('id', id)
      .select('id', 'name', 'description', 'price', 'time')
  }
}
