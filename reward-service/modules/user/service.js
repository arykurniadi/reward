class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async get(params) {
    return this.userRepository.get(params);
  }
}

module.exports = UserService;
