'use strict'

import Card from "App/Models/Card";
import CardProgramService from "App/Services/API/CardProgramService";

export default class CardService extends CardProgramService {
  protected currentCardId: string
  protected card: Card

  constructor(currentCardId: string, card?: any ) {
    super(card);
    this.currentCardId = currentCardId;
  }

  async getCurrentCard() {

    this.card = await Card.query()
      .where('id', this.currentCardId)
      .preload('programs', (queryProgram) => {
        queryProgram.select('id')
      })
      .preload('loyalty', (queryLoyalty) => {
        queryLoyalty.select('discount_id', 'id', 'min', 'max', 'every_nth')
        queryLoyalty.preload('discount', (queryDiscount) => {
          queryDiscount.select('id', 'type', 'discount')
        })
      })
      .firstOrFail()

    return this.card
  }

}
