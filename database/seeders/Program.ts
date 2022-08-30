import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Program from "App/Models/Program";
import Step from "App/Models/Step";

export default class extends BaseSeeder {
  public async run () {
    const programs = await Program.createMany([
      {
        name: 'Simple washing program',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      {
        name: 'Advanced washing program',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      {
        name: 'Super washing program',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      {
        name: 'Combined washing program',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      }
    ])

    const steps = await Step.createMany([
      {
        name: 'Soaking the car',
        description: 'Get a pressure washer and soak the car.',
        price: 1,
        time: 120
      },
      {
        name: 'Shampooing the car',
        description: 'Get a pressure washer and shampoo the car.',
        price: 1,
        time: 120
      },
      {
        name: 'Rinse with demi water',
        description: 'Get a pressure washer and rinse the car with demi water.',
        price: 1,
        time: 120
      },
      {
        name: 'Applying wax',
        description: 'Get a pressure washer for waxing and apply wax.',
        price: 1,
        time: 120
      },
      {
        name: 'Vacuuming the car',
        description: 'Get a vacuuming stick and vacuum the car.',
        price: 3,
        time: 360
      },
    ])

    for (const p of programs) {
      await p.load('steps')
      if(p.name === Program.SIMPLE)
        p.related('steps').sync(steps.slice(0, 3).map(s => s.id), false)
      if(p.name === Program.ADVANCED)
        p.related('steps').sync(steps.slice(0, 4).map(s => s.id), false)
      if(p.name === Program.SUPER)
        p.related('steps').sync(steps.slice(1, 4).map(s => s.id), false)
    }
  }
}
