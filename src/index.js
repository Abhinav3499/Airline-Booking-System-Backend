const express = require("express");
const bodyParser = require("body-parser");
// const { sequelize, Sequelize } = require("./models");

const { PORT } = require("./config/serverConfig");
// const CityRepo = require('./repository/city-repository')
const APIRoutes = require("./routes/index");

const db = require('./models/index')

const { Airport, City } = require("./models/index");

const setupAndStartServer = async () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", APIRoutes);

  app.listen(PORT, async () => {
    console.log(`server started on port ${PORT}`);
    // const repo = new CityRepo();
    // repo.createCity({name : 'Bhagalpur'});

    // const airports = await Airport.findAll({
    //     include: City
    // });
    // console.log(airports);

    // Raw SQL query

    // const airports = await sequelize.query( // if we directly do select *, it get airport.name and city.name and since name is common to both it only shows one name in the json output
    //   `
    //     SELECT
    //     Airports.id AS airportId,
    //     Airports.name AS airportName,
    //     Airports.address,
    //     Airports.cityId,
    //     Cities.id AS cityId,
    //     Cities.name AS cityName
    //     FROM Airports
    //     JOIN Cities ON Airports.cityId = Cities.id
    //     WHERE Airports.cityId = :cityId;
    //     `,
    //   {
    //     replacements: { cityId: 2 },
    //     type: Sequelize.QueryTypes.SELECT,
    //   },
    // );
    // console.log(airports);


    // db.sequelize.sync({alter: true}); // heavy op so comment out 
    const city = await City.findOne({
        where: {
            id: 2
        }
    })
    // const airports = await city.getAirports();
    // // console.log(city);
    // await city.addAirport({
    //     name: 'Bhagalpur 2 Airport', 
    //     // cityId: 1, 
    //     createdAt: new Date(), 
    //     updatedAt: new Date()
    // })
    // console.log(airports);

    const airport = await city.getAirports();
    // const newAirport = await Airport.create({ // this will create a new airport with dummy cityid 4 for now, we would later accociate it with the city object which we have queried in line 55.
    //     name: 'Una Airport 3',
    //     cityId: 4
    // });
    const newAirport = await Airport.findOne({
        where : {
            id : 4, 
        }
    });
    await city.addAirport(newAirport);
    // await city.addAirport({ // directly adding a new airport will throw error, since internally sequelize first create a new Airport with null cityid and then accociated the cityId of this newly created airport to the city object we are currently working with. 
    // // but since we have strict not null constraints on city id of airport, this cannot happen.
    //     name: 'Una Airport 3'
    // });

  });
};

setupAndStartServer();
