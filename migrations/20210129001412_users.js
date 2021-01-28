exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email').notNullable();
    table.string('name').notNullable();
    table.string('password', 130).notNullable();
    table.string('salt', 64).notNullable();
    table.string('delivery_address').notNullable();
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.unique('email');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
