'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Phone = use("App/Models/Phone")

/**
 * Resourceful controller for interacting with phones
 */
class PhoneController {
  /**
   * Show a list of all phones with your client
   * GET phones
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const phones = await Phone.query().with('client').fetch();

    return phones;
  }

  /**
   * Create/save a new phone.
   * POST phones
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(['number', 'client_id']);

    const phone = await Phone.create(data)

    return phone;
  }

  /**
   * Display a single phone.
   * GET phones/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response }) {

    const phone = await Phone.findOrFail(params.id)

    if (!phone) {
      response.status(404).send({ Message: 'The phone is not found' })
    }

    return phone;
  }


  /**
   * Update phone details.
   * PUT or PATCH phones/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const { number } = request.all();

      const phone = await Phone.find(params.id);

      phone.number = number;

      await phone.save();

      return {
        Data: response.status(200).send({ Message: "Phone successfully updated", Address: address })
      }
    } catch (Message) {
      return response.status(404).send({ Message: "Phone not found" })
    }
  }

  /**
   * Delete a phone with id.
   * DELETE phones/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    const phone = await Phone.findOrFail(params.id);

    if (!phone) {
      return response.status(404).send({ message: 'Phone not found' });
    }

    await phone.delete();

    return response.status(200).send({ message: 'This phone has been deleted' });

  }
}

module.exports = PhoneController
