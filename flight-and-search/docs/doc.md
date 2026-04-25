# Flight and Search Microservice Notes

These notes explain how to build the `flight-and-search` microservice step by step. The goal of this service is to manage cities, airports, airplanes, and flights for an airline booking system.

The project uses:

- Node.js
- Express.js
- Sequelize ORM
- MySQL
- Sequelize CLI
- Repository, service, and controller layers

The idea is to keep the code clean. Controllers only handle request and response. Services contain business logic. Repositories talk to the database.

---

## 1. Project Setup

Start by creating the project folder.

```bash
mkdir flight-and-search
cd flight-and-search
npm init -y
```

Install the required dependencies.

```bash
npm install express body-parser dotenv sequelize mysql2 sequelize-cli nodemon
```

Add a start script in `package.json`.

```json
{
  "scripts": {
    "start": "npx nodemon src/index.js"
  }
}
```

Create the basic folder structure.

```bash
mkdir src
mkdir src/config src/controllers src/middlewares src/models src/migrations src/repository src/routes src/services src/seeders src/utils
```

In this project, the main server file is:

```text
src/index.js
```

The server uses Express and mounts all routes under:

```text
/api
```

Versioned routes are mounted under:

```text
/api/v1
```

So a city route becomes:

```text
/api/v1/city
```

---

## 2. Environment Setup

Create a `.env` file in the root directory.

```env
PORT=3000
```

The file `src/config/serverConfig.js` reads values from `.env`.

```js
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
};
```

This keeps configuration outside the code.

---

## 3. Sequelize Setup

Initialize Sequelize inside the project.

```bash
npx sequelize init
```

In this project, Sequelize folders are kept inside `src`, so the generated folders are placed like this:

```text
src/config
src/models
src/migrations
src/seeders
```

Create `src/config/config.json`.

