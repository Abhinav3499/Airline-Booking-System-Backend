// const { Airport } = require('../models/index')
// const { Op } = require('sequelize')

// class AirportRepository {
//     async createAirport(name, address, cityId) {
//         try {
//             const airport = await Airport.create({
//                 name: name,
//                 address: address,
//                 cityId: cityId
//             });
//             return airport;
//         } catch (error) {
//             console.log('error with repo layer');
//             console.log(error);
//             throw(error);
//         }
//     }
//     async updateAirport(id, name, address, cityId) {
//         try {
//             const airport = await Airport.update( {name: name, address: address, cityId: cityId}, {
//                 where: {
//                     id: id
//                 }
//             });
//             return airport;
//         } catch (error) {
//             throw(error);
//         }
//     }
//     async getAirport(id) {
//         try {
//             const airport = await Airport.findByPk(id);
//             return airport;
//         } catch (error) {
//             throw(error);
//         }
//     }
//     async deleteAirport(id) {
//         try {
//             await Airport.destroy({
//                 where: {
//                     id: id
//                 }
//             });
//             return true;
//         } catch (error) {
//             throw(error);
//         }
//     }
// }

// module.exports = AirportRepository;

const CrudRespository = require("./crud-repository");
const { Airport } = require("../models/index");
class AirportRespository extends CrudRespository {
  constructor() {
    super(Airport);
  }
}

module.exports = AirportRespository;