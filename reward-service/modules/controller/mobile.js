const { EventEmitter } = require('events');
const { getRewardSearchables } = require('../reward/searchable');
const { paginate } = require('../../util/paginate');
const { getPaging } = require('../../util/paging');
const { statObjectAsync, endpointURL } = require('../../util/minio');

class MobileController extends EventEmitter {
  constructor(rewardService) {
    super();
    this.rewardService = rewardService;
  }

  async index(req, res, next) {
    try {
      const { query } = req;
      const options = {};

      const paging = getPaging(query, getRewardSearchables());
      if (query.type) {
        options.filterTypes = query.type.split(',');
      }

      if (query.priceRange) {
        options.filterPriceRange = query.priceRange.split(',');
      }

      // get rewards
      const rewards = await this.rewardService.listCount({
        ...paging,
        ...options,
      });

      const data = await Promise.all(rewards.rows.map(async (item) => {
        const newItem = { ...item };

        if (item.img) {
          await statObjectAsync(item.img)
          .then((stat) => {
            newItem.img = '';
            if (stat) newItem.img = `${endpointURL()}/${item.img}`;
          })
          .catch(() => {
            newItem.img = '';
          });
        }

        return toRewardResponse(newItem);
      }));

      res.success(paginate(data, rewards.count, paging));
    } catch (e) {
      next(e);
    }
  }

  async get(req, res, next) {
    try {
      const { id } = req.params;

      const reward = await this.rewardService.get(id);

      res.success(toRewardResponse(reward));
    } catch (e) {
      next(e);
    }
  }
}

function toRewardResponse(data) {
  const o = {
    id: data.id,
    title: data.title,
    description: data.description,
    type: data.type,
    point: Number(data.point),
    img: data.img,
  };

  return o;
}

module.exports = MobileController;
