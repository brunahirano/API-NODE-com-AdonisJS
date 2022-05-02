'use strict'

const AuthController = require('../app/Controllers/Http/AuthController')
const ClientController = require('../app/Controllers/Http/ClientController')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/**Rotas Users */
Route.post('/users/register', 'AuthController.register')
Route.post('/users/authenticate', 'AuthController.authenticate')
Route.get('/users', 'AuthController.index')

/**Rotas Clients */
Route.group(() => {
  Route.resource('clients', 'ClientController').apiOnly()
}).middleware('auth');

/**Rotas addresses */
Route.group(() => {
  Route.resource('addresses', 'AddressController').apiOnly()
}).middleware('auth');

/**Rotas phone */
Route.group(() => {
  Route.resource('phones', 'PhoneController').apiOnly()
}).middleware('auth');

/**Rotas products */
Route.group(() => {
  Route.resource('products', 'ProductController').apiOnly()
}).middleware('auth');

/**Rotas sales */
Route.group(() => {
  Route.resource('sales', 'SaleController').apiOnly().except('update')
}).middleware('auth');
