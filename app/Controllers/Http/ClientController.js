'use strict'


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const Client = use("App/Models/Client")
const Database = use('Database')

/**
 * Resourceful controller for interacting with clients
 */
class ClientController {
  /**
   * Show a list of all clients.
   * GET clients
   * Filter only main data
   * ID order
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const clients = Database.select('id', 'name', 'cpf', 'email').from('clients').orderBy('id', 'asc')

    return clients;

  }


  /**
   * Create/save a new client.
   * POST clients
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const data = request.only(["name", "cpf", "email"]);
      const client = await Client.create(data)

      return {
        Data: response.status(200).send({ Message: "Client registered successfully!", client: client })
      }
    } catch (Message) {
      return response.status(500).send({ Message: "Error to register the client!" })
    }
  }

  /**
   * Display a single client.
   * GET clients/:id
   * With sales for clint
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response }) {
    const client = await Client.find(params.id)
    await client.load('sales')

    return client
  }

  /**
   * Update client details.
   * PUT or PATCH clients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const { name, cpf, email } = request.all();

      const client = await Client.find(params.id);

      client.name = name;
      client.cpf = cpf;
      client.email = email;

      await client.save();

      return {
        Message: response.status(200).send({ Message: "Client successfully updated", Client: client })
      }
    } catch (Message) {
      return response.status(404).send({ Message: "Client not found" })
    }
  }

  /**
   * Delete a client with id.
   * DELETE clients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    const client = await Client.find(params.id);

    if (!client) {
      return response.status(404).send({ Message: 'Client not found' });
    }

    await client.delete();

    return response.status(200).send({ Message: 'This client has been deleted' });

  }
}

module.exports = ClientController
