'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cities', [
      {
        id: 1,
        name: 'Delhi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Mumbai',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Bengaluru',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Kolkata',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'Hyderabad',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {
      ignoreDuplicates: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cities', {
      name: {
        [Sequelize.Op.in]: ['Delhi', 'Mumbai', 'Bengaluru', 'Kolkata', 'Hyderabad']
      }
    }, {});
  }
};
