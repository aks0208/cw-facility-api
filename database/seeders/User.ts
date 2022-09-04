import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import CustomerFactory from "Database/factories/CustomerFactory";
import Card from "App/Models/Card";
import EmployeeFactory from "Database/factories/EmployeeFactory";
//import EmployeeFactory from "Database/factories/EmployeeFactory";

export default class extends BaseSeeder {
  public async run () {
    const customers = await CustomerFactory.createMany(5)
    for (const c of customers) {
      const card = await Card.create({})

      c.related('cards').create({cardId: card!.id, customerId: c.$getAttribute('id')})
    }

    await EmployeeFactory.createMany(5)

  }
}
