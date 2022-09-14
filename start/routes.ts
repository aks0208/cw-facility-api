/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

//Web
Route.group(() => {

  //auth
  Route.group(() => {
    Route.post('/login', 'LoginController.authenticate')
    Route.get('/me', 'AuthenticationController.me').middleware('auth')

  }).namespace('App/Controllers/Http/Web/Auth')

  Route.group(() => {

    //default programs
    Route.group(() => {

      Route.get('/', 'ProgramsController.show')
      Route.get('/combined', 'ProgramsController.showCombinedProgram')

    }).prefix('programs')

    //default steps
    Route.get('/steps', 'StepsController.show')

    //customer's programs
    Route.group(() => {

      Route.get('/:id', 'CardProgramsController.showById').where('id', Route.matchers.uuid())
      Route.post('/', 'CardProgramsController.create').middleware(['card', 'balance'])

      //program with steps
      Route.group(() => {

        Route.put('/', 'CardProgramStepsController.update')
        Route.post('/', 'CardProgramStepsController.create').middleware(['card', 'balance'])

      }).prefix('/step').where('card_program_id', Route.matchers.uuid())

    }).prefix('card-programs')

    //card
    Route.group(() => {

      Route.put('/auto-charge', 'CardsController.updateAutoCharge')
      Route.put('/balance', 'CardsController.updateBalance')

    }).prefix('card')


  }).namespace('App/Controllers/Http/Web').middleware('auth')

}).prefix('api')


//Admin
Route.group(() => {

  Route.group(() => {
    Route.post('/login', 'LoginController.login')
    Route.get('/me', 'AuthenticationController.me').middleware('auth:admin')

  }).namespace('App/Controllers/Http/Admin/Auth')

  Route.group(() => {
    Route.group(() => {
      Route.get('/', 'ClientsController.show')
      Route.get('/:id', 'ClientsController.showById').where('id', Route.matchers.number())
      Route.post('/', 'ClientsController.create')
    }).prefix('clients')

    Route.group(() => {
      Route.get('/', 'ActivitiesController.show')
      Route.get('/:id', 'ActivitiesController.showById').where('id', Route.matchers.number())
    }).prefix('activities')

    Route.group(() => {
      Route.get('/', 'EmployeesController.show')
    }).prefix('employees')


  }).namespace('App/Controllers/Http/Admin').middleware('auth:admin')

}).prefix('admin')
