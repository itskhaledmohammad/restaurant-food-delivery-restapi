const { Model } = require('objection');

class Items extends Model {
  static get tableName() {
    return 'menu_items';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['item_name', 'price_cents'],
      properties: {
        item_name: { type: 'varchar' },
        price_cents: { type: 'integer' },
      },
    };
  }
}

module.exports = Items;
