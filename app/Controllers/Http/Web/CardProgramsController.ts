// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import CardProgram from "App/Models/CardProgram";
import CardService from "App/Services/Web/CardService";
import Activity from "App/Models/Activity";

export default class CardProgramsController {

  public async showById({ params }: HttpContextContract) {

    const { id } = params

    try {

      return await CardProgram.query()
        .where('id', id)
        .where('current', true)
        .preload('program', (queryProgram) => {
          queryProgram.select('name')
        })
        .preload('steps', (queryCreatedStep) => {
          queryCreatedStep.orderBy('created_at')
          queryCreatedStep.select('id', 'step_id', 'price', 'time', 'status')
          queryCreatedStep.preload('step', (queryStep) => {
            queryStep.select('name', 'description', 'img_path', 'price', 'time')
          })
        })
        .select('id', 'program_id')
        .firstOrFail()


    } catch (e) {
      return e
    }

  }

  public async create({ request }: HttpContextContract) {

    try {

      const  { total_price, program_id, steps } = await request.body()

      const cardService = new CardService(request.body().current_card_id)

      await cardService.getCurrentCard()

      await CardProgram.query()
        .withScopes((scopes) => scopes.current())
        .update({current: false})

      const cardProgram: CardProgram = await cardService.createCardProgram({total_price, program_id, steps})


      await Activity.create({
        cardProgramId: cardProgram.id,
        name: 'User has been created a program'
      })

      return {card_program_id: cardProgram.id}

    } catch (e) {
      return e
    }
  }

}
