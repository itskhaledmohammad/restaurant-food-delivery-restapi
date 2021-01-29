const { body } = require('express-validator');

const createUserValidation = () => [
  body('email')
    .exists()
    .withMessage('The email must be present.')
    .isEmail()
    .withMessage('The Email is in wrong format.'),
  body('password')
    .exists()
    .withMessage('The password must be present.')
    .isLength({ min: 5, max: 120 })
    .withMessage('Password must be between the length of 5 and 120 characters.'),

  body('name')
    .exists()
    .withMessage('The name must be present.')
    .isLength({ min: 3 })
    .withMessage('The Name must be atleast 3 in length.'),

  body('delivery_address')
    .exists()
    .withMessage('The delivery_address must be present.')
    .isLength({ min: 5 })
    .withMessage('The delivery_address must be atleast 5 in length.'),

];

const updateUserValidation = () => [
  body('name')
    .optional()
    .isLength({ min: 3 })
    .withMessage('The Name must be atleast 3 in length.'),

  body('delivery_address')
    .optional()
    .isLength({ min: 5 })
    .withMessage('The delivery_address must be atleast 5 in length.'),

];

module.exports = { createUserValidation, updateUserValidation };
