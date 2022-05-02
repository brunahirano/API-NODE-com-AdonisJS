'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Client extends Model {

  /** Um client pode fazer várias compras */
  // sales() {
  //   return this.belongsToMany("App/Models/Sale")
  // }

  clients() {
    return belongsTo('App/Models/Client')
  }

  sales() {
    return this.hasMany("App/Models/Sale")
  }

  products(){
    return this.belongsTo('App/Models/Product')
  }


}

module.exports = Client
