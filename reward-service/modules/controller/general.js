const { EventEmitter } = require('events');
const createError = require('http-errors');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const { RecordNotFoundError } = require('../../error');

class GeneralController extends EventEmitter {
  constructor(userService) {
    super();
    this.userService = userService;
  }

  async login(req, res, next) {
    try {
      const { email } = req.body;

      const user = await this.userService.get({ email });

      user.token = jwt.sign({ userId: user.id, email: user.email }, config.auth.jwtSecret);

      res.success(toLoginResponse(user));
    } catch (e) {
      if (e instanceof RecordNotFoundError) {
        next(createError(StatusCodes.BAD_REQUEST, 'Email not found'));
      }
      next(e);
    }
  }
}

function toLoginResponse(data) {
  const o = {
    name: data.name,
    email: data.email,
    token: data.token,
  };

  return o;
}

module.exports = GeneralController;
