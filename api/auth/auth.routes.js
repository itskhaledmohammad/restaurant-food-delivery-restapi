const express = require('express');
const { login, logout } = require('@auth/auth.controllers.js');
const { authValidation } = require('@auth/auth.validators.js');
const finalValidation = require('@utils/Validator.js');
const passport = require('passport');

const router = express.Router();

router.post('/login', authValidation(), finalValidation, login);
router.get('/logout', passport.authenticate('jwt', { session: false }), logout);

module.exports = router;
