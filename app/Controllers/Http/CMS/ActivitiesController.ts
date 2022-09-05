// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Activity from "App/Models/Activity";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

export default class ActivitiesController {
  public async show() {
    return Activity.query()
      .preload('cardProgram', (queryCardProgram) => {
        queryCardProgram.preload('card', (queryCard) => {
          queryCard.preload('customer', (queryCustomerCard) => {
            queryCustomerCard.preload('customer')
          })
        })
        queryCardProgram.preload('program')
      })
  }

  public async showById({ params }: HttpContextContract) {

    const { id } = params

    return Activity.query()
      .where('id', id)
      .preload('cardProgram', (queryCardProgram) => {
        queryCardProgram.preload('steps', (queryCreatedStep) => {
          queryCreatedStep.preload('step')
        })
      })
      .firstOrFail()
  }
}
