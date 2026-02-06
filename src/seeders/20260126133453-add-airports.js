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
      name: 'Bhagalpur Airport',
      cityId: 1, 
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Una Airport',
      cityId: 2, 
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ], {}) // in the end pass empty object also, this is the syntax. 
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
