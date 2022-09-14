'use strict'

import Transaction from "App/Models/Transaction";
import Card from "App/Models/Card";
import LoyaltyDiscountService from "App/Services/Web/LoyaltyDiscountService";

export default class TransactionService extends LoyaltyDiscountService {

  protected card: Card;

  constructor(card: Card) {
    super(card)
    this.card = card
  }

  protected async createTransaction(price: number, cardProgramId: string) {

    let totalPrice = this.getPriceWithDiscount(price);

    this.card.balance = (parseFloat(this.card.balance) - totalPrice).toFixed(2)
    await this.card.save()

    await Transaction.create({
      total: totalPrice.toFixed(2),
      cardProgramId: cardProgramId
    })

    this.card.totalTransactions = Number(this.card.totalTransactions) + 1
    await this.card.save()

    await this.updateLoyalty()

  }


}
