const express = require('express');
const serverOn = require('./src/config/server')

//rutas importadas
const userRoutes = require("./src/routes/user.routes")



const app = express();
app.use(express.json())

app.use("/api/user/",userRoutes);

module.exports = app;