exports.up = function (knex) {
  return knex.schema.createTable('order_items', (table) => {
    table.increments('id').primary();
    table.integer('order_id');
    table.integer('item_id');
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());

    table.foreign('order_id')
      .references('id')
      .inTable('orders')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.foreign('item_id')
      .references('id')
      .inTable('menu_items')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('order_items');
};
