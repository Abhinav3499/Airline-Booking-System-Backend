'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Flights', [
      {
        id: 1,
        flightNumber: 'AI-101',
        airplaneId: 1,
        departureAirportId: 1,
        arrivalAirportId: 2,
        departureTime: new Date('2026-05-01T04:30:00.000Z'),
        arrivalTime: new Date('2026-05-01T06:45:00.000Z'),
        price: 4500,
        boardingGate: 'A1',
        totalSeats: 180,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        flightNumber: 'UK-204',
        airplaneId: 2,
        departureAirportId: 2,
        arrivalAirportId: 3,
        departureTime: new Date('2026-05-02T03:00:00.000Z'),
        arrivalTime: new Date('2026-05-02T04:50:00.000Z'),
        price: 5200,
        boardingGate: 'B4',
        totalSeats: 186,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        flightNumber: '6E-303',
        airplaneId: 3,
        departureAirportId: 3,
        arrivalAirportId: 4,
        departureTime: new Date('2026-05-03T07:15:00.000Z'),
        arrivalTime: new Date('2026-05-03T09:45:00.000Z'),
        price: 6100,
        boardingGate: 'C2',
        totalSeats: 396,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        flightNumber: 'SG-450',
        airplaneId: 4,
        departureAirportId: 5,
        arrivalAirportId: 1,
        departureTime: new Date('2026-05-04T11:00:00.000Z'),
        arrivalTime: new Date('2026-05-04T13:10:00.000Z'),
        price: 3900,
        boardingGate: 'D6',
        totalSeats: 325,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {
      ignoreDuplicates: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Flights', {
      flightNumber: {
        [Sequelize.Op.in]: ['AI-101', 'UK-204', '6E-303', 'SG-450']
      }
    }, {});
  }
};
