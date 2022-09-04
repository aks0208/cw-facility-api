// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Card from "App/Models/Card";
import Redis from "@ioc:Adonis/Addons/Redis";
import CreateCardProgramValidator from "App/Validators/API/CardProgram/CreateCardProgramValidator";
import UpdateCreatedStepValidator from "App/Validators/API/CardProgram/UpdateCreatedStepValidator";
import Activity from "App/Models/Activity";
import CreatedStep from "App/Models/CreatedStep";
import CardProgram from "App/Models/CardProgram";
import CreateStepValidator from "App/Validators/API/CardProgram/CreateStepValidator";
import UpdateAutoChargeValidator from "App/Validators/API/Card/UpdateAutoChargeValidator";
import UpdateBalanceValidator from "App/Validators/API/Card/UpdateBalanceValidator";
import Transaction from "App/Models/Transaction";
import Discount from "App/Models/Discount";
import Loyalty from "App/Models/Loyalty";
import CardService from "App/Services/CardService";

export default class MainController {

  public async showById({ params }: HttpContextContract) {

    const { card_program_id } = params

    try {

      return await CardProgram.query()
        .where('id', card_program_id)
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

  public async create({ auth, request, response }: HttpContextContract) {

    try {
      const payload = await request.validate(CreateCardProgramValidator)

      let currentCardId: string | null = await Redis.get(`currentCardId:${auth.user!.id}`)

      if(!currentCardId) {
        return response.status(500)
          .send('Please logout and login again. If that is not helpful, contact our support')
      }

      const cardService = new CardService(currentCardId)
      const card = await cardService.getCurrentCard()

      for (const item of card.programs) {
        item.current = false
        await item.save()
      }

      if(parseFloat(card.balance) < payload.total_price) {
        return response.status(400).send("You don't have enough money")
      }

      const cardProgram = await card.related('programs').create({
        programId: payload.program_id
      })

      await MainController.createTransaction(card, payload.total_price, cardProgram.id)

      await cardProgram.related('steps')
        .createMany(payload.steps.map(s => {
            return {
              step_id: s.id,
              price: s.price,
              time: s.time
            }
          })
        )

      await Activity.create({
        cardProgramId: cardProgram.id,
        name: 'User has been created a program'
      })

      return {card_program_id: cardProgram.id}

    } catch (e) {
      return e
    }
  }

  private static async createTransaction(card: Card, price: number, id: string) {

    let totalPrice = price;

    const totalTransactions = card.programs.map(p => Number(p.$extras.transactions_count))
      .reduce((prev, next) => prev + next)

    if(card.loyalty.discount.type === Discount.RELATIVE && (totalTransactions % card.loyalty.everyNth) === 0) {
      totalPrice = price - (price/card.loyalty.discount.discount)
    }

    if(card.loyalty.discount.type === Discount.ABSOLUTE && (totalTransactions % card.loyalty.everyNth) === 0) {
      const newPrice = price - card.loyalty.discount.discount
      totalPrice = newPrice >= 0 ? newPrice : 0
    }

    card.balance = (parseFloat(card.balance) - totalPrice).toFixed(2)
    await card.save()

    await Transaction.create({
      total: totalPrice.toFixed(2),
      cardProgramId: id
    })

    const loyalties = await Loyalty.all()

    for (const l of loyalties) {
      if ((totalTransactions + 1) >= l.min && (totalTransactions + 1) <= l.max) {
        card.loyaltyId = l.id
        await card.save()
      }
    }

  }

  public async createStep({ auth, request, response }: HttpContextContract) {

    const { card_program_id, step } = await request.validate(CreateStepValidator)

    let currentCardId: string | null = await Redis.get(`currentCardId:${auth.user!.id}`)

    if(!currentCardId) {
      return response.status(500)
        .send('Please logout and login again. If that is not helpful, contact our support')
    }

    const cardService = new CardService(currentCardId)
    const card = await cardService.getCurrentCard()

    const cardProgram = card.programs.find(p => p.id === card_program_id)

    if(!cardProgram) {
      return response.status(400).send("This program does not exist")
    }
    if(parseFloat(card.balance) < step.price) {
      return response.status(400).send("You don't have enough money for this program")
    }

    await MainController.createTransaction(card, step.price, cardProgram.id)

    await cardProgram.related('steps').create(step)

    await cardProgram.load('steps', (queryCreatedStep) => {
      queryCreatedStep.orderBy('created_at')
      queryCreatedStep.select('id', 'step_id', 'price', 'time', 'status')
      queryCreatedStep.preload('step', (queryStep) => {
        queryStep.select('name', 'description', 'img_path', 'price', 'time')
      })
    })

    return cardProgram.steps.pop()
  }

  public async updateCreatedStep({ request }: HttpContextContract) {

    const { id, status } = await request.validate(UpdateCreatedStepValidator)

    const createdStep = await CreatedStep.findOrFail(id)

    createdStep.status = status

    await createdStep.save()

    await createdStep.load('cardProgram')

    await createdStep.cardProgram.related('activities').create({
      name: `User has been ${status.toLowerCase()} step`
    })

    return 'OK'
  }

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
