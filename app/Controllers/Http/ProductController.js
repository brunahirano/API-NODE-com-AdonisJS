'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const Product = use("App/Models/Product")
const Database = use('Database')

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products where is_deleted attribute status to false = 0
   * Filter only main data
   * Alphabetical order - title
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const products = Database.select('id', 'title', 'author', 'price').from('products').where('is_deleted', 0).orderBy('title', 'asc')

    return products;
  }


  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const data = request.only(["title", "author", "genre", "year", "price"]);
      const product = await Product.create(data)

      return {
        Data: response.status(200).send({ Message: "Product registered successfully!", product: product })
      }
    } catch (Message) {
      return response.status(500).send({ Message: "Error when registering the product!" })
    }
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response }) {
    try {
      const product = await Product.findOrFail(params.id)

      return {
        Data: response.status(200).send({ Product: product })
      }
    } catch (Message) {
      return response.status(404).send({ Message: "Product not found!" })
    }
  }


  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {

    try {
      const { title, author, genre, year, price } = request.all();

      const product = await Product.find(params.id);

      product.title = title;
      product.author = author;
      product.genre = genre;
      product.year = year;
      product.price = price

      await product.save();

      return {
        Message: response.status(200).send({ Message: "Product successfully updated", Product: product })
      }
    } catch (Message) {
      return response.status(404).send({ Message: "The product is not found" })
    }

  }

  /**
   * Soft delete a product with id.
   * DELETE products/:id
   * Soft delete, changing is_deleted attribute status to true = 1
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {

    const product = await Product.find(params.id);

    if (!product) {
      return response.status(404).send({ Message: 'Product not found' });

    } else {
      product.is_deleted = 1;
      await product.save()
      return response.status(200).send({ Message: 'Soft deletion of the product was successfully' });
    }

  };

}

module.exports = ProductController
