const { Model } = require('objection');

class Order extends Model {
  static get tableName() {
    return 'orders';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id'],
      properties: {
        user_id: { type: 'integer' },
      },
    };
  }
}

module.exports = Order;
