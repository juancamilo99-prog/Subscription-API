require('dotenv');
const users = require("../data/user.data");
const User = require("../../src/model/User.model");
const mongoose = require("mongoose");

mongoose
    .connect("mongodb+srv://monterocamilo99_db_user:HHx8YmNeTduesAH2@cluster0.d0gqpel.mongodb.net/SubscriptionDB?appName=Cluster0")
    .then(async () => {
        console.log("Conectado a la base de datos correctamente");
        //buscamos todos los usuarios de nuestra coleccion
        const allUser = await User.find();

        if(allUser.length) {
            await User.collection.drop();
        }
    })
    .catch((error) => console.log(`Error deleting data: ${error}`))
    .then(async () => {
        await User.insertMany(users)
    })
    .catch((error) => console.log(`Error creating data: ${error}`))
    .finally(() => mongoose.disconnect)