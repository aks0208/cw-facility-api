// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Customer from "App/Models/Customer";

export default class ClientsController {
  public async show() {
    return Customer.query()
      .preload('cards', (queryCard) => {
        queryCard.preload('card')
      })
  }
}
