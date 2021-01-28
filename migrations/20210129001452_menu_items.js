exports.up = function (knex) {
  return knex.schema.createTable('menu_items', (table) => {
    table.increments('id').primary();
    table.string('item_name').notNullable();
    table.integer('price_cents');
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('menu_items');
};
