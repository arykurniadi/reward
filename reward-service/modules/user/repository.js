const { ObjectId } = require('mongodb');
const { RecordNotFoundError } = require('../../error');

class UserRepository {
  collectionName = 'users';

  constructor(db) {
    this.collection = db.collection(this.collectionName);
  }

  async get(params) {
    const { id, email } = params;

    const mongoQuery = {};
    if (id) {
      mongoQuery._id = ObjectId(id);
    }

    if (email) {
      mongoQuery.email = email;
    }

    const res = await this.collection.findOne(mongoQuery);
    if (res) {
      return toDto(res);
    }

    throw new RecordNotFoundError();
  }
}

function toDto(data) {
  const o = {
    id: data._id.toString(),
    name: data.name,
    email: data.email,
    gender: data.gender,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };

  return o;
}

module.exports = UserRepository;
