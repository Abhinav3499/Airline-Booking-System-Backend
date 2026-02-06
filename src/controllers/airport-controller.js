const { AirportServices } = require('../services/index');

const airportServices = new AirportServices(); 

const create = async (req, res) => {
    try {
        const airport = await airportServices.createAirport(req.body.name, req.body.address, req.body.cityId);
        return res.status(201).json({
            data: airport, 
            success: true, 
            message: 'ok', 
            err: {}
        })

    } catch(error) {
        console.log('error with airport controller');
        console.log(error);
        return res.status(500).json({
            data: {}, 
            success: false, 
            message: 'error',
            err: error
        })
    }
}
const destroy = async (req, res) => {
    try {
        const airport = await airportServices.deleteAirport(req.params.id);
        return res.status(200).json({
            data: airport, 
            success: true, 
            message: 'ok', 
            err: {}
        })

    } catch(error) {
        return res.status(500).json({
            data: {}, 
            success: false, 
            message: 'error',
            err: error
        })
    }
}
const update = async (req, res) => {
    try {
        const airport = await airportServices.updateAirport(req.params.id, req.body.name, req.body.address, req.body.cityId);
        return res.status(200).json({
            data: airport, 
            success: true, 
            message: 'ok', 
            err: {}
        })

    } catch(error) {
        return res.status(500).json({
            data: {}, 
            success: false, 
            message: 'error',
            err: error
        })
    }
}
const get = async (req, res) => {
    try {
        const airport = await airportServices.getAirport(req.params.id);
        return res.status(201).json({
            data: airport, 
            success: true, 
            message: 'ok', 
            err: {}
        })

    } catch(error) {
        return res.status(500).json({
            data: {}, 
            success: false, 
            message: 'error',
            err: error
        })
    }
}

module.exports = {
    create, 
    destroy, 
    update, 
    get
}