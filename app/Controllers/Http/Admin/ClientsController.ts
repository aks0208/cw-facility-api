// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Customer from "App/Models/Customer";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import CreateClientValidator from "App/Validators/Admin/Client/CreateClientValidator";
import Card from "App/Models/Card";

export default class ClientsController {
  public async show() {
    return Customer.query()
      .preload('cards', (queryCard) => {
        queryCard.preload('card')
      })
  }

  public async showById({ params }: HttpContextContract) {

    const { id } = params

    return Customer.query()
      .where('id', id)
      .preload('cards', (queryCard) => {
        queryCard.preload('card')
      })
      .firstOrFail()

  }

  public async create({ request }: HttpContextContract) {

    const payload = await request.validate(CreateClientValidator)

    const customer = await Customer.create(payload)

    const card = await Card.create({})

    await customer.related('cards')
      .create({cardId: card!.id, customerId: customer.$getAttribute('id')})

    return 'OK'
  }
}
