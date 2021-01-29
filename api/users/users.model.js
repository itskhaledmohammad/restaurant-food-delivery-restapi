const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',

      required: ['email', 'name', 'password', 'salt', 'delivery_address'],

      properties: {
        name: { type: 'varchar' },
        email: { type: 'varchar' },
        password: { type: 'varchar' },
        salt: { type: 'varchar' },
        delivery_address: { type: 'varchar' },
      },
    };
  }
}

module.exports = User;
