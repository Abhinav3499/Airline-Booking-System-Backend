const { City } = require('../models/index');

class CityRepository {
    async createCity(name) {
        try {
            const city = await City.create(name);
            return city; 
        } catch (error) {
            console.log(`Error with creating the city ${name}`);
            throw {error};
        }
    }
    async deleteCity(cityId) {
        try {
            await City.destroy({
                where: {
                    id: cityId
                }
            });
            return true; 
        } catch (error) {
            console.log(`Error with deleting the city with cityId : ${cityId}`);
            throw {error};
        }
    }
    async getCity(cityId) {
        try {
            const city = await City.findByPk(cityId);
            return city; 
        } catch (error) {
            console.log(`Error with getting the city details with cityId : ${cityId}`);
            throw {error};
        }
    }
    async updateCity(cityId, cityName) {
        try {
            const city = await City.update(cityName, {
                where : {
                    id : cityId
                }
            });
            return city; 
        } catch(error) {
            console.log(`Error with updating the city details with cityId : ${cityId}`);
            throw {error};
        }
    }
}

module.exports = CityRepository;