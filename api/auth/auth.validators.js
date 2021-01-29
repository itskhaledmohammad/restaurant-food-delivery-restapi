const { body } = require('express-validator');

const authValidation = () => [
  body('email')
    .isEmail()
    .withMessage('The Email is in wrong format.'),

  body('password')
    .isLength({ min: 5, max: 120 })
    .withMessage('Password must be between the length of 5 and 120 characters.'),
];

module.exports = { authValidation };
