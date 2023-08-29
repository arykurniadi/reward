/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
module.exports = {
  async up(db, client) {
    db.createCollection('users', {
      capped: false,
      collation: {
        locale: 'id',
        strength: 1,
        numericOrdering: false,
      },
    });
  },

  async down(db, client) {
    db.collation('users').drop();
  },
};
