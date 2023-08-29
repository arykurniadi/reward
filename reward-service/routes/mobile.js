const express = require('express');

const router = express.Router();

const { authenticated } = require('../middlewares/authenticated');

// check JWT token for all routes
router.use(authenticated);

// const { apiKeyValid } = require('../middlewares/api_key_valid');
// router.use(apiKeyValid);

module.exports = (mobileController) => {
  router.get('/v1/reward', (req, res, next) => mobileController.index(req, res, next));
  router.get('/v1/reward/:id', (req, res, next) => mobileController.get(req, res, next));

  return router;
};
