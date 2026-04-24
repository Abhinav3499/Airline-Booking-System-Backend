'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Airports', [
    {
      id: 1,
      name: 'Indira Gandhi International Airport',
      address: 'New Delhi',
      cityId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      name: 'Chhatrapati Shivaji Maharaj International Airport',
      address: 'Mumbai',
      cityId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      name: 'Kempegowda International Airport',
      address: 'Bengaluru',
      cityId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 4,
      name: 'Netaji Subhas Chandra Bose International Airport',
      address: 'Kolkata',
      cityId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 5,
      name: 'Rajiv Gandhi International Airport',
      address: 'Hyderabad',
      cityId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ], {
    ignoreDuplicates : true
   }) // in the end pass empty object also, this is the syntax. 
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Airports', {
      name: {
        [Sequelize.Op.in]: [
          'Indira Gandhi International Airport',
          'Chhatrapati Shivaji Maharaj International Airport',
          'Kempegowda International Airport',
          'Netaji Subhas Chandra Bose International Airport',
          'Rajiv Gandhi International Airport'
        ]
      }
    }, {});
  }
};
