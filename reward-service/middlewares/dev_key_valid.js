const createError = require('http-errors');
const { StatusCodes } = require('http-status-codes');

function devKeyValid(req, res, next) {
  try {
    const authHeader = req.headers;

    if (!authHeader) {
      throw createError(StatusCodes.UNAUTHORIZED, 'Invalid Dev Key.');
    }

    if (!authHeader.devkey) {
      throw createError(StatusCodes.UNAUTHORIZED, 'Invalid Dev Key.');
    }

    if (authHeader.devkey !== process.env.APP_DEV_KEY) {
      throw createError(StatusCodes.UNAUTHORIZED, 'Invalid Dev Key.');
    }

    return next();
  } catch (e) {
    throw createError(StatusCodes.UNAUTHORIZED, 'Invalid Dev Key.');
  }
}

module.exports = {
  devKeyValid,
};
