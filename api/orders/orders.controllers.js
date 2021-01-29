const Order = require('@orders/orders.model.js');
const OrderItem = require('@orders/order_items.model.js');

const Item = require('@items/items.model.js');

async function createOrder(req, res) {
  if (!req.body.items) {
    return res.status(417).json({ success: false, msg: 'Items field is missing.' });
  }
  const items = JSON.parse(req.body.items);
  if (!Array.isArray(items)) {
    return res.status(417).json({ success: false, msg: 'Items field must be an array of integer' });
  }
  if (items.length === 0) {
    return res.status(417).json({ success: false, msg: `Items field can't be an empty array.` });
  }

  try {
    const menuItems = await Item.query().whereIn('id', items);

    const totalCost = menuItems.reduce((acc, curVal) => acc + curVal.price_cents, 0);

    const itemNames = menuItems.map((e) => ({
      item_name: e.item_name,
      price: e.price_cents / 100
    }));
    res.status(201).json({ items_ordered: itemNames, total_cost: totalCost / 100 });

    await Order.transaction(async (trx) => {
      const newOrder = await Order.query(trx).insertAndFetch({ user_id: req.user.id });
      const queries = await menuItems.map((item) => OrderItem.query(trx).insert({
        order_id: newOrder.id,
        item_id: item.id
      }));
      return Promise.all(queries)
        .then(trx.commit)
        .catch(trx.rollback);
    });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.toString() });
  }
}

module.exports = {
  createOrder
};
