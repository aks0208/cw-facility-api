// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Step from "App/Models/Step";
import Program from "App/Models/Program";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

export default class StepsController {
  public async show({response}: HttpContextContract) {

    try {
      const combinedProgram = await Program.findByOrFail('slug', Program.COMBINED)

      if(!combinedProgram) {
        response.status(500).send('Combined program does not exist')
      }
      const steps = await Step.query()
        .select('id', 'name', 'description', 'price', 'time', 'img_path')

      for (const step of steps) {
        await step.$setAttribute('combinedProgramId', combinedProgram.id)
      }

      return steps


    } catch (e) {
      return e
    }

  }
}
