const express = require('express');
const passport = require('passport');
const {
  createUserValidation,
  updateUserValidation
} = require('@users/users.validators.js');
const finalValidation = require('@utils/Validator.js');

const { isOwner } = require('@users/users.middlewares.js');
const {
  getUser, createUser, updateUser, deleteUser
} = require('@users/users.controllers.js');

const router = express.Router();

router.get('/:id', passport.authenticate('jwt', { session: false }), isOwner, getUser);
router.put('/:id', passport.authenticate('jwt', { session: false }), updateUserValidation(), finalValidation, isOwner, updateUser);
router.delete('/:id', passport.authenticate('jwt', { session: false }), isOwner, deleteUser);
router.post('/', createUserValidation(), finalValidation, createUser);

module.exports = router;
