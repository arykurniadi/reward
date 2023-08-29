const { body } = require('express-validator');

const loginRules = () => [
  body('email').trim().notEmpty().withMessage('Email cannot be empty.'),
];

module.exports = {
  loginRules,
};
