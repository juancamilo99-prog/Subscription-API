const express = require('express');
const serverOn = require('./src/config/server')



const app = express();
app.use(express.json())


module.exports = app;