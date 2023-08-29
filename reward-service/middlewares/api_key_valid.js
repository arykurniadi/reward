const createError = require('http-errors');
const { StatusCodes } = require('http-status-codes');

const config = require('../config');

function apiKeyValid(req, res, next) {
  try {
    const authHeader = req.headers;

    if (!authHeader) {
      throw createError(StatusCodes.UNAUTHORIZED, 'Invalid API Key.');
    }

    if (!authHeader.apikey) {
      throw createError(StatusCodes.UNAUTHORIZED, 'Invalid API Key.');
    }

    if (authHeader.apikey !== config.app.apiKey) {
      throw createError(StatusCodes.UNAUTHORIZED, 'Invalid API Key.');
    }

    return next();
  } catch (e) {
    throw createError(StatusCodes.UNAUTHORIZED, 'Invalid API Key.');
  }
}

module.exports = {
  apiKeyValid,
};
