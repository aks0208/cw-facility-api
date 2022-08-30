import Employee from 'App/Models/Employee'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Employee, ({ faker }) => {
  return {
    firstName: faker.internet.userName(),
    lastName: faker.internet.userName(),
    phoneNumber: '387' + (Math.random() * 8 + "").split('.')[0],
    email: faker.internet.email(),
    password: 'password'
  }
}).build()
