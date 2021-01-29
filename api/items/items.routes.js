const express = require('express');
const { getItems } = require('@items/items.controllers.js');

const router = express.Router();

router.get('/', getItems);

module.exports = router;
