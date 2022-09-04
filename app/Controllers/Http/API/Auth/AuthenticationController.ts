// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Customer from "App/Models/Customer";
import Redis from "@ioc:Adonis/Addons/Redis";

export default class AuthenticationController {
  public async me({ auth, response }) {

    try {
      const customer = await Customer.findOrFail(auth.user.id)
      const currentCardId = await Redis.get(`currentCardId:${auth.user!.id}`)

      if(!customer || !currentCardId) return response.status(500).send('Customer or card does not exist')

      await customer.load('cards', (customerCardQuery) => {
       customerCardQuery.where('card_id', currentCardId)
       customerCardQuery.select('customer_id', 'card_id')
       customerCardQuery.preload('card', (cardQuery) => {
         cardQuery.select('id', 'balance', 'auto_charge', 'loyalty_id')
         cardQuery.preload('loyalty', (queryLoyalty) => {
             queryLoyalty.select('name')
           })
       })
      })


      return customer

    }  catch (e) {
      return e
    }

  }
}
