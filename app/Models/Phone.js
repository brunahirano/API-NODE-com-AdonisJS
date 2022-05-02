'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

//um phone pertence a um usuário, relacionamento
class Phone extends Model {
  client() {
    return this.belongsTo('App/Models/Client')
  }
}

module.exports = Phone
