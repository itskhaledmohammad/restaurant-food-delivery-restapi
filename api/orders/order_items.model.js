const { Model } = require('objection');

class OrderItems extends Model {
  static get tableName() {
    return 'order_items';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['order_id', 'item_id'],
      properties: {
        user_id: { type: 'integer' },
        item_id: { type: 'integer' },
      },
    };
  }
}

module.exports = OrderItems;
