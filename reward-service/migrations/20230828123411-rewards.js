/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
module.exports = {
  async up(db, client) {
    db.createCollection('rewards', {
      capped: false,
      collation: {
        locale: 'id',
        strength: 1,
        numericOrdering: false,
      },
    });
  },

  async down(db, client) {
    db.collation('rewards').drop();
  },
};
