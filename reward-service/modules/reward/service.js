class RewardService {
  constructor(rewardRepository) {
    this.rewardRepository = rewardRepository;
  }

  async listCount(paging) {
    return this.rewardRepository.listCount(paging);
  }

  async get(id) {
    return this.rewardRepository.get(id);
  }
}

module.exports = RewardService;
