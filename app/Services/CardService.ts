'use strict'

import Card from "App/Models/Card";

export default class CardService {
  protected currentCardId: string

  constructor(currentCardId: string) {
    this.currentCardId = currentCardId;
  }

  async getCurrentCard() {

    return await Card.query()
      .where('id', this.currentCardId)
      .preload('programs', (queryProgram) => {
        queryProgram.withCount('transactions')
      })
      .preload('loyalty', (queryLoyalty) => {
        queryLoyalty.select('discount_id', 'id', 'min', 'max', 'every_nth')
        queryLoyalty.preload('discount', (queryDiscount) => {
          queryDiscount.select('id', 'type', 'discount')
        })
      })
      .firstOrFail()
  }

}
