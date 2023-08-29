const express = require('express');

const router = express.Router();

const { validate } = require('../middlewares/validate');
const { loginRules } = require('../modules/controller/general_request');

module.exports = (generalController) => {
  router.post('/v1/login', loginRules(), validate, (req, res, next) => generalController.login(req, res, next));

  return router;
};