```json
{
  "development": {
    "username": "YOUR_DB_USERNAME",
    "password": "YOUR_DB_PASSWORD",
    "database": "flightAndSearchDB",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

Create the database.

```bash
cd src
npx sequelize db:create
```

This creates the database in MySQL.

You can check it manually.

```bash
mysql -u root -p
show databases;
use flightAndSearchDB;
show tables;
```

At this point, tables will only appear after running migrations.

---

## 4. What Are Models and Migrations?

In Sequelize, a model represents a database table.

For example:

- `City` model represents the `Cities` table
- `Airport` model represents the `Airports` table
- `Airplane` model represents the `Airplanes` table
- `Flights` model represents the `Flights` table

A migration is the database-level instruction for creating or changing a table.

The model gives Sequelize a JavaScript-level understanding of the table. The migration actually creates the table in MySQL.

That is why both are important.

---

## 5. City Model Setup

Generate the City model.

```bash
npx sequelize model:generate --name City --attributes name:String
```

This creates:

```text
src/models/city.js
src/migrations/<timestamp>-create-city.js
```

Add model-level constraints in `src/models/city.js`.

```js
name: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true,
}
```

Add database-level constraints in the migration file.

```js
name: {
  allowNull: false,
  unique: true,
  type: Sequelize.STRING,
}
```

Run the migration.

```bash
npx sequelize db:migrate
```

Now the `Cities` table is created in the database.

---

## 6. City API Setup

The city routes are defined in:

```text
src/routes/v1/index.js
```

Main city APIs:

```js
router.post("/city", cityController.create);
router.delete("/city/:id", cityController.destroy);
router.get("/city/:id", cityController.get);
router.patch("/city/:id", cityController.update);
router.get("/city", cityController.getAll);
router.post("/cityMultiple", cityController.createMultiple);
```

The request flow is:

```text
Route -> Controller -> Service -> Repository -> Model -> Database
```

For example, creating a city goes like this:

```text
POST /api/v1/city
```

Request body:

```json
{
  "name": "Delhi"
}
```

The controller receives the request, the service handles the use case, and the repository creates the record using Sequelize.

The city API also supports filtering by name.

```text
GET /api/v1/city?name=Del
```

This uses Sequelize operators like `Op.startsWith`.

---

## 7. Airport Table Setup

An airport belongs to a city. So the `Airports` table needs a `cityId` column.

Generate the Airport model.

```bash
npx sequelize model:generate --name Airport --attributes name:String,address:String,cityId:integer
```

This creates:

```text
src/models/airport.js
src/migrations/<timestamp>-create-airport.js
```

The Airport table has:

- `id`
- `name`
- `address`
- `cityId`
- `createdAt`
- `updatedAt`

The `cityId` column is a foreign key that points to the `Cities` table.

Add database-level constraints in the Airport migration.

```js
cityId: {
  type: Sequelize.INTEGER,
  onDelete: "CASCADE",
  references: {
    model: "Cities",
    key: "id",
    as: "cityId",
  },
  allowNull: false,
}
```

Add model-level constraints in `src/models/airport.js`.

```js
name: {
  type: DataTypes.STRING,
  allowNull: false,
},
address: {
  type: DataTypes.STRING,
  allowNull: true,
},
cityId: {
  type: DataTypes.INTEGER,
  allowNull: false,
}
```

Run the migration.

```bash
npx sequelize db:migrate
```

Now check the database.

```bash
mysql -u root -p
show databases;
use flightAndSearchDB;
show tables;
```

After migration, the `Airports` table should be visible.

---

## 8. Sequelize Associations

Association means defining the relationship between models.

In this project:

```text
City has many Airports
Airport belongs to City
```

In `src/models/city.js`:

```js
static associate(models) {
  this.hasMany(models.Airport, {
    foreignKey: "cityId",
  });
}
```

In `src/models/airport.js`:

```js
static associate(models) {
  this.belongsTo(models.City, {
    foreignKey: "cityId",
    onDelete: "CASCADE",
  });
}
```

Because of this association, Sequelize understands the relation between cities and airports.

Sequelize also provides association helper functions like:

- `city.getAirports()`
- `city.addAirport(airport)`
- `city.createAirport(data)`
- `airport.getCity()`

These helpers are available when associations are loaded correctly through `src/models/index.js`.

---

## 9. API to Get Airports of a City

This project adds an API inside the city resource to fetch all airports of a city.

Route:

```js
router.get("/city/airport/:id", cityController.getAirport);
```

API:

```text
GET /api/v1/city/airport/:id
```

Example:

```text
GET /api/v1/city/airport/1
```

The flow is:

```text
city route -> city controller -> city service -> city repository -> Airport model
```

In the repository, airports are fetched using `cityId`.

```js
const airports = await Airport.findAll({
  where: {
    cityId: cityId,
  },
  attributes: ["name"],
});
```

The response returns airport names for that city.

This is useful when the client selects a city and wants to show all available airports in that city.

---

## 10. Airport API Setup

Airport routes:

```js
router.post("/airport", airportController.create);
router.delete("/airport/:id", airportController.destroy);
router.get("/airport/:id", airportController.get);
router.patch("/airport/:id", airportController.update);
```

Create airport API:

```text
POST /api/v1/airport
```

Request body:

```json
{
  "name": "Indira Gandhi International Airport",
  "address": "New Delhi",
  "cityId": 1
}
```

Because `cityId` is a foreign key, the city must already exist in the `Cities` table.

---

## 11. Seeding Setup

Seeders are used to insert default or sample data into the database.

Instead of manually calling APIs again and again, we can seed cities, airports, airplanes, and flights.

Generate a seeder.

```bash
npx sequelize seed:generate --name add-airports
```

This creates a file in:

```text
src/seeders
```

Use `bulkInsert` to insert multiple rows.

```js
await queryInterface.bulkInsert("Airports", [
  {
    name: "Indira Gandhi International Airport",
    address: "New Delhi",
    cityId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);
```

Run all seeders.

```bash
npx sequelize db:seed:all
```

Run one specific seeder file.

```bash
npx sequelize db:seed --seed 20260126133453-add-airports.js
```

Undo all seeders.

```bash
npx sequelize db:seed:undo:all
```

Important point: seeders should usually run after migrations because tables must exist before inserting data.

---

## 12. Airplane Table Setup

An airplane stores aircraft details like model number and capacity.

Generate the Airplane model.

```bash
npx sequelize model:generate --name Airplane --attributes modelNo:String,capacity:Integer
```

This creates:

```text
src/models/airplane.js
src/migrations/<timestamp>-create-airplane.js
```

Table columns:

- `id`
- `modelNo`
- `capacity`
- `createdAt`
- `updatedAt`

Add model-level constraints in `src/models/airplane.js`.

```js
modelNo: {
  type: DataTypes.STRING,
  allowNull: false,
},
capacity: {
  type: DataTypes.INTEGER,
  allowNull: false,
  defaultValue: 200,
}
```

Add database-level constraints in the migration.

```js
modelNo: {
  allowNull: false,
  type: Sequelize.STRING,
},
capacity: {
  allowNull: false,
  type: Sequelize.INTEGER,
  defaultValue: 200,
}
```

Run migration.

```bash
npx sequelize db:migrate
```

Generate seeder.

```bash
npx sequelize seed:generate --name add-airplane
```

Run one seeder file.

```bash
npx sequelize db:seed --seed 20260207081743-add-airplane.js
```

---

## 13. Flight Table Setup

The Flights table stores actual flight data.

Important fields:

- `flightNumber`
- `airplaneId`
- `departureAirportId`
- `arrivalAirportId`
- `arrivalTime`
- `departureTime`
- `price`
- `boardingGate`
- `totalSeats`

Generate the model.

```bash
npx sequelize model:generate --name Flights --attributes flightNumber:String,airplaneId:Integer,departureAirportId:Integer,arrivalAirportId:Integer,arrivalTime:Date,departureTime:Date,price:Integer,boardingGate:String,totalSeats:Integer
```

Add constraints:

- `flightNumber` should be unique
- `airplaneId` should not be null
- `departureAirportId` should not be null
- `arrivalAirportId` should not be null
- `arrivalTime` should not be null
- `departureTime` should not be null
- `price` should not be null
- `totalSeats` should not be null

Run migration.

```bash
npx sequelize db:migrate
```

Seed flights.

```bash
npx sequelize seed:generate --name add-flights
npx sequelize db:seed --seed 20260207083000-add-flights.js
```

---

## 14. Flight API Setup

Flight routes:

```js
router.post("/flights", FlightMiddlewares.validateCreateFlight, flightController.create);
router.get("/flights", flightController.getAll);
router.get("/flights/:id", flightController.get);
router.patch("/flights/:id", flightController.update);
```

Create flight API:

```text
POST /api/v1/flights
```

Request body:

```json
{
  "flightNumber": "UK-808",
  "airplaneId": 1,
  "departureAirportId": 1,
  "arrivalAirportId": 2,
  "arrivalTime": "2026-02-08T08:00:00.000Z",
  "departureTime": "2026-02-08T06:00:00.000Z",
  "price": 4500
}
```

The service layer calculates `totalSeats` from the airplane capacity.

```js
const airplane = await this.airplaneRepository.getAirplane(data.airplaneId);
const flight = await this.flightRepository.createFlight({
  ...data,
  totalSeats: airplane.capacity,
});
```

This is a good example of business logic. The controller does not calculate seats. The repository does not calculate seats. The service layer does it.

---

## 15. Flight Validations

The project uses middleware for request validation.

File:

```text
src/middlewares/flight-middlewares.js
```

Before creating a flight, the middleware checks required fields:

- `flightNumber`
- `airplaneId`
- `departureAirportId`
- `arrivalAirportId`
- `arrivalTime`
- `departureTime`
- `price`

If any field is missing, it returns:

```json
{
  "data": {},
  "success": false,
  "message": "Invalid request body for create flight",
  "err": "Missing mandatory properties to create a flight"
}
```

The project also checks that arrival time is not before departure time.

```js
if (!compareTime(data.arrivalTime, data.departureTime)) {
  throw { error: "Arrival time cannot be less than departure time" };
}
```

This check is kept in the service layer because it is business logic.

---

## 16. Flight Search API

The flight search API is:

```text
GET /api/v1/flights
```

It supports query filters.

Examples:

```text
GET /api/v1/flights?departureAirportId=1
GET /api/v1/flights?arrivalAirportId=2
GET /api/v1/flights?minPrice=3000&maxPrice=7000
GET /api/v1/flights?departureAirportId=1&arrivalAirportId=2&minPrice=3000&maxPrice=7000
```

The repository creates a Sequelize filter object.

```js
if (data.arrivalAirportId) {
  filter.arrivalAirportId = data.arrivalAirportId;
}

if (data.departureAirportId) {
  filter.departureAirportId = data.departureAirportId;
}
```

For price filtering, it uses Sequelize operators.

```js
priceFilter.push({ price: { [Op.gte]: data.minPrice } });
priceFilter.push({ price: { [Op.lte]: data.maxPrice } });
```

Then it fetches flights.

```js
const flight = await Flights.findAll({
  where: filterObject,
});
```

---

## 17. Clean Code Using Repository, Service, and Controller

This project follows a layered structure.

### Controller Layer

Controllers live in:

```text
src/controllers
```

A controller should:

- read request data
- call the service
- return response
- handle HTTP status codes

A controller should not directly write database queries.

### Service Layer

Services live in:

```text
src/services
```

A service should:

- contain business logic
- call repositories
- combine data from multiple repositories if needed
- throw meaningful errors

Example:

When creating a flight, the service checks time and fetches airplane capacity.

### Repository Layer

Repositories live in:

```text
src/repository
```

A repository should:

- talk to Sequelize models
- create records
- fetch records
- update records
- delete records
- build database filters

This keeps database logic in one place.

---

## 18. CRUD Repository

Many models need the same basic operations:

- create
- get by id
- get all
- update
- delete

Instead of writing this again and again, the project has a common CRUD repository:

```text
src/repository/crud-repository.js
```

It accepts a Sequelize model in the constructor.

```js
class CrudRepository {
  constructor(model) {
    this.model = model;
  }
}
```

Airport repository extends this common repository.

```js
const CrudRepository = require("./crud-repository");
const { Airport } = require("../models/index");

class AirportRepository extends CrudRepository {
  constructor() {
    super(Airport);
  }
}
```

This means Airport automatically gets common CRUD methods.

```js
create(data)
get(id)
getAll()
update(id, data)
destroy(id)
```

This is useful because all resources do not need to repeat the same database code.

One small thing to remember: a generic `getAll` method should call:

```js
this.model.findAll()
```

It should not depend on a specific model id.

---

## 19. Error Codes Utility

The project keeps HTTP status codes in:

```text
src/utils/error-codes.js
```

Example:

```js
const ClientErrorCodes = Object.freeze({
  BAD_REQUEST: 400,
  UNAUTHORISED: 401,
  NOT_FOUND: 404,
});

const SuccessCodes = Object.freeze({
  OK: 200,
  CREATED: 201,
});
```

This avoids hardcoding status codes everywhere.

Instead of writing:

```js
res.status(201)
```

we can write:

```js
res.status(SuccessCodes.CREATED)
```

This makes the code easier to read.

---

## 20. DB Sync

Sequelize has a `sync()` function.

```js
db.sequelize.sync({ alter: true });
```

This can create or alter tables based on models.

But `sync` is a heavy operation. It can also be risky in real projects because it changes the database schema from code.

In this project, DB sync is controlled using an environment variable.

```js
if (process.env.DB_SYNC) {
  db.sequelize.sync({ alter: true });
}
```

To run the server with sync enabled:

```bash
DB_SYNC=true npm start
```

On Windows PowerShell:

```powershell
$env:DB_SYNC="true"
npm start
```

For normal development, migrations are preferred.

Use migrations for schema changes:

```bash
npx sequelize db:migrate
```

Use seeders for inserting starting data:

```bash
npx sequelize db:seed:all
```

---

## 21. Useful Sequelize CLI Commands

Create database:

```bash
npx sequelize db:create
```

Generate model and migration:

```bash
npx sequelize model:generate --name City --attributes name:String
```

Run migrations:

```bash
npx sequelize db:migrate
```

Undo last migration:

```bash
npx sequelize db:migrate:undo
```

Undo all migrations:

```bash
npx sequelize db:migrate:undo:all
```

Generate seeder:

```bash
npx sequelize seed:generate --name add-cities
```

Run all seeders:

```bash
npx sequelize db:seed:all
```

Run one seeder:

```bash
npx sequelize db:seed --seed filename.js
```

Undo all seeders:

```bash
npx sequelize db:seed:undo:all
```

---

## 22. Suggested Order to Build This Microservice

Build the project in this order:

1. Setup Express server.
2. Setup `.env` and server config.
3. Setup Sequelize CLI.
4. Configure MySQL database in `config.json`.
5. Create database using `npx sequelize db:create`.
6. Create City model and migration.
7. Add City APIs.
8. Create Airport model and migration.
9. Add City and Airport association.
10. Add Airport APIs.
11. Add API to get airports of a city.
12. Create city and airport seeders.
13. Create Airplane model and migration.
14. Create airplane seeder.
15. Create Flights model and migration.
16. Add flight create API.
17. Add flight validation middleware.
18. Add flight search API with filters.
19. Move common database logic into CRUD repository.
20. Keep improving error handling and response format.

---

## 23. Final API List

City APIs:

```text
POST   /api/v1/city
GET    /api/v1/city
GET    /api/v1/city/:id
PATCH  /api/v1/city/:id
DELETE /api/v1/city/:id
POST   /api/v1/cityMultiple
GET    /api/v1/city/airport/:id
```

Airport APIs:

```text
POST   /api/v1/airport
GET    /api/v1/airport/:id
PATCH  /api/v1/airport/:id
DELETE /api/v1/airport/:id
```

Flight APIs:

```text
POST   /api/v1/flights
GET    /api/v1/flights
GET    /api/v1/flights/:id
PATCH  /api/v1/flights/:id
```

---

## 24. Simple Learning Summary

This microservice teaches a very common backend pattern.

Express handles routing. Controllers handle HTTP request and response. Services handle business rules. Repositories handle database queries. Sequelize models represent database tables. Migrations create tables. Seeders insert starting data.

Once this structure becomes clear, adding a new resource becomes simple:

1. Generate model and migration.
2. Add constraints in model and migration.
3. Run migration.
4. Add repository.
5. Add service.
6. Add controller.
7. Add routes.
8. Add seeders if sample data is needed.
9. Test APIs from Postman or any API client.

This is the basic foundation for building clean Node.js microservices.
