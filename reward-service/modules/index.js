const GeneralController = require('./controller/general');
const InternalController = require('./controller/internal');
const MobileController = require('./controller/mobile');

const RewardRepository = require('./reward/repository');
const RewardService = require('./reward/service');
const UserRepository = require('./user/repository');
const UserService = require('./user/service');

function createGeneralController(userService) {
  return new GeneralController(userService);
}

function createInternalController(userService) {
  return new InternalController(userService);
}

function createMobileController(rewardService) {
  return new MobileController(rewardService);
}

function createRewardRepository(db) {
  return new RewardRepository(db);
}

function createRewardService(repo) {
  return new RewardService(repo);
}

function createUserRepository(db) {
  return new UserRepository(db);
}

function createUserService(repo) {
  return new UserService(repo);
}

module.exports = {
  createGeneralController,
  createInternalController,
  createMobileController,
  createRewardRepository,
  createRewardService,
  createUserRepository,
  createUserService,
};
