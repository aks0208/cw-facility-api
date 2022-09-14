'use strict'

import CardProgram from "App/Models/CardProgram";
import TransactionService from "App/Services/API/TransactionService";

import CardProgramStepService from "App/Services/API/CardProgramStepService";
import Card from "App/Models/Card";
const aggregation = require("aggregation/es6")


export default class CardProgramService extends aggregation(TransactionService, CardProgramStepService) {

  protected cardProgram: CardProgram

  constructor(card: Card) {
    super(card);
  }

  async createCardProgram( {program_id, total_price, steps}) {

    this.cardProgram = await this.card.related('programs').create({
      programId: program_id
    })

    await this.createTransaction(total_price, this.cardProgram.id)
    this.createManyCardProgramSteps(this.cardProgram, steps)

    return this.cardProgram

  }

}


