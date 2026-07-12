const User = require("../model/User.model");
const bcrypt = require('bcrypt');
const { generateToken } = require("../../utils/jwtokens/tokenUser");

//registrar usuarios
const registerUser = async(req, res) => {
    try {
        const user_existe = await User.findOne({email: req.body.email});

        if(user_existe){
            return res.status(400).json({ error: "Usuario ya existe"})
        }

        //si no existe el usuario, lo creamos y lo guardamos
        const user = new User(req.body);
         if(req.file){
            user.imgUrl = req.file.path;
            user.imgId = req.file.path;
        }
        const user_saved = await user.save();
        res.status(200).json(user_saved);

    } catch (error) {
        res.status(400).json({error: "Error al registrar usuario"})
        console.log(error)
    }
}

//obtener usuarios

const getUser = async(req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json ({error: "Error al obtener las peliculas"})
    }
}

module.exports = {
    registerUser,
    getUser
}