const express = require('express');
const { PORT } = require('./config/serverConfig');

const app = express(); 

const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server Started on PORT: ${PORT}`);
    })
}

startServer(); 