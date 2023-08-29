/* eslint-disable no-unused-vars */
require('dotenv').config();

const compression = require('compression');
const cors = require('cors');
const express = require('express');
const httpContext = require('express-http-context');
const helmet = require('helmet');
const createError = require('http-errors');
const { DateTime } = require('luxon');
const morgan = require('morgan');
const path = require('path');

const config = require('./config');
const { REQUEST_PAYLOAD_LIMIT } = require('./config/constant');
const { createDatabase } = require('./db');
const { DatabaseUniqueViolationError, RecordNotFoundError } = require('./error');
const logger = require('./util/logger');
const successHandler = require('./middlewares/success_handler');

const {
  createGeneralController,
  createInternalController,
  createMobileController,
  createRewardRepository,
  createRewardService,
  createUserRepository,
  createUserService,
} = require('./modules');

const generalRouter = require('./routes/general');
const internalRouter = require('./routes/internal');
const mobileRouter = require('./routes/mobile');

express.response.success = successHandler;

// init express
logger.info('Initializing express');
const app = express();

// mongo db client
let dbClient;

async function main() {
  app.use(express.json({ limit: REQUEST_PAYLOAD_LIMIT }));
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(cors());
  app.use(compression());

  if (app.get('env') !== 'test') {
    app.use(morgan((tokens, req, res) => {
      logger.info(`morgan ${tokens.method(req, res)} ${tokens.url(req, res)} ${tokens.status(req, res)}`);
    }));
  }

  // generate request ID for each request
  logger.info('Generating request ID');
  const generateRandomString = (length = 10) => Math.random().toString(20).substr(2, length);

  app.use(httpContext.middleware);
  app.use((req, res, next) => {
    const requestId = req.headers['request-id'];
    if (requestId) {
      req.requestId = requestId;
      httpContext.set('requestId', requestId);
    } else {
      req.requestId = generateRandomString();
      httpContext.set('requestId', req.requestId);
    }
    next();
  });

  // init database
  logger.info('Initializing database');
  try {
    dbClient = await createDatabase(config.mongodb.url);
  } catch (e) {
    logger.error('Connection to MongoDB failed', e);
    process.exit();
  }
  const db = dbClient.db(config.mongodb.database);

  // init dependencies
  logger.info('Initializing dependencies');
  const rewardRepository = createRewardRepository(db);
  const userRepository = createUserRepository(db);

  const rewardService = createRewardService(rewardRepository);
  const userService = createUserService(userRepository);

  const mobileController = createMobileController(rewardService);
  const generalController = createGeneralController(userService);
  const internalController = createInternalController(userService);

  // init observers
  require('./modules/controller/mobile_observer')(mobileController);

  // init routes
  logger.info('Initializing routes');
  app.use('/mobile', mobileRouter(mobileController));
  app.use('/internal', internalRouter(internalController));
  app.use('/', generalRouter(generalController));

  app.get('/', (req, res) => {
    res.send(`${config.app.name} ${config.app.env} v${config.app.version}.`);
  });

  // handle 404
  app.use((req, res, next) => {
    next(createError(404));
  });

  // throw 404 for RecordNotFoundError
  app.use((err, req, res, next) => {
    if (err instanceof RecordNotFoundError) {
      return res.status(404).json({
        message: err.message,
        success: false,
        data: null,
        responseTime: err.responseTime,
        __error__: (process.env.NODE_ENV === 'development') ? err.stack : undefined,
      });
    }

    return next(err);
  });

  // throw 409 for DatabaseUniqueViolationError
  app.use((err, req, res, next) => {
    if (err instanceof DatabaseUniqueViolationError) {
      return res.status(409).json({
        message: err.message,
        success: false,
        data: null,
        responseTime: err.responseTime,
        __error__: (process.env.NODE_ENV === 'development') ? err.stack : undefined,
      });
    }

    return next(err);
  });

  app.use((err, req, res, next) => {
    if (app.get('env') !== 'test') {
      logger.error('err', err.message);
    }

    res.status(err.status || 500);
    res.json({
      message: err.message,
      success: false,
      data: null,
      responseTime: err.responseTime,
      __error__: (process.env.NODE_ENV === 'development') ? err.stack : undefined,
    });
  });
}

main();

module.exports = app;
