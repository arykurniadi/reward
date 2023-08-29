/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
module.exports = {
  async up(db, client) {
    db.collection('users').insertMany([
      {
        name: 'Doni',
        email: 'doni@gmail.com',
        gender: 'male',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Tina',
        email: 'tina@gmail.com',
        gender: 'female',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Tini',
        email: 'tini@gmail.com',
        gender: 'female',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
