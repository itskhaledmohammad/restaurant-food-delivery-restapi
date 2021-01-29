const Items = require('@items/items.model.js');

async function getItems(req, res) {
  const items = await Items.query();
  res.json(items);
}

module.exports = {
  getItems
};
