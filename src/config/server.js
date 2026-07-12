require('dotenv').config();
const mongoose = require('mongoose');
const app = require("../../index");

const start_server = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado a la base de datos")

        app.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${process.env.PORT}`);
        })

    } catch (error) {
        console.error("error al iniciar servidor", error)
        process.exit(1);
    }
}

start_server();