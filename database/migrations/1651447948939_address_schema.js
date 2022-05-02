'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddressSchema extends Schema {
  up () {
    this.create('addresses', (table) => {
      table.increments()
      table.string('street', 40).notNullable()
      table.string('city', 40).notNullable()
      table.string('number', 40).notNullable()
      table.string('country', 40).notNullable()
      table.string('postalCode', 40).notNullable()
      table.string('state', 40).notNullable()
      table.string('neighborhood', 40).notNullable()
      table.integer('client_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('clients')
      .onUpdate('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('addresses')
  }
}

module.exports = AddressSchema
