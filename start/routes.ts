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

Route.group(() => {


  Route.group(() => {
    Route.post('/login', 'LoginController.authenticate')
    Route.get('/me', 'AuthenticationController.me').middleware('auth')

  }).namespace('App/Controllers/Http/API/Auth')

  Route.group(() => {

    Route.group(() => {
      Route.get('/', 'ProgramsController.show')
      Route.get('/combined', 'ProgramsController.showCombinedProgram')
    }).prefix('programs')

    Route.group(() => {

      Route.group(() => {
        Route.put('/', 'MainController.updateCreatedStep')
        Route.post('/', 'MainController.createStep')
      }).prefix('step')

      Route.get('/:card_program_id', 'MainController.showById')
      Route.post('/:program_id', 'MainController.create')



    }).prefix('card-programs')

    Route.group(() => {

      Route.put('/auto-charge', 'MainController.updateAutoCharge')
      Route.put('/balance', 'MainController.updateBalance')

    }).prefix('card')


    Route.get('/steps', 'StepsController.show')
    Route.post('/prepare-facility', 'MainController.create')

  }).namespace('App/Controllers/Http/API').middleware('auth')

}).prefix('api')


Route.group(() => {

  Route.group(() => {
    Route.post('/login', 'LoginController.login')
    Route.get('/me', 'AuthenticationController.me').middleware('auth:cms')

  }).namespace('App/Controllers/Http/CMS/Auth')

  Route.group(() => {
    Route.get('/clients', 'ClientsController.show')
  }).namespace('App/Controllers/Http/CMS').middleware('auth:cms')

}).prefix('cms')
