'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

//um address pertence a um usuário, relacionamento
class Address extends Model {
  client() {
    return this.belongsTo('App/Models/Client')
  }
}

module.exports = Address
