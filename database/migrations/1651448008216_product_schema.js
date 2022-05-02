'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

const Product = use("App/Models/Product")

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.string('title', 80).notNullable()
      table.string('author', 80).notNullable()
      table.string('genre', 80).notNullable()
      table.integer('year').notNullable()
      table.double('price').notNullable()
      table.boolean('is_deleted').defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema



