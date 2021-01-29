const express = require('express');
const passport = require('passport');
const users = require('@users/users.routes');
const auth = require('@auth/auth.routes');
const items = require('@items/items.routes');
const orders = require('@orders/orders.routes');

const router = express.Router();
router.use('/auth', auth);
router.use('/users', passport.authenticate('jwt', { session: false }), users);
router.use('/items', items);
router.use('/orders', passport.authenticate('jwt', { session: false }), orders);

module.exports = router;
