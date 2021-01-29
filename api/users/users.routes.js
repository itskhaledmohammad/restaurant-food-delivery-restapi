const express = require('express');
const passport = require('passport');

const { isOwner } = require('@users/users.middlewares.js');
const {
  getUser, createUser, updateUser, deleteUser
} = require('@users/users.controllers.js');

const router = express.Router();

router.get('/:id', passport.authenticate('jwt', { session: false }), isOwner, getUser);
router.put('/:id', passport.authenticate('jwt', { session: false }), isOwner, updateUser);
router.delete('/:id', passport.authenticate('jwt', { session: false }), isOwner, deleteUser);
router.post('/', createUser);

module.exports = router;
