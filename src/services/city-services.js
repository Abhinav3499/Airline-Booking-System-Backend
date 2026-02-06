const { CityRepository } = require('../repository/index');

class CityService {
    constructor() {
        this.cityRepository = new CityRepository();
    }

    async createCity(name) {
        try {
            const city = await this.cityRepository.createCity(name);
            return city; 
        } catch(error) {
            console.log('Error at service layer');
            throw(error);
        }
    }
    async updateCity(cityId, cityName) {
        try {
            const city = await this.cityRepository.updateCity(cityId, cityName);
            return city; 
        } catch(error) {
            console.log('Error at service layer');
            throw(error);
        }
    }
    async deleteCity(cityId) {
        try {
            const city = await this.cityRepository.deleteCity(cityId);
            return city; 
        } catch(error) {
            console.log('Error at service layer');
            throw(error);
        }
    }
    async getCity(cityId) {
        try {
            const city = await this.cityRepository.getCity(cityId);
            return city; 
        } catch(error) {
            console.log('Error at service layer');
            throw(error);
        }
    }
    async getAllCities(filter) {
        try {
            console.log(filter);
            const cities = await this.cityRepository.getAllCities({name : filter.name}); 
            return cities; 
        } catch(error) {
            console.log('Error at the service layer'); 
            throw(error); 
        }
    }
    async getAirports(cityId) {
        try {
            const airports = await this.cityRepository.getAirports(cityId);
            return airports; 
        } catch (error) {
            throw(error);
        }
    }
}

module.exports = CityService;