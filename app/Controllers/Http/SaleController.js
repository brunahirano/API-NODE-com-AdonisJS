'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const Sale = use("App/Models/Sale")


/**
 * Resourceful controller for interacting with sales
 */
class SaleController {
  /**
   * Show a list of all sales.
   * GET sales with produtcs and clients
   * Order by creation date, newest first
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const sales = await Sale.query().with('clients').with('products').orderBy('created_at', 'desc').fetch();

    return sales;
  }

  /**
   * Create/save a new sale.
   * POST sales
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {

    try {
      const data = request.only(['amount', 'unit_price', 'total_price', 'product_id', 'client_id']);
      const sale = await Sale.create(data)

      return {
        Data: response.status(200).send({ Message: "Sale registered successfully!", sale: sale })
      }
    } catch (Message) {
      return response.status(500).send({ Message: "Error when registering the sale!" })
    }
  }

  /**
   * Display a single address.
   * GET sales/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async show ( {params, request, response} ) {

    const sale = await Sale.find(params.id)

    if(!sale) {
      response.status(404).send({ Message:'Sale not found'})
    }

    return sale;
  }


  /**
   * Delete a sale with id.
   * DELETE sales/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const sale = await Sale.find(params.id);

    if (!sale) {
      return response.status(404).send({ Message: 'Sale not found' });

    }

    await sale.delete();

    return response.status(200).send({ Message: 'Sale has been deleted' });
  }
}

module.exports = SaleController

