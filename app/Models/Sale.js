'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sale extends Model {

  //Método onde eu crio um relacionamento entre o Cliente(client) e a Venda(sale), onde a venda pertence a 1 cliente
  clients() {
     return this.belongsTo('App/Models/Client')
  }

  //Relacionamento de vendas com os produtos
  products() {
    return this.belongsTo('App/Models/Product')
  }


}

module.exports = Sale
