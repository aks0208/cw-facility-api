// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import UpdateAutoChargeValidator from "App/Validators/Web/Card/UpdateAutoChargeValidator";
import Redis from "@ioc:Adonis/Addons/Redis";
import Card from "App/Models/Card";
import UpdateBalanceValidator from "App/Validators/Web/Card/UpdateBalanceValidator";

export default class CardsController {

  public async updateAutoCharge({ auth, request, response }: HttpContextContract) {

    try {
      const { auto_charge } = await request.validate(UpdateAutoChargeValidator)

      const currentCardId = await Redis.get(`currentCardId:${auth.user!.id}`)

      if(!currentCardId) return response.status(500)
        .send('Please logout and login again. If that is not helpful, contact our support')

      const card = await Card.findOrFail(currentCardId)

      card.autoCharge = auto_charge

      await card.save()

      return 'OK'

    } catch (e) {
      return e
    }

  }

  public async updateBalance({ auth, request, response }: HttpContextContract) {

    const { balance } = await request.validate(UpdateBalanceValidator)
    try {

      const currentCardId = await Redis.get(`currentCardId:${auth.user!.id}`)

      if(!currentCardId) return  response.status(500)
        .send('Please logout and login again. If that is not helpful, contact our support')

      const card = await Card.findOrFail(currentCardId)

      card.balance = (parseFloat(card.balance) + balance).toFixed(2)

      await card.save()

      return card.balance

    } catch (e) {
      return e
    }

  }

}
