'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const Address = use("App/Models/Address")

/**
 * Resourceful controller for interacting with addresses
 */
class AddressController {
  /**
   * Show a list of all addresses with your client
   * GET addresses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const addresses = await Address.query().with('client').fetch();

    return addresses;
  }

  /**
   * Create/save a new address.
   * POST addresses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(['street', 'city', 'number', 'country', 'postalCode', 'state', 'neighborhood', 'client_id']);

    const address = await Address.create(data)

    return address;
  }

  /**
   * Display a single address.
   * GET addresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response }) {

    const address = await Address.find(params.id)

    if (!address) {
      response.status(404).send({ Message: 'Address not found' })
    }

    return address;
  }


  /**
   * Update address details.
   * PUT or PATCH addresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const { street, city, number, country, cep } = request.all();

      const address = await Address.find(params.id);

      address.street = street;
      address.city = city;
      address.number = number;
      address.country = country;
      address.cep = cep;

      await address.save();

      return {
        Data: response.status(200).send({ Message: "Address successfully updated", Address: address })
      }
    } catch (Message) {
      return response.status(404).send({ Message: "Address not found" })
    }

  }

  /**
   * Delete a address with id.
   * DELETE addresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    const address = await Address.find(params.id);

    if (!address) {
      return response.status(404).send({ Message: 'Address not found' });
    }

    await address.delete();

    return response.status(200).send({ Message: 'This address has been deleted' });

  }

}

module.exports = AddressController
