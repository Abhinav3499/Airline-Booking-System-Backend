const express = require('express')
const bodyParser = require('body-parser')

const { PORT } = require('./config/serverConfig')
const CityRepo = require('./repository/city-repository')

const setupAndStartServer = async() => {
    const app = express(); 

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.listen(PORT, () => {
        console.log(`server started on port ${PORT}`);
        const repo = new CityRepo();
        repo.createCity({name : 'Bhagalpur'});
    })
}

setupAndStartServer();

