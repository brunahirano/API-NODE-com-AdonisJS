'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PhoneSchema extends Schema {
  up () {
    this.create('phones', (table) => {
      table.increments()
      table.string('number', 30).notNullable()
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
    this.drop('phones')
  }
}

module.exports = PhoneSchema
