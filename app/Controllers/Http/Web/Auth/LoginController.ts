// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Card from "App/Models/Card";
import LoginValidator from "App/Validators/Web/Auth/LoginValidator";
import Customer from "App/Models/Customer";
import Redis from "@ioc:Adonis/Addons/Redis";

export default class LoginController {

  async authenticate({ auth, response, request } ) {

    const { holder_number }  = await request.validate(LoginValidator)

    try {
      const card = await Card
        .query()
        .where('holder_number', holder_number)
        .preload('customer')
        .firstOrFail()

      const customer = await Customer.query().whereHas('cards', (cardQuery) => {
         return cardQuery.where('card_id', card.id)
      }).firstOrFail()


      if (!card || !customer)
        return response.badRequest('Invalid card id')

      await Redis.set(`currentCardId:${customer.id}`, card.id)

      return await auth.use('api').generate(customer,  {
        expiresIn: '1days'
      })

    } catch {
      return response.badRequest('Invalid card id')
    }
  }
}
