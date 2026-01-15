## Welcome to the Flight Service

### Project Setup 

- Clone the repo on your local machine `git clone <REPO_URL>`
- Execute `npm install` to install required package dependencies for the project. 
- Create a `.env` file in the root directory and add a single environment variable. 
    - `PORT=3000`
- Inside `src/config` create a new file `config.json` and add following piece of json. 
    ```
    {
        "development": {
            "username": "YOUR_DB_USERNAME",
            "password": "YOUR_DB_PASSWORD",
            "database": "flightAndSearchDB",
            "host": "127.0.0.1",
            "dialect": "mysql"
        },
    }
    ```
- Once above steps completed, go to `src` directory and execute `npx sequelize db:create`.
