const createError = require('http-errors');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const config = require('../config');

function authenticated(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error('Invalid header.');
    }

    const token = authHeader.split(' ')[1];

    const user = jwt.verify(token, config.auth.jwtSecret);

    if (!user.userId) {
      throw new Error('Invalid user.');
    }

    req.user = {
      id: user.userId,
      email: user.email,
    };

    return next();
  } catch (e) {
    throw createError(StatusCodes.UNAUTHORIZED, e.message);
  }
}

module.exports = {
  authenticated,
};
