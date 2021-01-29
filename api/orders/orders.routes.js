const express = require('express');
const { createOrder } = require('@orders/orders.controllers.js');

const router = express.Router();

router.post('/', createOrder);

module.exports = router;
