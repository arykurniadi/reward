const express = require('express');

const router = express.Router();

const { apiKeyValid } = require('../middlewares/api_key_valid');

router.use(apiKeyValid);

module.exports = (generalController) => {
  router.get('/v1/health', (req, res, next) => generalController.health(req, res, next));

  router.post('/v1/user', (req, res, next) => generalController.createUser(req, res, next));
  router.post('/v1/upload', (req, res, next) => generalController.uploadFile(req, res, next));
  return router;
};
