'use strict'

import CardProgram from "App/Models/CardProgram";
import CardProgramStep from "App/Models/CardProgramStep";
import TransactionService from "App/Services/API/TransactionService";

export default class CardProgramStepService extends TransactionService {

  protected async createManyCardProgramSteps(cardProgram: CardProgram, steps: Array<{id: string, price: number, time: number}>) :Promise<void> {
    await cardProgram.related('steps')
      .createMany(steps.map(s => {
          return {
            step_id: s.id,
            price: s.price,
            time: s.time
          }
        })
      )
  }

  async createStep(cardProgram: CardProgram, step) :Promise<CardProgramStep | undefined> {

    await this.createTransaction(step.price, cardProgram.id)

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


}
