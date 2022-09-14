// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import CardService from "App/Services/Web/CardService";
import UpdateStepValidator from "App/Validators/Web/CardProgram/Step/UpdateStepValidator";
import CardProgramStep from "App/Models/CardProgramStep";

export default class CardProgramStepsController {

  public async create({ request, response }: HttpContextContract) {

    const { step, card_program_id, current_card_id } = await request.body()

    const cardService = new CardService(current_card_id)
    const card = await cardService.getCurrentCard()

    const cardProgram = card.programs.find(p => p.id === card_program_id)

    if(!cardProgram) {
      return response.status(500).send("This program does not exist")
    }

    return await cardService.createStep(cardProgram, step)

  }

  public async update({ request }: HttpContextContract) {

    const { id, status } = await request.validate(UpdateStepValidator)

    const createdStep = await CardProgramStep.findOrFail(id)

    createdStep.status = status

    await createdStep.save()

    await createdStep.load('cardProgram')

    await createdStep.cardProgram.related('activities').create({
      name: `User has been ${status.toLowerCase()} step`
    })

    return 'OK'
  }
}
