
import Factory from '@ioc:Adonis/Lucid/Factory'
import Customer from "App/Models/Customer";

export default Factory.define(Customer, ({ faker }) => {
  return {
    firstName: faker.internet.userName(),
    lastName: faker.internet.userName(),
    phoneNumber: '387' + (Math.random() * 8 + "").split('.')[0],
    email: faker.internet.email()
  }
}).build()
