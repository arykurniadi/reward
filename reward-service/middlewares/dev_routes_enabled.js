const createError = require('http-errors');
const { StatusCodes } = require('http-status-codes');

function devRoutesEnabled(req, res, next) {
  if (process.env.DEV_ROUTES_ENABLED !== '1') {
    throw createError(StatusCodes.NOT_FOUND, '/dev routes disabled.');
  }
  return next();
}

module.exports = {
  devRoutesEnabled,
};
