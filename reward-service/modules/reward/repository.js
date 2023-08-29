const { ObjectId } = require('mongodb');
const { RecordNotFoundError } = require('../../error');
const { parseSort } = require('../../util/mongodb');

class RewardRepository {
  collectionName = 'rewards';

  constructor(db) {
    this.collection = db.collection(this.collectionName);
  }

  async listCount(paging) {
    const mongoQuery = {};
    if (paging.filterTypes) {
      mongoQuery.type = { $in: paging.filterTypes };
    }

    if (paging.filterPriceRange) {
      const priceFrom = paging.filterPriceRange[0] ?? 0;
      const priceTo = paging.filterPriceRange[1] ?? 1000000;
      mongoQuery.point = { $gte: Number(priceFrom), $lte: Number(priceTo) };
    }

    const mongoSort = parseSort(paging.sort);

    const res = await this.collection
      .find(mongoQuery)
      .skip(paging.offset)
      .limit(paging.limit)
      .sort(mongoSort)
      .toArray();

    const count = await this.collection.find(mongoQuery).count();

    return {
      rows: res.map((r) => toDto(r)),
      count,
    };
  }

  async get(id) {
    const res = await this.collection.findOne(ObjectId(id));

    if (res) {
      return toDto(res);
    }

    throw new RecordNotFoundError();
  }
}

function toDto(data) {
  const o = {
    id: data._id,
    title: data.title,
    description: data.description,
    type: data.type,
    point: Number(data.point),
    img: data.img,
  };

  return o;
}

module.exports = RewardRepository;
