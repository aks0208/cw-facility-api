import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Redis from "@ioc:Adonis/Addons/Redis";
import Card from "App/Models/Card";

export default class CheckAuthCard {
  public async handle({auth, response, request}: HttpContextContract, next: () => Promise<void>) {

    let currentCardId: string | null = await Redis.get(`currentCardId:${auth.user!.id}`)

    if(!currentCardId) {
      return response.status(500)
        .send('Please logout and login again. If that is not helpful, contact our support')
    }

    if(! await Card.find(currentCardId))
      return response.status(500)
        .send('Card does not exist anymore')

    request.updateBody({
      current_card_id: currentCardId,
      ...request.body()
    })

    await next()
  }
}
