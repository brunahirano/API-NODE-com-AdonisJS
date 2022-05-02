'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User')

class AuthController {
  /** Rota post para Cadastro do usuário com username, email e password*/
  async register({ request, response }) {
    try {
      const data = request.only(['username', 'email', 'password'])

      const user = await User.create(data)

      return {
        Message: response.status(200).send({ Message: "User registered successfully!", user: user })
      }
    } catch (Message) {
      return response.status(500).send({ Message: "Error registering user!" })
    }
  }

  /**Rota post para autenticação do login, retornando o token de acesso caso não haja erro*/
  async authenticate({ request, auth, response }) {
    try {
      const { email, password } = request.all();

      const token = await auth.attempt(email, password);

      return {
        Message: response.status(200).send({ Message: "User authenticated successfully", token: token })
      }

    } catch (Message) {
      return response.status(500).send({ Message: "Login error: invalid email and/or password" })
    }
  }

   /**
   * Show a list of all users
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
    async index () {
      const users = await User.all();

      return users;
    }

}

module.exports = AuthController
