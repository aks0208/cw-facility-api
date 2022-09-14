'use strict'

import Card from "App/Models/Card";
import Discount from "App/Models/Discount";
import Loyalty from "App/Models/Loyalty";

export default class LoyaltyDiscountService  {
  protected card: Card

  constructor(card: Card) {
   this.card = card
  }

  protected getPriceWithDiscount(price) {
    let totalPrice = 0

    if(this.card.loyalty.discount.type === Discount.RELATIVE && (this.card.totalTransactions % this.card.loyalty.everyNth) === 0) {
      totalPrice = price - (price/this.card.loyalty.discount.discount)
    }

    if(this.card.loyalty.discount.type === Discount.ABSOLUTE && (this.card.totalTransactions % this.card.loyalty.everyNth) === 0) {
      const newPrice = price - this.card.loyalty.discount.discount
      totalPrice = newPrice >= 0 ? newPrice : 0
    }

    return totalPrice
  }

  protected async updateLoyalty() {
    const loyalties = await Loyalty.all()

    //total loyalties
    for (const l of loyalties) {
      if (this.card.totalTransactions >= l.min && this.card.totalTransactions <= l.max) {
        this.card.loyaltyId = l.id
        await this.card.save()
      }
    }
  }


}
