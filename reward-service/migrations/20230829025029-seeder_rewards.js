/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
module.exports = {
  async up(db, client) {
    db.collection('rewards').insertMany([
      {
        title: 'Gift Card IDR 200000',
        description: 'Description Gift Card IDR 200000',
        type: 'vouchers',
        point: 150000,
        img: 'wade2.jpeg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Gift Card IDR 250000',
        description: 'Description Gift Card IDR 250000',
        type: 'vouchers',
        point: 170000,
        img: 'wade3.jpeg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Gift Card IDR 300000',
        description: 'Description Gift Card IDR 300000',
        type: 'vouchers',
        point: 200000,
        img: 'wade4.jpeg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Gift Card IDR 200000',
        description: 'Description Gift Card IDR 200000',
        type: 'products',
        point: 150000,
        img: 'wade2.jpeg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Gift Card IDR 250000',
        description: 'Description Gift Card IDR 250000',
        type: 'products',
        point: 170000,
        img: 'wade3.jpeg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Gift Card IDR 300000',
        description: 'Description Gift Card IDR 300000',
        type: 'products',
        point: 200000,
        img: 'wade4.jpeg',
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        title: 'Gift Card IDR 200000',
        description: 'Description Gift Card IDR 200000',
        type: 'others',
        point: 150000,
        img: 'wade2.jpeg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Gift Card IDR 250000',
        description: 'Description Gift Card IDR 250000',
        type: 'others',
        point: 170000,
        img: 'wade3.jpeg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Gift Card IDR 300000',
        description: 'Description Gift Card IDR 300000',
        type: 'others',
        point: 200000,
        img: 'wade4.jpeg',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(db, client) {
    db.collection('rewards').deleteMany({});
  },
};
