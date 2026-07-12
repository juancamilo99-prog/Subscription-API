const express = require('express');
const serverOn = require('./src/config/server')

//rutas importadas
const userRoutes = require("./src/routes/user.routes")
const subscriptionRoutes = require("./src/routes/subscription.routes");



const app = express();
app.use(express.json())

//rutas usuario
app.use("/api/user/",userRoutes);

//rutas subscription
app.use("/api/subscription/", subscriptionRoutes);

module.exports = app;