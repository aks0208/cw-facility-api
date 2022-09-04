import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Loyalty from "App/Models/Loyalty";
import Discount from "App/Models/Discount";

export default class extends BaseSeeder {
  public async run () {

    await Discount.createMany([
      { discount: 0, type: 'ABSOLUTE' },
      { discount: 5, type: 'RELATIVE' },
      { discount: 10, type: 'RELATIVE' },
      { discount: 20, type: 'RELATIVE' },
    ])

    await Loyalty.createMany([
      { name: 'Silver', min: 0, max: 4, discountId: 1, everyNth: 2 },
      { name: 'Bronze', min: 5, max: 9, discountId: 2, everyNth: 5  },
      { name: 'Gold', min: 10, max: 50, discountId: 3, everyNth: 10 },
      { name: 'Premium', min: 51, max: 1000, discountId: 4, everyNth: 20 }
    ])

  }
}
