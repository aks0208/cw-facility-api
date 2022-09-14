// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Program from "App/Models/Program";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import CreateProgramValidator from "App/Validators/Admin/Program/CreateProgramValidator";
import UpdateProgramValidator from "App/Validators/Admin/Program/UpdateProgramValidator";

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
      .preload('steps', (querySteps) => {
        querySteps.select('id')
      })
      .firstOrFail()
  }

  async create({ request }: HttpContextContract) {

    const { name, description, steps } = await request.validate(CreateProgramValidator)

    const program = await Program.create({name, description})

    await program.related('steps').attach(steps.map(s => s.id))

    return 'OK'
  }

  async update({ params, request }: HttpContextContract) {

    const { name, description, steps} = await request.validate(UpdateProgramValidator)
    const { id } = params

    const program = await Program.findOrFail(id)

    program.name = name
    program.description = description

    await program.save()

    await program.related('steps').sync(steps.map(s => s.id))

    return 'OK'
  }

  async delete({ params }: HttpContextContract) {

    const { id } = params

    await Program.query().where('id', id).delete()

    return 'OK'
  }

}
