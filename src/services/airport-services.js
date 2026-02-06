const { AirportRepository } = require('../repository/index')

class AirportServices {
  constructor() {
    this.airportRespository = new AirportRepository();
  }

  async createAirport(airportName, address, cityId) {
    try {
      const airport = await this.airportRespository.createAirport(
        airportName,
        address,
        cityId,
      );
      return airport;
    } catch (error) {
      console.log("error with services layer");
      console.log(error);
      throw error;
    }
  }
  async updateAirport(id, airportName, address, cityId) {
    try {
      const airport = await this.airportRespository.updateAirport(
        id,
        airportName,
        address,
        cityId,
      );
      return airport;
    } catch (error) {
      throw error;
    }
  }
  async getAirport(id) {
    try {
      const airport = await this.airportRespository.getAirport(id);
      return airport;
    } catch (error) {
      throw error;
    }
  }
  async deleteAirport(id) {
    try {
      const airport = await this.airportRespository.deleteAirport(id);
      return airport;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AirportServices;