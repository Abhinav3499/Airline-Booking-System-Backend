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
    await queryInterface.bulkInsert(
      "Airplanes",
      [
        {
          id: 1,
          modelNo: "Boeing 737",
          capacity: 180,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          modelNo: "Airbus A320",
          capacity: 186,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          modelNo: "Boeing 777",
          capacity: 396,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          modelNo: "Airbus A350",
          capacity: 325,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {
        ignoreDuplicates: true,
      },
    ); // in the end pass empty object also, this is the syntax.
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Airplanes', {
      modelNo: {
        [Sequelize.Op.in]: ['Boeing 737', 'Airbus A320', 'Boeing 777', 'Airbus A350']
      }
    }, {});
  }
};
